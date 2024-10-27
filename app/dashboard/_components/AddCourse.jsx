"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const AddCourse = () => {
  const { user } = useUser();
  return (
    <div className="flex items-center justify-between">
      <div className="text-2xl">
        Hello , <span className="font-bold">{user?.fullName}</span>
        <p className="text-sm text-gray-500">
          Create new cource with AI, Share with friends and Earn it
        </p>
      </div>
      <Link href={"/create-course"}>
        <Button>+ Create AI Cource</Button>
      </Link>
    </div>
  );
};

export default AddCourse;
