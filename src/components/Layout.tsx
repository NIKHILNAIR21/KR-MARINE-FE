import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
type Props = {
  children?: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <div className="flex relative w-full h-screen ">
      <div className="bg-gradient-to-tr from-blue-500 to-blue-800 absolute top-0 w-full h-24 -z-0"></div>
      <Sidebar /> {/* Adjust width as needed */}
      <div className="flex-1 px-3">
        <Navbar />

        <div className="mt-16 m-3">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
