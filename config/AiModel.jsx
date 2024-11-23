const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
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

export const GenerateChapterContent_AI = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "explain the concept in detail on topic: yoga The chapter title is Warm-up and Sun Salutations Variations. The chapter content is Prepare the body with dynamic stretches and variations on the classic Sun Salutation sequence..\nin json format with fields title and description in detail, Code example(htML code format) if applicable\n\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "title": "Warm-up and Sun Salutations Variations",\n  "description": "This chapter focuses on preparing the body for a yoga practice through dynamic stretches and exploring variations of the classic Sun Salutation (Surya Namaskar) sequence.  A proper warm-up is crucial to increase blood flow to the muscles, improve flexibility and range of motion, and reduce the risk of injury. Dynamic stretches, unlike static stretches (holding a pose), involve movement and flow, preparing the body for more vigorous poses.  The Sun Salutation, a sequence of poses flowing together, is a fundamental part of many yoga styles.  Variations are introduced to accommodate different levels of experience and physical capabilities, allowing practitioners to modify the sequence to suit their individual needs and limitations.  This involves focusing on proper alignment, breathing techniques, and mindful movement throughout the sequence.  The variations might include modifications to poses like downward-facing dog, plank, and chaturanga dandasana, offering options for beginners or those with injuries, while also offering advanced variations for more experienced practitioners to deepen their practice. The overall goal is to build strength, flexibility, stamina, and body awareness through mindful movement and controlled breathing.",\n  "codeExample": "<!--  No direct code example is needed for a conceptual explanation of Yoga Warm-up and Sun Salutations. However, a basic HTML structure to display information about different Sun Salutation variations could look like this: -->\\n\\n<article>\\n  <h1>Sun Salutation Variations</h1>\\n  <section>\\n    <h2>Beginner Variation</h2>\\n    <p>Focus on maintaining proper form and alignment.  Modify poses as needed (e.g., knees down for Chaturanga). Emphasize breathwork.</p>\\n    <ul>\\n      <li>Option 1: Description of modification for Downward-Facing Dog</li>\\n      <li>Option 2: Description of modification for Plank Pose</li>\\n    </ul>\\n  </section>\\n  <section>\\n    <h2>Intermediate Variation</h2>\\n    <p>Incorporate more challenging variations, such as a flowing transition between poses.</p>\\n    <ul>\\n      <li>Option 1: Description of a flowing transition</li>\\n      <li>Option 2: Description of an advanced variation for High Lunge</li>\\n    </ul>\\n  </section>\\n  <section>\\n    <h2>Advanced Variation</h2>\\n    <p>Incorporate arm balances, deeper backbends, and other advanced postures.</p>\\n    <ul>\\n      <li>Option 1: Advanced Chaturanga variation</li>\\n      <li>Option 2: Incorporating a handstand variation</li>\\n    </ul>\\n  </section>\\n</article>"\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
