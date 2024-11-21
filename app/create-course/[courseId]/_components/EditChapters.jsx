import React from "react";
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
import { useState, useEffect } from "react";
const EditChapters = ({ course, index }) => {
  const Chapters = course?.courseOutput.chapters;
  const [name, setName] = useState();
  useEffect(() => {
    setName(Chapters[index].chapter_name);
  }, [Chapters]);
  const onUpdateHandler = async () => {
    course.courseOutput.chapters[index].chapter_name = name;
    const result = await db
      .update(CourseList)
      .set({
        courseOutput: course?.courseOutput,
      })
      .where(eq(CourseList?.id, course?.id))
      .returning();
  };
  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter </DialogTitle>
          <DialogDescription>
            <div className="mt-3">
              <label>Chapter Title</label>
              <Input
                defaultValue={Chapters[index].chapter_name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              {/* <label>Chapter Description</label> */}
              {/* <Textarea
                className="h-40"
                defaultValue={Chapters[index].chapter_name}
                onChange={(e) => setDescription(e.target.value)}
              /> */}
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

export default EditChapters;
