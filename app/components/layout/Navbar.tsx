import { Form, NavLink } from "react-router";

import { useOptionalUser } from "~/lib/auth";

export function Navbar() {
  const user = useOptionalUser();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "flex w-auto justify-center rounded-md px-4 py-3 font-josefin-Regular uppercase text-black hover:bg-gray-700 hover:bg-opacity-10 hover:text-white",
      isActive ? "bg-gray-700 bg-opacity-10" : "",
    ].join(" ");

  return (
    <nav>
      <div className="relative flex h-auto w-full flex-row flex-wrap items-center justify-center bg-gray-700 bg-opacity-20">
        <div className="flex items-center justify-center gap-0">
          <NavLink to="/" className={linkClass}>
            home
          </NavLink>
          <div className="px-1 py-3 text-black">|</div>
          <NavLink to="/gallery" className={linkClass}>
            Gallery
          </NavLink>
          <div className="px-1 py-3 text-black">|</div>
          {user ? (
            <Form action="/logout" method="post">
              <button type="submit" className={linkClass({ isActive: false })}>
                Logout
              </button>
            </Form>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
