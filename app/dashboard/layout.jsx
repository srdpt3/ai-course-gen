import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <div className="md:w-64 hidden md:block">
        <SideBar></SideBar>
      </div>
      <div className="md:ml-64 p-10">
        <Header />
        <div className="p-10"></div>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
