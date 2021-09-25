import React from "react";
import Header from "../components/Header";

const Layout = ({ children }: any) => {
  return (
    <div className="w-full m-auto">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
