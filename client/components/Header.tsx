import React, { useState } from "react";
import Link from "next/link";
import { useLogout } from "../hooks/useLogout";
import {
  HiOutlineShoppingBag,
  HiOutlineSearch,
  HiOutlineUser,
} from "react-icons/hi";

const Header = () => {
  const logout = useLogout();

  const [searchOpen, setSearchOpen] = useState(false);

  const tempAuth = false;

  const handleSearch = (e: any) => {
    e.preventDefault();
    console.log("Search submitted");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-10 p-6 bg-black text-white items-center">
      <Link href="/">
        <a className="hidden md:block text-xl font-bold">ECommerce</a>
      </Link>
      <div className="flex flex-col items-center md:flex-row justify-around">
        <Link href="/products">
          <a className="cursor-pointer">SHOP</a>
        </Link>
        <Link href="/">
          <a className="cursor-pointer">CATEGORIES</a>
        </Link>
        <Link href="/">
          <a className="cursor-pointer">HOT NOW!</a>
        </Link>
      </div>
      {tempAuth ? (
        <div className="flex justify-end space-x-6">
          <div onClick={logout}>
            <HiOutlineUser size={25} className=" cursor-pointer" />
          </div>

          <Link href="/cart">
            <a>
              <HiOutlineShoppingBag size={25} className=" cursor-pointer" />
            </a>
          </Link>
          <div onClick={() => setSearchOpen(true)}>
            <HiOutlineSearch size={25} className=" cursor-pointer" />
          </div>
        </div>
      ) : (
        <div className="flex justify-end space-x-6">
          <Link href="/login">
            <a>
              <HiOutlineUser size={25} className=" cursor-pointer" />
            </a>
          </Link>
          <Link href="/login">
            <a>
              <HiOutlineShoppingBag size={25} className=" cursor-pointer" />
            </a>
          </Link>
          <div onClick={() => setSearchOpen(true)}>
            <HiOutlineSearch size={25} className=" cursor-pointer" />
          </div>
        </div>
      )}

      {searchOpen && (
        <div className="absolute top-20  md:top-14 right-6 bg-yellow-600 rounded-b-md rounded-tl-md">
          <form className="p-3" onSubmit={handleSearch}>
            <input
              className="text-white outline-none bg-yellow-600 placeholder-white"
              onBlur={() => setSearchOpen(false)}
              autoFocus
              placeholder="Search product..."
            />
            <button className="hidden" type="submit">
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Header;
