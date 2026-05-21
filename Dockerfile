FROM node:20-bookworm-slim AS base

ENV NODE_ENV=production

RUN apt-get update && apt-get install -y openssl sqlite3 && rm -rf /var/lib/apt/lists/*

FROM base AS deps

WORKDIR /myapp

COPY package.json package-lock.json ./
RUN npm ci

FROM base AS production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
COPY package.json package-lock.json ./
RUN npm prune --production

FROM base AS build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

FROM base

ENV DATABASE_URL=file:/data/sqlite.db
ENV PORT=8080
ENV NODE_ENV=production

WORKDIR /myapp

COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/node_modules/.prisma /myapp/node_modules/.prisma
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/package.json /myapp/package.json
COPY --from=build /myapp/start.sh /myapp/start.sh
COPY --from=build /myapp/prisma /myapp/prisma

ENTRYPOINT ["./start.sh"]
