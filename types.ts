export type FormDataType = {
    selectedCategory: string;
    description: string;
    difficultyLevel: string;
};

export type SelectOptionProps = {
    formData: FormDataType;
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};

// Assuming the shape of the data returned from the DB
export type CourseMaterial = {
    id: number;
    courseId: string;
    courseType: string;
    topic: string;
    difficultyLevel: string;
    courseLayout: Record<string, any>; // Or replace with a more specific type if needed
    createdBt: string;
    status: string;
    createdAt:Date
  };
  

  // Define the type for the table row
export type CourseContentTableRow = {
    id: number; // Assuming 'id' is an auto-incrementing integer (serial)
    courseId: string; // A string for courseId, as it's a varchar in the DB
    chapterId: number; // A number for chapterId, as it's an integer in the DB
    notes: string | null; // 'notes' can be null, or a string value if present
  };
  
  // Example response structure (for API response)
  type CourseContentApiResponse = {
    result: CourseContentTableRow[];
  };
  
export type FlashCardTypes={
  front:string,
  back:string,
  chapter:string
}

export type Question = {
  question: string;
  answer: string;
};

export type QuizItem = {
  chapter: string;
  questions: Question[];
};

export type QuizSingleItem={
  chapter:string,
  answer:string,
  question:string,
  options:string[]

}

export type Quiz = QuizItem[];

export type UserResponse = {
  id: number;
  userName: string;
  email: string;
  isMember: boolean;
};
