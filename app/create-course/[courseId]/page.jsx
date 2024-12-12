"use client";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./_components/CourseBasicInfo";
import ChapterList from "./_components/ChapterList";
import CourseDetail from "./_components/CourseDetail";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { GenerateChapterContent_AI } from "@/config/AiModel";
import LoadingDialog from "../_components/LoadingDialog";
import service from "@/config/service";
const CourseLayout = ({ params }) => {
  const { user } = useUser();
  const [course, setCourse] = useState([]);
  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    // console.log(params);
    params && GetCourse();
  }, [params, user]);
  const GetCourse = async () => {
    console.log("GetCourse");
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

  const GenerateChapterContent = async (course) => {
    setIsLoading(true);

    const chapters = course?.courseOutput?.chapters;
    chapters.forEach(async (chapter, index) => {
      const PROMPT = `explain the concept in detail on topic: ${course?.name} The chapter title is ${chapter.chapter_name}. The chapter content is ${chapter.about}.
in json format with a list of array with field as title and description in detail, Code example(code field in <precode> format) if applicable`;
      console.log(PROMPT);
      if (index < 3) {
        try {
          console.log("Generating Chapter Content");
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          console.log(result?.response?.text());
          service.getVideo(course?.name + ":" + chapter?.name).then((resp) => {
            console.log(resp);
          });

          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);

          console.log(error);
        }
      }
    });
  };

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <h2 className="font-bold text-center text-2xl">Course Layout</h2>
      <LoadingDialog loading={isLoading}></LoadingDialog>
      {/* {BasicInfo} */}

      <CourseBasicInfo course={course} refreshData={() => GetCourse()} />

      <CourseDetail course={course} />
      <ChapterList course={course} refreshData={() => GetCourse()} />

      <Button className="my-10" onClick={() => GenerateChapterContent(course)}>
        Generate Course Content
      </Button>
    </div>
  );
};

export default CourseLayout;
