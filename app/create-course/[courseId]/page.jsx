"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import ChapterList from "./_components/ChapterList";
import CourseDetail from "./_components/CourseDetail";

const CourseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  useEffect(() => {
    // console.log(params);
    params && GetCourse();
  }, [params, user]);
  const GetCourse = async () => {
    const result = await db
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.courseId, params?.courseId),
          eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress),
        ),
      );
    setCourse(result[0]);
    console.log(result);
  };
  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>

      {/* {BasicInfo} */}

      <CourseBasicInfo course={course} />
      <CourseDetail course={course} />
      <ChapterList course={course} />
    </div>
  );
};

export default CourseLayout;
