import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from "react-router";
import type { Route } from "./+types/root";

import stylesheet from "./app.css?url";
import { getUser } from "~/lib/session.server";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100;400&display=swap",
  },
];

export function meta(): Route.MetaDescriptors {
  return [
    { title: "The Duncas 2022" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  return { user: await getUser(request) };
}

export default function App() {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <title>{message}</title>
      </head>
      <body className="h-full p-8 font-sans">
        <h1 className="text-2xl font-bold">{message}</h1>
        <p className="mt-2">{details}</p>
        {stack && (
          <pre className="mt-4 overflow-auto rounded bg-gray-100 p-4 text-sm">
            {stack}
          </pre>
        )}
      </body>
    </html>
  );
}
