import { Input } from "@/components/ui/input";
import React from "react";
import { Textarea } from "@/components/ui/textarea";

const TopicDescription = () => {
  return (
    <div className="mx-20 lg:mx-44">
      {/* Input Topic */}
      <div className="mt-5">
        <label>
          Write the topic for which you want to generate a course(e.g., Pyhton
          programming, Yoga, etc..
        </label>
        <Input placeholder={"Topic"}></Input>
      </div>
      <div className="mt-5">
        <label>
          Tell us more about your course, what do you want to include in the
          course (Optional)
        </label>
        <Textarea placeholder="Course Description" />
      </div>
      {/* Text Area Desc */}
    </div>
  );
};

export default TopicDescription;
