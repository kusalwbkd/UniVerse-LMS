const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const fs = require("node:fs");
const mime = require("mime-types");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseModalities: [
  ],
  responseMimeType: "application/json",
};

 export const generateCourse = model.startChat({
    generationConfig,
    history: [
    ],
  });


  export const generateCourseNotes = model.startChat({
    generationConfig,
    history: [
    ],
  });

  export const generateCoursFlashCards = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "\nGenerate up to 15 flashcards in JSON format for the following chapter:\n\n- Chapter Title: \"Introduction to Functions\"\n- Summary: \"This chapter covers what functions are, how to define and call them, the difference between parameters and arguments, return values, and anonymous functions in JavaScript.\"\n- Course Type: \"Programming\"\n- Difficulty Level: \"Beginner\"\n\nEach flashcard should be a JSON object with two fields:\n\n- \"front\": A question, keyword, or term — prefixed with a suitable emoji based on the content (e.g., 📘 for definitions, 💡 for ideas, 🧠 for concepts, 🧪 for code examples, ⚙️ for technical terms).\n- \"back\": A clear and detailed answer or explanation.\n\n💡 Return ONLY a raw JSON array. No introductory text, explanations, or markdown — just valid JSON.\n\nExample format:\n[\n  {\n    \"front\": \"💡 What is a function in JavaScript?\",\n    \"back\": \"A function is a block of code designed to perform a particular task. It is executed when 'something' invokes it (calls it).\"\n  },\n  {\n    \"front\": \"📘 Define parameters and arguments.\",\n    \"back\": \"Parameters are variables listed as a part of the function definition. Arguments are the values passed to the function when it is called.\"\n  },\n  ...\n]\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"front\": \"💡 What is a function in JavaScript?\",\n    \"back\": \"A function is a reusable block of code designed to perform a specific task. It helps organize code and makes it more manageable.\"\n  },\n  {\n    \"front\": \"⚙️ What is a function definition?\",\n    \"back\": \"The function definition specifies the function's name, parameters, and the code block that will be executed when the function is called.\"\n  },\n  {\n    \"front\": \"🧪 How do you define a function in JavaScript?\",\n    \"back\": \"Using the `function` keyword followed by the function name, parentheses `()` for parameters, and curly braces `{}` containing the function body.  Example: `function myFunction(param1, param2) { /* code */ }`\"\n  },\n  {\n    \"front\": \"⚙️ What is a function call (invocation)?\",\n    \"back\": \"Calling or invoking a function means executing the code within the function's body. This is done by writing the function name followed by parentheses `()`. Example: `myFunction(arg1, arg2);`\"\n  },\n  {\n    \"front\": \"📘 Define parameters.\",\n    \"back\": \"Parameters are variables declared within the parentheses of a function definition. They act as placeholders for the values that will be passed into the function when it is called.\"\n  },\n  {\n    \"front\": \"📘 Define arguments.\",\n    \"back\": \"Arguments are the actual values that are passed to a function when it is called. They are assigned to the corresponding parameters in the function definition.\"\n  },\n  {\n    \"front\": \"🧠 What is the difference between parameters and arguments?\",\n    \"back\": \"Parameters are placeholders defined in the function definition. Arguments are the actual values passed to the function when it's called. Arguments are assigned to parameters.\"\n  },\n  {\n    \"front\": \"⚙️ What is a return value?\",\n    \"back\": \"A return value is the value that a function sends back to the caller after it has finished executing. It is specified using the `return` keyword.\"\n  },\n  {\n    \"front\": \"🧪 How do you return a value from a function?\",\n    \"back\": \"Use the `return` keyword followed by the value you want to return. Example: `return result;` If no return statement is present, the function implicitly returns `undefined`.\"\n  },\n  {\n    \"front\": \"💡 What is the purpose of the `return` statement?\",\n    \"back\": \"The `return` statement ends the function's execution and returns the specified value to the caller. It also allows a function to send back the result of its computations.\"\n  },\n  {\n    \"front\": \"📘 What is an anonymous function?\",\n    \"back\": \"An anonymous function is a function that is defined without a name. It's often used as an argument to other functions or assigned to a variable.\"\n  },\n  {\n    \"front\": \"🧪 How do you create an anonymous function?\",\n    \"back\": \"By using the `function` keyword without specifying a name, and often assigning the function to a variable or passing it as an argument. Example: `const myFunction = function(x) { return x * 2; };`\"\n  },\n  {\n    \"front\": \"💡 When are anonymous functions useful?\",\n    \"back\": \"Anonymous functions are useful when you need a function for a short, specific task, especially as callbacks or arguments to other functions (e.g., in event listeners or array methods).\"\n  },\n  {\n    \"front\": \"⚙️ What are arrow functions?\",\n    \"back\": \"Arrow functions are a concise way to write anonymous functions in JavaScript, introduced in ES6. They use a shorter syntax. Example: `(x) => x * 2;`\"\n  },\n    {\n    \"front\": \"🧪 Example of calling a function that adds two numbers.\",\n    \"back\": \"`function add(a, b) { return a + b; }\\nlet sum = add(5, 3); // sum will be 8`\"\n  }\n]\n```"},
        ],
      },
     
    ],
  });

  export const generateQuizAndAns =  model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "const aiPrompt = `\nGenerate 5 to 7 question-and-answer pairs based on the following chapter:\n\n- Chapter Title: \"Introduction to Cells\"\n- Summary: \"Cells are the basic structural and functional units of life. They can be classified into prokaryotic and eukaryotic types. The cell theory explains the role of cells in biology. Organelles like the nucleus, mitochondria, and ribosomes perform specific functions. Understanding cells is fundamental to biology.\"\n\nInstructions:\n- Cover **all key concepts** mentioned in the summary.\n- Keep questions clear and beginner-friendly.\n- Use simple language but provide **detailed explanations**.\n- Format your response **as a valid JSON array**.\n- ⚠️ Do not include any text, titles, or markdown — only pure JSON.\n\nExample format:\n[\n  {\n    \"question\": \"What is a cell?\",\n    \"answer\": \"A cell is the basic structural and functional unit of all living organisms.\"\n  },\n  {\n    \"question\": \"What are the two main types of cells?\",\n    \"answer\": \"The two main types of cells are prokaryotic and eukaryotic.\"\n  }\n]\n`;\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"question\": \"What is a cell and why is it important?\",\n    \"answer\": \"A cell is the fundamental structural and functional unit of all known living organisms. It is the smallest unit of life that can replicate independently, and understanding cells is crucial for understanding how all living things function.\"\n  },\n  {\n    \"question\": \"What are the two main classifications of cells?\",\n    \"answer\": \"The two main classifications of cells are prokaryotic and eukaryotic. Prokaryotic cells lack a nucleus and other complex organelles, while eukaryotic cells have a nucleus and other membrane-bound organelles.\"\n  },\n  {\n    \"question\": \"Briefly explain the Cell Theory.\",\n    \"answer\": \"The Cell Theory is a fundamental principle in biology that states: (1) all living organisms are composed of one or more cells; (2) the cell is the basic unit of structure and organization in organisms; and (3) all cells arise from pre-existing cells.\"\n  },\n  {\n    \"question\": \"What is an organelle?\",\n    \"answer\": \"An organelle is a specialized subunit within a cell that performs a specific function. They are like the organs of a cell, each contributing to the cell's overall operation. Examples include the nucleus, mitochondria, and ribosomes.\"\n  },\n  {\n    \"question\": \"What is the role of the nucleus in a cell?\",\n    \"answer\": \"The nucleus is the control center of the cell and contains the cell's genetic material (DNA) in the form of chromosomes. It regulates gene expression and controls cell growth and reproduction.\"\n  },\n  {\n    \"question\": \"What is the function of mitochondria?\",\n    \"answer\": \"Mitochondria are often referred to as the 'powerhouses' of the cell. They are responsible for generating energy (ATP) through cellular respiration. This energy fuels various cellular activities.\"\n  },\n  {\n    \"question\": \"What do ribosomes do in a cell?\",\n    \"answer\": \"Ribosomes are responsible for protein synthesis. They translate genetic code from messenger RNA (mRNA) into proteins, which are essential for carrying out various cellular functions.\"\n  }\n]\n```"},
        ],
      },

    ],
  });


 export const generateQuiz = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {text: "const aiPrompt = `\nGenerate 5 to 7 question-and-answer pairs for the following chapter:\n\n- Chapter Title: \"${chapter?.chapter_title}\"\n- Summary: \"${chapter?.summary}\"\n\nInstructions:\n- Each item must include:\n  - \"question\": A clear, concise question based on key concepts in the summary.\n  - \"answer\": A correct and beginner-friendly answer to the question.\n  - \"options\": An array of exactly 4 total options — including the correct answer and 3 plausible but incorrect answers. The correct answer must match the \"answer\" field exactly.\n  - \"chapter\": A string containing the chapter title.\n\nAdditional Guidelines:\n- Wrong answers should be plausible to ensure a realistic multiple-choice experience.\n- Avoid duplicating the correct answer in the wrong options.\n- Ensure all content is accurate, relevant to the chapter, and easy to understand for beginners.\n- Return ONLY a valid JSON array — no introduction, no markdown, and no explanation. Just raw JSON.\n`\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n[\n  {\n    \"question\": \"What is the primary purpose of the chapter summary?\",\n    \"answer\": \"To provide a concise overview of the chapter's main points.\",\n    \"options\": [\n      \"To provide a concise overview of the chapter's main points.\",\n      \"To confuse the reader before they start reading the chapter.\",\n      \"To introduce entirely new topics not covered in the chapter.\",\n      \"To replace the need to read the actual chapter content.\"\n    ],\n    \"chapter\": \"${chapter?.chapter_title}\"\n  },\n  {\n    \"question\": \"What makes a good question for this exercise?\",\n    \"answer\": \"A clear, concise question based on key concepts in the summary.\",\n    \"options\": [\n      \"A clear, concise question based on key concepts in the summary.\",\n      \"A complex, ambiguous question unrelated to the summary.\",\n      \"A question with no correct answer.\",\n      \"A question that directly quotes a sentence from the summary.\"\n    ],\n    \"chapter\": \"${chapter?.chapter_title}\"\n  },\n  {\n    \"question\": \"How many options should each question have?\",\n    \"answer\": \"Exactly 4\",\n    \"options\": [\n      \"Exactly 4\",\n      \"As many as possible\",\n      \"3\",\n      \"5\"\n    ],\n    \"chapter\": \"${chapter?.chapter_title}\"\n  },\n  {\n    \"question\": \"What should the 'answer' field contain?\",\n    \"answer\": \"A correct and beginner-friendly answer to the question.\",\n    \"options\": [\n      \"A correct and beginner-friendly answer to the question.\",\n      \"A complex and technical explanation.\",\n      \"An intentionally incorrect answer.\",\n      \"A question instead of an answer.\"\n    ],\n    \"chapter\": \"${chapter?.chapter_title}\"\n  },\n  {\n    \"question\": \"What makes a good incorrect answer?\",\n    \"answer\": \"Plausible but incorrect to ensure a realistic multiple-choice experience.\",\n    \"options\": [\n      \"Plausible but incorrect to ensure a realistic multiple-choice experience.\",\n      \"Completely unrelated to the question.\",\n      \"Exactly the same as the correct answer.\",\n      \"Intentionally absurd and humorous.\"\n    ],\n    \"chapter\": \"${chapter?.chapter_title}\"\n  },\n  {\n    \"question\": \"What type of content should the questions and answers focus on?\",\n    \"answer\": \"Content that is accurate, relevant to the chapter, and easy to understand for beginners.\",\n    \"options\": [\n      \"Content that is accurate, relevant to the chapter, and easy to understand for beginners.\",\n      \"Advanced and highly technical concepts.\",\n      \"Incorrect information designed to trick the reader.\",\n      \"Topics unrelated to the chapter summary.\"\n    ],\n    \"chapter\": \"${chapter?.chapter_title}\"\n  },\n  {\n    \"question\": \"What format should the final output be in?\",\n    \"answer\": \"A valid JSON array.\",\n    \"options\": [\n      \"A valid JSON array.\",\n      \"Markdown with headings and paragraphs.\",\n      \"Plain text with no formatting.\",\n      \"HTML document with styling.\"\n    ],\n    \"chapter\": \"${chapter?.chapter_title}\"\n  }\n]\n```"},
        ],
      },
    ]
  })

