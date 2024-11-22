import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { HiOutlinePuzzle } from "react-icons/hi";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";
const CourseBasicInfo = ({ course, refreshData }) => {
  const [selectedImage, setSelectedImage] = useState();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    const fileName = new Date().getTime() + file.name;
    console.log(fileName);

    const storageRef = ref(storage, "ai-course/" + fileName);
    console.log(storageRef);
    await uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log(snapshot);
      })
      .then((resp) =>
        getDownloadURL(storageRef).then(async (url) => {
          console.log(url);
          await db
            .update(CourseList)
            .set({
              courseBanner: url,
            })
            .where(eq(CourseList.id, course?.id));
        }),
      );
    // const uploadTask = uploadBytesResumable(storageRef, file);
  };

  return (
    <div className="p-10 border-2 rounded-xl shadow-sm mt-5 border-gray-300 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-3xl">
            {course?.courseOutput?.course_name}{" "}
            <EditCourseBasicInfo
              course={course}
              refreshData={() => refreshData(true)}
            />
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
          <label htmlFor="upload-image">
            <Image
              className="w-full rounded-xl h-[250px] object-cover"
              src={selectedImage ? selectedImage : "/placeholder.jpeg"}
              alt="logo"
              width={300}
              height={300}
            />
          </label>
          <input
            type="file"
            id="upload-image"
            className="opacity-0"
            onChange={handleImageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default CourseBasicInfo;
