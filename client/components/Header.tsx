import React, { useState } from "react";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import useAuthorizedCustomer from "../hooks/useAuthorizedCustomer";
import useLogout from "../hooks/useLogout";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authorizedCustomer } = useAuthorizedCustomer();
  const [logout] = useLogout();

  return (
    <div className="sticky top-0 z-50 p-5 bg-black">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:mx-4">
        <div className="hidden sm:block">
          <Link href="/">
            <a className=" text-white font-semibold">ECommerce</a>
          </Link>
        </div>
        <FaBars
          className="block xxs:hidden text-white self-center"
          size={20}
          onClick={() => setMenuOpen(!menuOpen)}
        />
        {menuOpen && (
          <nav className="fixed top-10 left-0 bg-black p-4">
            <div className="flex flex-col space-y-2">
              <Link href="/">
                <a className="text-white text-sm">Home</a>
              </Link>
              <Link href="/shop-all">
                <a className="text-white text-sm">Products</a>
              </Link>
              <Link href="/about">
                <a className="text-white text-sm">About</a>
              </Link>
            </div>
          </nav>
        )}
        <nav className="hidden xxs:flex items-center justify-between space-x-3">
          <Link href="/">
            <a className="text-white text-sm">Home</a>
          </Link>
          <Link href="/shop-all">
            <a className="text-white text-sm">Products</a>
          </Link>
          <Link href="/about">
            <a className="text-white text-sm">About</a>
          </Link>
        </nav>
        <div className="flex text-white items-center justify-end">
          {!authorizedCustomer ? (
            <button className="bg-blue-600 rounded-md text-sm font-semibold p-1 mr-4">
              <Link href="/login">
                <a>Sign In</a>
              </Link>
            </button>
          ) : (
            <button
              className="bg-blue-600 rounded-md text-sm font-semibold p-1 mr-4"
              onClick={logout as any}
            >
              <Link href="/">
                <a>Logout</a>
              </Link>
            </button>
          )}
          <Link href="/cart">
            <a>
              <FiShoppingCart size={20} className="cursor-pointer" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
