import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/config/db";
import { CourseList } from "@/config/schema";
import { eq } from "drizzle-orm";

const EditCourseBasicInfo = ({ course, refreshData }) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  useEffect(() => {
    setName(course?.courseOutput?.course_name);
    setDescription(course?.courseOutput?.description);
  }, [course]);
  const onUpdateHandler = async () => {
    course.courseOutput.course_name = name;
    course.courseOutput.description = description;
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning();
    refreshData(true);
    console.log(result);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label>Course Title</label>
              <Input
                defaultValue={course?.courseOutput?.course_name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>Course Description</label>
              <Textarea
                className="h-40"
                defaultValue={course?.courseOutput?.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>
            <Button className="bg-primary text-white" onClick={onUpdateHandler}>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCourseBasicInfo;
