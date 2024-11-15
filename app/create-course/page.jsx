"use client";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState, useContext } from "react";
import { GenerateCourseLayout_AI } from "@/config/AiModel";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiOutlineSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "@/app/_context/UserInputContext";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import uuid4 from "uuid4";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const CreateCourse = () => {
  const stepperOptions = [
    { id: 1, name: "Category", icon: <HiOutlineSquares2X2 /> },
    { id: 2, name: "Topic", icon: <HiLightBulb /> },
    { id: 3, name: "Options", icon: <HiClipboardDocumentCheck /> },
  ];

  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    console.log(userCourseInput);
  }, [userCourseInput]);

  const checkStatus = () => {
    if (!userCourseInput) return true;
    if (activeIndex === 0 && !userCourseInput?.category) return true;
    if (activeIndex === 1 && !userCourseInput?.topic) return true;
    if (
      activeIndex === 2 &&
      (userCourseInput?.level == null ||
        userCourseInput?.duration == null ||
        userCourseInput?.displayVideo == null ||
        userCourseInput?.noOfChapter == null)
    ) {
      return true;
    }
    return false;
  };

  const GenerateCourseLayout = async () => {
    const { category, topic, level, duration, noOfChapter } = userCourseInput;

    // Check for missing fields and handle errors if any are undefined
    setLoading(true);
    if (!category) console.error("Category is missing.");
    if (!topic) console.error("Topic is missing.");
    if (level == null) console.error("Level is missing.");
    if (duration == null) console.error("Duration is missing.");
    if (noOfChapter == null) console.error("Number of chapters is missing.");

    const BASIC_PROMPT =
      "generate a course tutorial on following detail with fields as course name , description, Along with Chapter name about , duration. ";
    const USER_INPUT_PROMPT = `category: ${category}, topic: ${topic}, level: ${level}, duration: ${duration}, number of chapters: ${noOfChapter} in json format`;
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

    console.log("Sending prompt:", FINAL_PROMPT);
    const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT); // Directly sending content without custom history parts);
    // console.log(result.response?.text());

    const jsonString = result.response
      ?.text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(jsonString));

    setLoading(false);
    SaveCourseLayoutInDb(JSON.parse(jsonString));
  };

  const SaveCourseLayoutInDb = async (courseLayout) => {
    const id = uuid4();

    try {
      setLoading(true);

      // Input validation
      if (
        !userCourseInput?.topic ||
        !userCourseInput?.level ||
        !userCourseInput?.category
      ) {
        throw new Error("Missing required course input fields");
      }

      if (!user?.primaryEmailAddress?.emailAddress) {
        throw new Error("User email not found");
      }

      // Generate UUID

      // Fix typo in 'level' field name
      const result = await db.insert(CourseList).values({
        courseId: id,
        name: userCourseInput.topic,
        level: userCourseInput.level, // Fixed typo from 'levle' to 'level'
        category: userCourseInput.category,
        courseOutput: courseLayout,
        createdBy: user.primaryEmailAddress.emailAddress,
        userName: user?.fullName || null, // Make optional fields nullable
        userProfileImage: user?.imageUrl || null,
      });

      return result;
    } catch (error) {
      console.error("Error saving course layout:", error);
      throw new Error(`Failed to save course: ${error.message}`);
    } finally {
      setLoading(false); // Ensure loading state is always reset
      router.replace("/create-course/" + id);
    }
  };

  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {stepperOptions.map((item, index) => (
            <div className="flex items-center" key={index}>
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= index && "bg-purple-500"
                  }`}
                >
                  {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index !== stepperOptions.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${
                    activeIndex - 1 >= index && "bg-purple-500"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 md:px-20 lg:px-44 mt-10">
        {/* Component */}
        {activeIndex === 0 ? (
          <SelectCategory />
        ) : activeIndex === 1 ? (
          <TopicDescription />
        ) : (
          <SelectOption />
        )}
        {/* Next Previous Button */}
        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex === 0}
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex < 2 && (
            <Button
              disabled={checkStatus()}
              onClick={() => setActiveIndex(activeIndex + 1)}
            >
              Next
            </Button>
          )}
          {activeIndex === 2 && (
            <Button disabled={checkStatus()} onClick={GenerateCourseLayout}>
              Generate Course
            </Button>
          )}
        </div>
      </div>
      <LoadingDialog loading={loading}></LoadingDialog>
    </div>
  );
};

export default CreateCourse;
