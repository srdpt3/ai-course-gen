"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  function getStarted() {
    router.push("/dashboard");
  }
  return (
    <div className="flex justify-between p-5 shadow-sm">
      <Image src={"/logo.svg"} width={60} height={60}></Image>
      <Button onClick={getStarted}>Get Started</Button>
    </div>
  );
};

export default Header;
