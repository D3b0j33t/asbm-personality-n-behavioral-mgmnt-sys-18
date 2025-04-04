
export interface PersonalityTraits {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface Student {
  id: number;
  name: string;
  rollNumber: string;
  course: string;
  semester: number;
  attendance: number;
  behaviorScore: number;
  academicScore: number;
  avatar: string;
  testimonial?: string;
  behavioralIncidents?: string[];
  personalityTraits: PersonalityTraits;
  email: string;
  participationScore: number;
  strengths: string[];
  areasOfImprovement: string[];
  counselorNotes: string[];
}

// Generate random personality traits
export const generatePersonalityTraits = (): PersonalityTraits => {
  return {
    openness: Math.floor(Math.random() * 40) + 60, // 60-100
    conscientiousness: Math.floor(Math.random() * 40) + 60,
    extraversion: Math.floor(Math.random() * 40) + 60,
    agreeableness: Math.floor(Math.random() * 40) + 60,
    neuroticism: Math.floor(Math.random() * 40) + 60
  };
};

// Generate random student data
export const generateMockStudents = (count: number = 20): Student[] => {
  const courses = [
    "Master of Business Administration",
    "Bachelor of Business Administration",
    "Master of Commerce",
    "Bachelor of Computer Application",
    "Master of Arts in Psychology"
  ];
  
  const strengths = [
    "Critical thinking",
    "Problem-solving",
    "Leadership",
    "Communication",
    "Team collaboration",
    "Research skills",
    "Analytical reasoning",
    "Adaptability",
    "Time management",
    "Creativity"
  ];
  
  const areasOfImprovement = [
    "Public speaking",
    "Written communication",
    "Technical skills",
    "Detail orientation",
    "Conflict resolution",
    "Project management",
    "Delegation",
    "Work-life balance",
    "Meeting deadlines",
    "Accepting feedback"
  ];
  
  const counselorNotes = [
    "Shows good progress in academic performance",
    "Needs additional support with time management",
    "Recommended for peer mentoring program",
    "Discussed career path options",
    "Expressed interest in internship opportunities",
    "Addressed concerns about course workload",
    "Provided resources for stress management",
    "Suggested joining student clubs for networking",
    "Discussed study abroad opportunities",
    "Recommended academic resources for additional support"
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const courseIndex = Math.floor(Math.random() * courses.length);
    const semester = Math.floor(Math.random() * 8) + 1;
    const attendance = Math.floor(Math.random() * 30) + 70; // 70-100
    const behaviorScore = Math.floor(Math.random() * 20) + 80; // 80-100
    const academicScore = Math.floor(Math.random() * 40) + 60; // 60-100
    const participationScore = Math.floor(Math.random() * 50) + 50; // 50-100
    
    // Generate 2-4 random strengths
    const studentStrengths = shuffleArray([...strengths])
      .slice(0, Math.floor(Math.random() * 3) + 2);
    
    // Generate 2-4 random areas of improvement
    const studentAreasOfImprovement = shuffleArray([...areasOfImprovement])
      .slice(0, Math.floor(Math.random() * 3) + 2);
    
    // Generate 2-5 random counselor notes
    const studentCounselorNotes = shuffleArray([...counselorNotes])
      .slice(0, Math.floor(Math.random() * 4) + 2);
    
    return {
      id: i + 1,
      name: `Student ${i + 1}`,
      rollNumber: `${courses[courseIndex].substring(0, 3).toUpperCase()}${semester}${2025}${String(i + 1).padStart(3, '0')}`,
      course: courses[courseIndex],
      semester,
      attendance,
      behaviorScore,
      academicScore,
      avatar: `https://i.pravatar.cc/150?u=${i + 1}`,
      personalityTraits: generatePersonalityTraits(),
      email: `student${i + 1}@asbm.ac.in`,
      participationScore,
      strengths: studentStrengths,
      areasOfImprovement: studentAreasOfImprovement,
      counselorNotes: studentCounselorNotes,
      behavioralIncidents: []
    };
  });
};

// Helper function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export const mockStudents = generateMockStudents(20);

// Get a student by ID
export const getStudentById = (id: number): Student | undefined => {
  return mockStudents.find(student => student.id === id);
};
