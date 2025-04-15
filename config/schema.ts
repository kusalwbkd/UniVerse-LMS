import { boolean, integer, json, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  userName: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  isMember:boolean().default(false),
  customerId:varchar(),
  tokenCount:integer().default(0)

});

export const CourseMaterialsTable=pgTable("courses",{
  id: serial().primaryKey(),
  courseId:varchar().notNull(),
  courseType:varchar().notNull(),
  topic:varchar().notNull(),
  difficultyLevel:varchar().default('Easy'),
  courseLayout:json(),
  createdBt:varchar().notNull(),
  status:varchar().default('Generating'),
  createdAt: timestamp().defaultNow(),

})

export const ChapterNotesTable=pgTable("chapterNotes",{
  id: serial().primaryKey(),
  courseId:varchar().notNull(),
  chapterId:integer().notNull(),
  notes:text(),
})

export const MaterialsTypeTable=pgTable("materialTypes",{
  id: serial().primaryKey(),
  courseId:varchar().notNull(),
  type:varchar().notNull(),
 
  content:json(),

})

export const PaymentRecordTable=pgTable("paymentTable",{
  id: serial().primaryKey(),
  customerId:varchar(),
  sessionId:varchar(),

})