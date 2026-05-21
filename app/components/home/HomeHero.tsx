import { Form, Link } from "react-router";

import { useOptionalUser } from "~/lib/auth";

export function HomeHero() {
  const user = useOptionalUser();

  return (
    <div className="flex min-h-full flex-col justify-center bg-baner-start bg-cover bg-center bg-no-repeat xl:bg-contain 2xl:bg-cover">
      <div className="relative pb-8 pt-8">
        <div className="mx-auto w-4/6 px-0 lg:px-8">
          <div className="relative h-5/6 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gray-300 bg-opacity-80" />
            <div className="relative px-4 pb-16 pt-16 lg:px-8 lg:pb-64 lg:pt-64">
              <h1 className="text-center text-4xl font-extrabold tracking-tight md:text-6xl lg:text-9xl">
                <span className="font-josefin-Regular font-thin uppercase text-black text-opacity-80">
                  l o v e & t h a n k s
                </span>
              </h1>
            </div>
          </div>
        </div>

        {user ? (
          <div className="mx-auto mt-10 flex max-w-none flex-row justify-center gap-5">
            <Form action="/logout" method="post">
              <button
                type="submit"
                className="flex w-auto items-center justify-center rounded-md bg-slate-400 bg-opacity-60 px-4 py-3 font-josefin-Regular font-medium text-white hover:bg-opacity-90"
              >
                Logout
              </button>
            </Form>
            <Link
              to="/gallery"
              className="flex w-auto items-center justify-center rounded-md bg-slate-400 bg-opacity-60 px-4 py-3 font-josefin-Regular font-medium text-white hover:bg-opacity-90"
            >
              Gallery
            </Link>
          </div>
        ) : (
          <div className="mx-auto mt-10 flex max-w-sm justify-center gap-4">
            <Link
              to="/login"
              className="flex w-auto items-center justify-center rounded-md bg-slate-400 bg-opacity-60 px-4 py-3 font-medium text-white hover:bg-opacity-90"
            >
              Login
            </Link>
            <Link
              to="/join"
              className="flex w-auto items-center justify-center rounded-md bg-slate-400 bg-opacity-60 px-4 py-3 font-medium text-white hover:bg-opacity-90"
            >
              Sign up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
