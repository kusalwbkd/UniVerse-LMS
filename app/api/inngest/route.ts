import { serve } from "inngest/next";
import { inngest } from "../../../inngest/client";
import { createNewUser, GenerateNotes } from "../../../inngest/functions";

//export const runtime='edge'
// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  //streaming:'allow',
  functions: [
    createNewUser,
    GenerateNotes,

  ],
});
