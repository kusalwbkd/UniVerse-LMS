import { generateCoursFlashCards, generateQuiz, generateQuizAndAns } from "@/config/AiModel";
import { db } from "@/config/db";
import { CourseMaterialsTable, MaterialsTypeTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { course, type
  } = await req.json()

  const summary = course?.courseLayout[0]?.overall_summary
  const numOfChapters = course?.courseLayout[0]?.chapters?.length
  const chapters = course?.courseLayout[0]?.chapters
  const courseId = course?.courseId

  //let responseText

  if (type === 'Flash Cards') {
    const allQuestions: any[] = []; // To store flashcards from all chapters

    for (const [index, chapter] of chapters.entries()) {
      const aiPrompt = `
          Generate a maximum of 3 flashcards for the following Chapter
          - Chapter Title: "${chapter?.chapter_title}"
          - Summary: "${chapter?.summary}"
          
          Generate flashcards in JSON format.
          Each flashcard should be a JSON object with these fields:
          "chapter": "Chapter Title Here",
          - "front": A question, keyword, or term — prefixed with a suitable emoji (e.g., 📘, 💡, 🧠, 🧪, ⚙️).
          - "back": A clear and detailed answer or explanation.
          
          💡 Return ONLY a single JSON object. No text or markdown. Just the JSON object.
        `;

      try {
        const aiResp = await generateCoursFlashCards.sendMessage(aiPrompt);
        const responseText = JSON.parse(aiResp?.response?.candidates?.[0]?.content?.parts?.[0]?.text);

        allQuestions.push(...responseText);

      } catch (error) {
        console.error(`Error generating flashcards for chapter ${chapter?.chapter_title}:`, error);
        // Continue to next chapter
      }
    }

    // ✅ Now save everything to the DB AFTER the loop
    try {
      const dbResponse = await db.insert(MaterialsTypeTable).values({
        courseId,
        content: allQuestions,
        type
      }).returning();

      return NextResponse.json({ results: dbResponse });

    } catch (error) {
      console.log("Error while saving to db", error);
      return NextResponse.json({ error: "Failed to save flashcards to the database" }, { status: 500 });
    }
  }

  if (type === 'Q&A') {
    const allQuestions: any[] = [];

    for (const [index, chapter] of chapters.entries()) {
      const aiPrompt = `
        Generate 5 to 7 question-and-answer pairs for the following chapter:
        
        - Chapter Title: "${chapter?.chapter_title}"
        - Summary: "${chapter?.summary}"
        
        Instructions:
        - Each question-answer pair must be relevant to the key concepts from the summary.
        - Add a field called "chapter" in each object to indicate which chapter the question belongs to.
        - Questions should be clear and concise.
        - Answers must be informative and beginner-friendly.
        - Return ONLY a valid JSON array — no intro text, markdown, or explanation.
        
        Format:
        [
          {
            "chapter": "Chapter Title Here",
            "question": "Your question here?",
            "answer": "Detailed answer here."
          },
          ...
        ]
        `;

      try {
        const result = await generateQuizAndAns.sendMessage(aiPrompt);
        const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        const parsed = JSON.parse(responseText);
        allQuestions.push({ chapter: chapter.chapter_title, questions: parsed });



      } catch (err) {
        console.error(`❌ Error generating for chapter ${index + 1}:`, err);
        continue; // Skip failed chapter
      }
    }

    // ✅ Now save everything to the DB AFTER the loop
    try {
      const dbResponse = await db.insert(MaterialsTypeTable).values({
        courseId,
        content: allQuestions,
        type
      }).returning();

      return NextResponse.json({ results: dbResponse });

    } catch (error) {
      console.log("Error while saving to db", error);
      return NextResponse.json({ error: "Failed to save questions and answers to the database" }, { status: 500 });
    }

  }

  if (type === 'Quiz') {
    const allQuestions: any[] = [];

    for (const [index, chapter] of chapters.entries()) {
      const aiPrompt = `
Generate 5 to 7 question-and-answer pairs for the following chapter:

- Chapter Title: "${chapter?.chapter_title}"
- Summary: "${chapter?.summary}"

Instructions:
- Each item must include:
  - "question": A clear, concise question based on key concepts in the summary.
  - "answer": A correct and beginner-friendly answer to the question.
  - "options": An array of exactly 4 total options — including the correct answer and 3 plausible but incorrect answers. The correct answer must match the "answer" field exactly.
  - "chapter": A string containing the chapter title.

Additional Guidelines:
- Wrong answers should be plausible to ensure a realistic multiple-choice experience.
- Avoid duplicating the correct answer in the wrong options.
- Ensure all content is accurate, relevant to the chapter, and easy to understand for beginners.
- Return ONLY a valid JSON array — no introduction, no markdown, and no explanation. Just raw JSON.
`


      try {
        const result = await generateQuiz.sendMessage(aiPrompt);
        const responseText = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

        const parsed = JSON.parse(responseText);
        allQuestions.push({ questions: parsed });



      } catch (err) {
        console.error(`❌ Error generating for chapter ${index + 1}:`, err);
        continue; // Skip failed chapter
      }
    }

    // ✅ Now save everything to the DB AFTER the loop
    try {
      const dbResponse = await db.insert(MaterialsTypeTable).values({
        courseId,
        content: allQuestions,
        type
      }).returning();

      return NextResponse.json({ results: dbResponse });

    } catch (error) {
      console.log("Error while saving to db", error);
      return NextResponse.json({ error: "Failed to save questions and answers to the database" }, { status: 500 });
    }
  }

}