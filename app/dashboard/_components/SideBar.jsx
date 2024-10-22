"use client";
import Image from "next/image";
import React from "react";
import { FiHome } from "react-icons/fi";
import { HiOutlineSquare3Stack3D } from "react-icons/hi2";
import { GiArmorUpgrade } from "react-icons/gi";
import { IoIosLogOut } from "react-icons/io";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

const SideBar = () => {
  const path = usePathname();
  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <FiHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiOutlineSquare3Stack3D />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "upgrade",
      icon: <GiArmorUpgrade />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <IoIosLogOut />,
      path: "/dashboard/logout",
    },
  ];
  return (
    <div className="fixed h-full md:w-64 p-5 shadow-md">
      <Image src={"/logo.svg"} width={80} height={60}></Image>
      <hr className="my-5"></hr>
      <ul>
        {Menu.map((item, index) => (
          <Link href={item.path}>
            <div
              className={`flex items-center gap-2 text-gray-600 p-5 cursor-pointer
           hover:bg-gray-100 hover:bg-gray-100 hover:text
           -black rounded-lg mb-2 ${item.path == path && "bg-gray-100 text-black"}`}
            >
              <div className="text-2xl">{item.icon}</div>
              <h2>{item.name}</h2>
            </div>
          </Link>
        ))}
      </ul>
      <div className="absolute bottom-10 w-[80%]">
        <Progress value={33} />
        <h2 className="text-sm my-2">3 out 5 course created</h2>
        <h2 className="text-xs text-gray-500">
          Upgrade your plan for unlimited course generation
        </h2>
      </div>
    </div>
  );
};

export default SideBar;
