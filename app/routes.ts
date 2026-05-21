import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/_index.tsx"),
  route("login", "routes/login.tsx"),
  route("join", "routes/join.tsx"),
  route("logout", "routes/logout.tsx"),
  route("gallery", "routes/gallery.tsx", [
    index("routes/gallery._index.tsx"),
  ]),
  route("healthcheck", "routes/healthcheck.tsx"),
  route("assets/resize/*", "routes/assets.resize.$.tsx"),
] satisfies RouteConfig;
