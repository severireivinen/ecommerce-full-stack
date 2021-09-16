import React from "react";
import Link from "next/link";
import { useLogout } from "../hooks/useLogout";
import { useAuthToken } from "../lib/auth";

const Header = () => {
  const logout = useLogout();
  const [authToken] = useAuthToken();

  return (
    <div className="flex border-b shadow-sm items-center justify-around py-5">
      <Link href="/">
        <div className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500">
          Home
        </div>
      </Link>
      <Link href="/">
        <div className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500">
          Contact
        </div>
      </Link>

      {!authToken && (
        <Link href="/login">
          <div className="text-white text-2xl cursor-pointer hover:text-blue-500 bg-blue-500 py-1 px-4 rounded-lg">
            Login
          </div>
        </Link>
      )}

      {!authToken && (
        <Link href="/login">
          <div className="text-white text-2xl cursor-pointer hover:text-blue-500 bg-blue-500 py-1 px-4 rounded-lg">
            Register
          </div>
        </Link>
      )}

      {authToken && (
        <Link href="/">
          <div className="text-gray-500 text-2xl cursor-pointer hover:text-blue-500">
            My Cart
          </div>
        </Link>
      )}

      {authToken && (
        <Link href="/">
          <div
            className="text-gray-500 text-2xl cursor-pointer hover:text-red-500"
            onClick={logout}
          >
            Logout
          </div>
        </Link>
      )}
    </div>
  );
};

export default Header;
