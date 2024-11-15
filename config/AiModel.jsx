const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const GenerateCourseLayout_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "generate a course tutorial on following detail with fields as course name , description, Along with Chapter name about , duration: category:'programming', topic: java, level : basic, duration : 1 hours , noof chapters:5 in json format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course_name": "Java Programming Fundamentals",\n  "description": "This course provides a comprehensive introduction to Java programming, covering the fundamental concepts and syntax needed to write simple Java applications. It is ideal for beginners with no prior programming experience.",\n  "chapters": [\n    {\n      "chapter_name": "Introduction to Java",\n      "duration": "30 minutes",\n      "content": [\n        "What is Java?",\n        "History and Evolution of Java",\n        "Java Platform and its Components",\n        "Setting up a Java Development Environment",\n        "Writing Your First Java Program",\n        "Basic Java Syntax"\n      ]\n    },\n    {\n      "chapter_name": "Variables, Data Types, and Operators",\n      "duration": "15 minutes",\n      "content": [\n        "Variables and Data Types",\n        "Primitive Data Types in Java",\n        "Operators in Java",\n        "Expressions and Statements",\n        "Data Type Conversion",\n        "Variable Scope"\n      ]\n    },\n    {\n      "chapter_name": "Control Flow",\n      "duration": "15 minutes",\n      "content": [\n        "Conditional Statements (if-else)",\n        "Looping Statements (for, while, do-while)",\n        "Nested Loops",\n        "Break and Continue Statements",\n        "Switch Statements"\n      ]\n    },\n    {\n      "chapter_name": "Arrays and Strings",\n      "duration": "15 minutes",\n      "content": [\n        "Arrays in Java",\n        "Array Declaration and Initialization",\n        "Array Manipulation",\n        "Multidimensional Arrays",\n        "Strings in Java",\n        "String Methods",\n        "String Manipulation"\n      ]\n    },\n    {\n      "chapter_name": "Introduction to Object-Oriented Programming",\n      "duration": "10 minutes",\n      "content": [\n        "Object-Oriented Programming Concepts",\n        "Classes and Objects",\n        "Encapsulation",\n        "Abstraction",\n        "Inheritance",\n        "Polymorphism"\n      ]\n    }\n  ],\n  "category": "programming",\n  "topic": "java",\n  "level": "basic",\n  "duration": "1 hour",\n  "noof_chapters": 5\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
