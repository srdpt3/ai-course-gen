import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5 shadow-sm">
      <Image src={"/logo.svg"} width={40} height={40}></Image>
      <UserButton></UserButton>
    </div>
  );
};

export default Header;
