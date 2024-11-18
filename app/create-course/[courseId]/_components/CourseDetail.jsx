import React from "react";
import {
  HiOutlineChartBar,
  HiOutlineClock,
  HiOutlineBookmark,
  HiOutlineVideoCamera,
} from "react-icons/hi2";

const CourseDetail = ({ course }) => {
  return (
    <div className="border-2 rounded-xl shadow-sm mt-5 border-gray-300 rounded-lg p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="flex items-center gap-2">
          <HiOutlineChartBar className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Skill Level</h2>

            <h2 className="font-medium text-lg">
              {course?.courseOutput?.level}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineClock className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">Duration</h2>

            <h2 className="font-medium text-lg">
              {course?.courseOutput?.duration}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineBookmark className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">No of Chapters</h2>

            <h2 className="font-medium text-lg">
              {course?.courseOutput?.noof_chapters}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <HiOutlineVideoCamera className="text-4xl text-primary" />
          <div>
            <h2 className="text-xs text-gray-500">include Video</h2>

            <h2 className="font-medium text-lg">{course?.includeVideo}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
