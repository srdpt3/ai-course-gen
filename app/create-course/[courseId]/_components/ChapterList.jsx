import React from "react";
import { HiOutlineCheckCircle, HiOutlineClock } from "react-icons/hi2";
import EditChapters from "./EditChapters";

const ChapterList = ({ course, refreshData }) => {
  return (
    <div className="mt-3">
      <h2 className="font-medium text-2xl">Chapters</h2>
      <div className="mt-2  gap-5">
        {course?.courseOutput?.chapters?.map((chapter, index) => (
          <div className="border rounded-lg mb-2 shadow-sm mt-5 border-gray-300 rounded-lg p-6 items-center flex justify-between">
            <div className="flex items-center gap-2">
              <h2 className="bg-primary text-white px-2 py-1 rounded-md flex-none">
                {index + 1}
              </h2>
              <div>
                <h2>
                  {chapter?.chapter_name}{" "}
                  <EditChapters
                    course={course}
                    index={index}
                    refreshData={() => refreshData(true)}
                  />
                </h2>
                <p className="flex items-center gap-2 text-sm text-gray-500 text-primary">
                  <HiOutlineClock /> {chapter?.duration}
                </p>
              </div>
            </div>
            <HiOutlineCheckCircle className="text-gray-300 text-3xl flex-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChapterList;
