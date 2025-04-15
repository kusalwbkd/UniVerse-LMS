import{CheckCircle, LayoutDashboard,Shield, ShieldCheck, Star, UserCircle} from 'lucide-react'


export const menuList=[
    {
      name:"Dashboard",
      icon: LayoutDashboard,
      path:"/dashboard"
    },
    {
      name:"Upgrade",
      icon:Shield,
      path:"/dashboard/upgrade"
    },
    {
      name:"Profile",
      icon:UserCircle,
      path:"/dashboard/profile"
    }
  ]

export const options=[
  {
    name:"Exam Preparation",
    icon:"/exam-time.png"
  },
  {
    name:"Job Interview",
    icon:"/interview.png"
  },
  {
    name:"Coding Practice",
    icon:"/programming.png"
  },
  {
    name:"Study",
    icon:"/open-book.png"
  }
]

export const courseImageMap: { [key: string]: string } = {
  'Job Interview': '/interview.png',
  'Coding Practice': '/programming.png',
  'Exam Preparation': '/exam-time.png',
  'Study': '/open-book.png',
};

export const difficultyIcons = {
  Easy: {
    icon: CheckCircle
  
  },
  Moderate: {
    icon: Star
   
  },
  Hard: {
    icon: ShieldCheck   
  },
};



export const courseFeatures = [
  {
    name: "Notes",
    description: "Read structured study materials and chapter notes.",
    icon:"/note.png",
    matcher:'notes',
    path: "/notes",
  },
 
  {
    name: "Flash Cards",
    description: "Enhance your memory with interactive flashcards.",
    icon:"/flash-card.png",
    matcher:'flash_cards',
    path: "/flash_cards",
  },
  {
    name: "Q&A",
    description: "Test your knowledge with timed quizzes.",
    icon: "/qa.png",
    matcher:'qa',
    path: "/qa",
  },

  {
    name: "Quiz",
    description: "Test your knowledge with timed quizzes.",
    icon: "/quiz.png",
    matcher:'quiz',
    path: "/quiz",
  },
 
 
  
];
