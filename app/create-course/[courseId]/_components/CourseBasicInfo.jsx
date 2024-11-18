import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
const CourseBasicInfo = ({ course }) => {
  return (
    <div className="p-10 border-2 rounded-xl shadow-sm mt-5 border-gray-300 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.course_name}
          </h2>
          <p className="text-sm text-gray-500 mt-3">
            {course?.courseOutput?.description}{" "}
          </p>
          <h2 className="font-medium mt-2 text-primary flex items-center gap-2">
            <HiOutlinePuzzle></HiOutlinePuzzle>
            {course?.category}
          </h2>

          <Button className="w-full mt-5">Start</Button>
        </div>

        <div>
          <Image
            className="w-full rounded-xl h-[250px] object-cover"
            src={"/placeholder.jpeg"}
            alt="logo"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
