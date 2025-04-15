import { generateCourseNotes } from "@/config/AiModel";
import { db } from "@/config/db";
import { ChapterNotesTable, CourseMaterialsTable, usersTable } from "@/config/schema";
import { inngest } from "@/inngest/client";
import { eq } from "drizzle-orm";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const createNewUser = inngest.createFunction(
  { id: "create-user" },
  { event: "user.create" },
  async ({ event, step }) => {
    const { user } = event.data
    const email = user?.primaryEmailAddress?.emailAddress;
    const fullName = user?.fullName

    if (!email || !fullName) return null;
    const result = await step.run('Check User', async () => {
      const result = await db.select().from(usersTable).where(eq(usersTable.email, email))

      if (result?.length === 0) {
        const response = await db.insert(usersTable).values({
          userName: fullName,
          email: email
        }).returning({ id: usersTable.id })


      }
      return result

    })
    return 'Success'
  }

);


 

export const GenerateNotes = inngest.createFunction(
  { id: "generate-course" },
  { event: "notes.generate" },
  async ({ event, step }) => {
    const { course,email } = event.data;
    const difficultyLevel = course.difficultyLevel;
    const courseType = course.courseType;
    const courseId = course.courseId;

    const chapters = course?.courseLayout[0]?.chapters;

    // Use an array to store all database insert promises for chapters
    const chapterInsertPromises: any[] = [];

    for (const [index, chapter] of chapters.entries()) {


      const aiPrompt = `
⚠️ VERY IMPORTANT: Respond ONLY with raw HTML. Do NOT return the result inside any JSON structure, object, or array. No brackets, no keys. Just raw HTML content.

Generate detailed and user-friendly content in HTML for a chapter with the following information:

- Course Type: ${courseType}
- Difficulty Level: ${difficultyLevel}
- Chapter Title: ${chapter?.chapter_title}
- Overall Summary: ${chapter?.summary}

Guidelines:

1. The content should match the chapter title and align with the overall summary.
2. Include all topic points and core concepts relevant to the chapter.
3. Add appropriate resources, explanations, and helpful comments to make it informative.
4. Use **Tailwind CSS classes** to style the HTML for clarity and readability:
   - Use \`bg-gray-100 p-4 rounded-md\` for code blocks.
   - Use \`text-lg font-semibold mb-2\` for headings.
   - Use \`mt-6 mb-4\` for spacing between sections.
   - Use \`border-l-4 border-blue-500 pl-4\` for special sections or notes.
5. The output should be clean, attractive, and easy to understand for learners.

Use proper HTML formatting:
   - Use \`<h2 class="text-2xl font-bold underline mb-4">...</h2>\` for the main chapter title (bold + underline).
   - Use \`<h3 class="text-lg font-semibold mt-6 mb-2">...</h3>\` for subtopics.
   - Use \`<p class="mb-2">...</p>\` for explanations.
   - Use \`<ul class="list-disc pl-6 mb-4">\` and \`<li>\` for lists.
   - For code snippets, use \`<pre><code class="bg-gray-100 p-4 rounded-md text-sm block overflow-x-auto">...</code></pre>\`. Ensure indentation is consistent, and use inline comments for clarity.

6. Ensure code snippets are properly enclosed in \`<code>\` tags and are copyable, with additional formatting for clarity:
   - Add syntax highlighting (if possible).
   - Ensure indentation is clear and consistent.
   - Use inline comments to explain key parts of the code.
7. Use \`<br>\` tags for spacing between sections to enhance readability.
8. Add appropriate emojis to the main chapter title and possibly for key sections.
9. Do NOT include \`<html>\`, \`<head>\`, \`<body>\`, or \`<title>\` tags in the output.

⚠️ Repeat: Respond ONLY with raw HTML. Do NOT wrap it in an object, array, or JSON structure.
`;

      let response; // Declare response outside the try block

      try {
        const result = await generateCourseNotes.sendMessage(aiPrompt);
        response = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
        //console.log(`Generated HTML for chapter ${index}:`, response);
        chapterInsertPromises.push(...response);

      } catch (err) {
        console.error('Error calling generateCourseNotes.sendMessage:', err);
        continue; // Skip this chapter if API call fails
      }

      try {
        // Insert chapter notes and store the resulting promise
        const dbInsertPromise = await db.insert(ChapterNotesTable).values({
          chapterId: index,
          courseId,
          notes: response
        });

        chapterInsertPromises.push(dbInsertPromise);
      } catch (dbErr) {
        console.error('Error inserting into database:', dbErr);
      }
    }

    // Wait for all chapter insertions to complete
   // await Promise.all(chapterInsertPromises);

    // After all chapters have been inserted, update the course materials status
    try {
      await db.update(CourseMaterialsTable).set({
        status: 'Ready'
      }).where(eq(CourseMaterialsTable.courseId, courseId));
    } catch (dbErr) {
      console.error('Error updating course materials status:', dbErr);
    }

    try {
      const user = await db
  .select()
  .from(usersTable)
  .where(eq(usersTable.email, email));

if (user && user.length > 0) {
  const currentTokenCount = user[0].tokenCount ?? 0;
  await db.update(usersTable).set({
    tokenCount: currentTokenCount+1
  }).where(eq(usersTable.email, email));
}
    } catch (error) {
      console.error('Error updating user token count:', error);

    }

  

  

    return 'Success';
  });
