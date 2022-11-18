import { Form, NavLink } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Navbar() {
  const user = useOptionalUser();
  return (
    <nav>
      <div className="relative flex h-auto w-full flex-row flex-wrap justify-center space-y-0 bg-gray-700 bg-opacity-20 md:justify-end ">
        <div className="relative mx-5 flex content-center items-center  justify-center  gap-0 space-y-0 ">
          <NavLink
            to="/"
            className="flex w-1/5 w-auto justify-center rounded-md px-4 py-3 font-josefin-Regular   uppercase uppercase  text-black hover:bg-gray-700 hover:bg-opacity-10 hover:text-white"
          >
            home
          </NavLink>
          <div className="  py-3 px-1  text-black "> | </div>
          <NavLink
            to="/gallery"
            className=" flex  w-1/5 w-auto justify-center rounded-md px-4  py-3 font-josefin-Regular uppercase text-black hover:bg-gray-700 hover:bg-opacity-10 hover:text-white"
          >
            Gallery
          </NavLink>
          <div className="  py-3 px-1  text-black "> | </div>
          {user ? (
            <Form action="/logout" method="post">
              {" "}
              <button
                type="submit"
                className="flex w-1/5 w-auto justify-center rounded-md px-4 py-3   font-josefin-Regular uppercase  text-black hover:bg-gray-700 hover:bg-opacity-10 hover:text-white"
              >
                {" "}
                Logout{" "}
              </button>{" "}
            </Form>
          ) : (
            <NavLink
              to="/login"
              className="flex w-1/5 w-auto justify-center rounded-md px-4 py-3   font-josefin-Regular uppercase  text-black hover:bg-gray-700 hover:bg-opacity-10 hover:text-white"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
