import React from "react";
import Header from "../dashboard/_components/Header";

const CreateCourseLayout = ({ children }) => {
  return (
    <div>
      <Header></Header>

      {children}
    </div>
  );
};

export default CreateCourseLayout;
