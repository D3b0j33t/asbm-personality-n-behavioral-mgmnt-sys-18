
export interface Course {
  id: string;
  title: string;
  instructor: string;
  subject: string;
  color: string;
  pendingAssignments: number;
  description?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  course: string;
  semester: number;
  attendance: number;
  behaviorScore: number;
  academicScore: number;
  avatar: string;
  behavioralIncidents: any[];
  testimonial?: string;
}

export interface Teacher {
  id: string;
  name: string;
  department: string;
  subject: string;
  designation: string;
  qualification: string;
  email: string;
  avatar: string;
  bio: string;
}

export interface Facility {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

export interface Program {
  id: string;
  name: string;
  shortName: string;
  duration: string;
  eligibility: string;
  description: string;
}

export interface UniversityInfo {
  name: string;
  shortName: string;
  establishedYear: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  leadership: {
    president: string;
    viceChancellor: string;
    proViceChancellor: string;
    registrar: string;
  };
  aboutText: string;
}

// Courses data
export const mockCourses: Course[] = [
  {
    id: "1",
    title: "Master of Business Administration (MBA)",
    instructor: "Various Faculty Members",
    subject: "Business Administration",
    color: "#4285F4",
    pendingAssignments: 3,
    description: "A two-year full-time residential MBA program with options for single or dual specializations in areas such as Human Resource Management, Financial Management, Marketing Management, Operations & Logistics, and Business Analytics."
  },
  {
    id: "2",
    title: "Bachelor of Business Administration (BBA)",
    instructor: "Various Faculty Members",
    subject: "Business Administration",
    color: "#0F9D58",
    pendingAssignments: 2,
    description: "An undergraduate program focusing on business fundamentals and management principles, designed to develop future business leaders."
  },
  {
    id: "3",
    title: "Master of Commerce (M.Com)",
    instructor: "Various Faculty Members",
    subject: "Commerce",
    color: "#DB4437",
    pendingAssignments: 1,
    description: "A postgraduate program that provides advanced knowledge in commerce, accounting, and finance, preparing students for professional careers in the financial sector."
  },
  {
    id: "4",
    title: "Bachelor of Commerce (B.Com)",
    instructor: "Various Faculty Members",
    subject: "Commerce",
    color: "#F4B400",
    pendingAssignments: 0,
    description: "An undergraduate program offering comprehensive knowledge in commerce, accounting, and business law, laying the foundation for a career in commerce and finance."
  },
  {
    id: "5",
    title: "Master of Arts in Applied Psychology",
    instructor: "Various Faculty Members",
    subject: "Psychology",
    color: "#673AB7",
    pendingAssignments: 2,
    description: "A postgraduate program that explores theoretical concepts in psychology and trains students to address human behavior issues in various settings."
  },
  {
    id: "6",
    title: "Bachelor of Arts in Psychology",
    instructor: "Various Faculty Members",
    subject: "Psychology",
    color: "#FF6D00",
    pendingAssignments: 1,
    description: "An undergraduate program focusing on the study of human behavior and mental processes, preparing students for careers in psychology and related fields."
  },
  {
    id: "7",
    title: "Master of Computer Application (MCA)",
    instructor: "Various Faculty Members",
    subject: "Computer Applications",
    color: "#2196F3",
    pendingAssignments: 3,
    description: "A postgraduate program designed to provide comprehensive knowledge in computer applications and software development."
  },
  {
    id: "8",
    title: "Bachelor of Computer Application (BCA)",
    instructor: "Various Faculty Members",
    subject: "Computer Applications",
    color: "#009688",
    pendingAssignments: 2,
    description: "An undergraduate program that imparts knowledge in computer applications and prepares students for careers in the IT industry."
  },
  {
    id: "9",
    title: "Bachelor of Technology in Computer Science & Information Technology (B.Tech CSIT)",
    instructor: "Various Faculty Members",
    subject: "Engineering",
    color: "#795548",
    pendingAssignments: 4,
    description: "An undergraduate engineering program focusing on computer science and information technology, equipping students with technical skills for the IT industry."
  },
  {
    id: "10",
    title: "BBA LL.B. (Hons.)",
    instructor: "Various Faculty Members",
    subject: "Law",
    color: "#607D8B",
    pendingAssignments: 0,
    description: "An integrated five-year program combining business administration and law, preparing students for careers in corporate law and business management."
  },
  {
    id: "11",
    title: "BA LL.B. (Hons.)",
    instructor: "Various Faculty Members",
    subject: "Law",
    color: "#E91E63",
    pendingAssignments: 1,
    description: "An integrated five-year program combining arts and law, designed to develop legal professionals with a strong foundation in humanities."
  },
  {
    id: "12",
    title: "Master of Laws (LL.M)",
    instructor: "Various Faculty Members",
    subject: "Law",
    color: "#9C27B0",
    pendingAssignments: 2,
    description: "A postgraduate law program offering advanced legal studies with specializations in corporate and commercial law."
  }
];

// Students data
export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Rajesh Kumar Das",
    rollNumber: "MBA2024001",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 93,
    behaviorScore: 88,
    academicScore: 90,
    avatar: "https://i.pravatar.cc/150?u=1",
    behavioralIncidents: [],
    testimonial: "ASBM University provided an excellent platform for holistic growth and development as it has excellent infrastructure and student-friendly amenities. One can always see the team of committed faculty striving hard in excelling the students in all dimensions."
  },
  {
    id: "2",
    name: "Subrat Barla",
    rollNumber: "MBA2024002",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 88,
    behaviorScore: 85,
    academicScore: 82,
    avatar: "https://i.pravatar.cc/150?u=2",
    behavioralIncidents: [],
    testimonial: "ASBM University is a place of learning, fun and many such life preaching activities. Studying for two years at this Institute has helped me to grow professionally and individually."
  },
  {
    id: "3",
    name: "Anmol Acharya",
    rollNumber: "MBA2024003",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 92,
    behaviorScore: 88,
    academicScore: 90,
    avatar: "https://i.pravatar.cc/150?u=3",
    behavioralIncidents: [],
    testimonial: "The educational experience at ASBM University is one of the best that I have ever had in my life. I would thank all the teaching and non-teaching staff for their efforts."
  },
  {
    id: "4",
    name: "Jaya Satpathy",
    rollNumber: "MBA2024004",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 85,
    behaviorScore: 87,
    academicScore: 85,
    avatar: "https://i.pravatar.cc/150?u=4",
    behavioralIncidents: [],
    testimonial: "ASBM University stood tall and true to its repute and legacy. The placement and industry connect team worked day in and out, were robust and proactive."
  },
  {
    id: "5",
    name: "Amlan Jena",
    rollNumber: "MBA2024005",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 90,
    behaviorScore: 89,
    academicScore: 87,
    avatar: "https://i.pravatar.cc/150?u=5",
    behavioralIncidents: [],
    testimonial: "Campus life at ASBM guided me and provided me with a good platform for my career. All credit goes to all the faculty members who supported us throughout."
  },
  {
    id: "6",
    name: "Sabyasachi Nanda",
    rollNumber: "MBA2024006",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 93,
    behaviorScore: 90,
    academicScore: 89,
    avatar: "https://i.pravatar.cc/150?u=6",
    behavioralIncidents: [],
    testimonial: "The ASBM university is one of the best B Schools in Bhubaneshwar, Odisha."
  },
  {
    id: "7",
    name: "Sasmita Rani Mohanty",
    rollNumber: "MBA2024007",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 91,
    behaviorScore: 87,
    academicScore: 86,
    avatar: "https://i.pravatar.cc/150?u=7",
    behavioralIncidents: [],
    testimonial: "The learning environment and faculty support at ASBM helped me grow both academically and personally. The workshops and seminars were especially enriching."
  },
  {
    id: "8",
    name: "Rohan Pradhan",
    rollNumber: "MBA2024008",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 89,
    behaviorScore: 86,
    academicScore: 84,
    avatar: "https://i.pravatar.cc/150?u=8",
    behavioralIncidents: [],
    testimonial: "ASBM gave me the confidence to excel in group discussions, interviews, and corporate communication. The mock placement drills were very helpful."
  },
  {
    id: "9",
    name: "Megha Das",
    rollNumber: "MBA2024009",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 94,
    behaviorScore: 91,
    academicScore: 92,
    avatar: "https://i.pravatar.cc/150?u=9",
    behavioralIncidents: [],
    testimonial: "ASBM University truly nurtures its students. I've been able to develop leadership, communication and analytical skills thanks to all the programs and guidance."
  },
  {
    id: "10",
    name: "Arvind Behera",
    rollNumber: "MBA2024010",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 87,
    behaviorScore: 84,
    academicScore: 83,
    avatar: "https://i.pravatar.cc/150?u=10",
    behavioralIncidents: [],
    testimonial: "Studying at ASBM was a game changer. The mentorship and real-world exposure prepared me for a career in corporate strategy and consulting."
  },
  {
    id: "11",
    name: "Priyanka Panda",
    rollNumber: "MBA2024011",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 90,
    behaviorScore: 89,
    academicScore: 88,
    avatar: "https://i.pravatar.cc/150?u=11",
    behavioralIncidents: [],
    testimonial: "I am proud to be an ASBM alumna. The university not only equipped me with knowledge but also helped me gain confidence and a professional outlook."
  },
  {
    id: "12",
    name: "Sourav Samantaray",
    rollNumber: "MBA2024012",
    course: "Master of Business Administration",
    semester: 4,
    attendance: 86,
    behaviorScore: 85,
    academicScore: 80,
    avatar: "https://i.pravatar.cc/150?u=12",
    behavioralIncidents: [],
    testimonial: "The interactive and case-based learning at ASBM made all the difference in shaping my problem-solving and analytical mindset."
  }
];

// Teachers data
export const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Biswajeet Pattanayak",
    department: "Management",
    subject: "Organizational Leadership",
    designation: "President",
    qualification: "Ph.D., MBA",
    email: "biswajeet@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty1",
    bio: "Founder of ASBM University with extensive experience in leadership and organizational behavior."
  },
  {
    id: "2",
    name: "Dr. Kalyan Shankar Ray",
    department: "Strategic Management",
    subject: "Strategic Planning",
    designation: "Vice President",
    qualification: "Ph.D., MBA",
    email: "kalyan.ray@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty2",
    bio: "Specializes in strategic planning and institutional development."
  },
  {
    id: "3",
    name: "Dr. Ranjan Kumar Bal",
    department: "Economics",
    subject: "Managerial Economics",
    designation: "Vice Chancellor",
    qualification: "Ph.D., MA Economics",
    email: "ranjan.bal@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty3",
    bio: "Renowned academician and policy advisor with expertise in economics and development studies."
  },
  {
    id: "4",
    name: "Dr. Phalgu Niranjana",
    department: "Management",
    subject: "Change Management",
    designation: "Pro-Vice Chancellor",
    qualification: "Ph.D., MBA",
    email: "phalgu.niranjana@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty4",
    bio: "Expert in managing organizational change and behavioral sciences."
  },
  {
    id: "5",
    name: "Dr. Jibendu Kumar Mantri",
    department: "Administration",
    subject: "University Governance",
    designation: "Registrar",
    qualification: "Ph.D.",
    email: "jibendu.mantri@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty5",
    bio: "Oversees academic administration and institutional policies."
  },
  {
    id: "6",
    name: "Dr. M. N. Samantaray",
    department: "Academics & Research",
    subject: "Research Methodology",
    designation: "Dean, Academics & Research",
    qualification: "Ph.D.",
    email: "samantaray@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty6",
    bio: "Leads academic and research initiatives with a focus on quality education."
  },
  {
    id: "7",
    name: "Dr. Eirene Leela Rout",
    department: "Business Administration",
    subject: "Business Communication",
    designation: "Dean, School of Business",
    qualification: "Ph.D., MBA",
    email: "eirene.rout@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty7",
    bio: "Focuses on managerial communication and HR development."
  },
  {
    id: "8",
    name: "Dr. Padmanava Mohapatra",
    department: "Accounting & Finance",
    subject: "Cost Accounting",
    designation: "Dean, School of Accountancy",
    qualification: "Ph.D., M.Com",
    email: "padmanava@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty8",
    bio: "Specialist in financial reporting, cost accounting, and audit."
  },
  {
    id: "9",
    name: "Dr. Ricky Mohanty",
    department: "Information Systems",
    subject: "Management Information Systems",
    designation: "Dean, School of Information Systems",
    qualification: "Ph.D., MCA",
    email: "ricky.mohanty@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty9",
    bio: "Expert in IT strategy, data analytics, and enterprise systems."
  },
  {
    id: "10",
    name: "Dr. Ananta Charan Mishra",
    department: "Liberal Arts",
    subject: "English Literature",
    designation: "Head, School of Liberal Arts",
    qualification: "Ph.D.",
    email: "ananta.mishra@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty10",
    bio: "Dedicated to liberal arts education with focus on language, literature, and culture."
  },
  {
    id: "11",
    name: "Dr. Premananda Ranasingh",
    department: "Law",
    subject: "Constitutional Law",
    designation: "Dean, School of Law",
    qualification: "Ph.D., LL.M",
    email: "prem.ranasingh@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty11",
    bio: "Practicing academic in legal education and judicial reforms."
  },
  {
    id: "12",
    name: "Prof. Saroj Kumar Bishey",
    department: "Admissions",
    subject: "Student Development",
    designation: "Asst. Dean, Admission",
    qualification: "MBA",
    email: "saroj.bishey@asbm.ac.in",
    avatar: "https://i.pravatar.cc/150?u=faculty12",
    bio: "Focuses on student engagement, admissions, and outreach strategies."
  }
];

export const universityInfo: UniversityInfo = {
  name: "ASBM University",
  shortName: "ASBMU",
  establishedYear: 2019,
  address: {
    street: "Shiksha Vihar, Bhola, Chandaka",
    city: "Bhubaneswar",
    state: "Odisha",
    zip: "754012",
    country: "India"
  },
  contact: {
    phone: "+91 674 2374801",
    email: "info@asbm.ac.in",
    website: "https://www.asbm.ac.in"
  },
  socialMedia: {
    facebook: "https://www.facebook.com/ASBMUniversity",
    twitter: "https://twitter.com/asbmuniversity",
    linkedin: "https://www.linkedin.com/school/asbm-university/",
    instagram: "https://www.instagram.com/asbmuniversity/"
  },
  leadership: {
    president: "Prof. (Dr.) Biswajeet Pattanayak",
    viceChancellor: "Prof. (Dr.) Ranjan Kumar Bal",
    proViceChancellor: "Dr. Phalgu Niranjana",
    registrar: "Dr. Jibendu Kumar Mantri"
  },
  aboutText: "ASBM University, established by the Government of Odisha in 2019, has evolved from the Asian School of Business Management founded in 2006. The university is dedicated to imparting value-based quality education that builds leadership, emphasizing learning through experimentation and innovation."
};

export const facilities: Facility[] = [
  {
    id: "library",
    name: "Chanakya Knowledge Centre",
    description: "An air-conditioned central library with over 28,000 books and access to 11,850 international and national journals through platforms like ProQuest, EBSCO, and J-Gate. It serves as a crucial resource center for students, researchers, and faculty members.",
    image: "https://www.asbm.ac.in/wp-content/uploads/2023/05/library.jpg"
  },
  {
    id: "hostel",
    name: "Student Hostels",
    description: "Separate hostel facilities for boys and girls inside the campus, equipped with modern amenities to ensure a comfortable living environment.",
    image: "https://www.asbm.ac.in/wp-content/uploads/2023/05/hostel.jpg"
  },
  {
    id: "sports",
    name: "Sports Facilities",
    description: "Comprehensive sports facilities including outdoor games like cricket and basketball, promoting physical well-being and team spirit among students.",
    image: "https://www.asbm.ac.in/wp-content/uploads/2023/05/sports.jpg"
  },
  {
    id: "foodcourt",
    name: "Food Court",
    description: "A variety of hygienic and nutritious food options catering to diverse tastes, ensuring students have access to balanced meals.",
    image: "https://www.asbm.ac.in/wp-content/uploads/2023/05/foodcourt.jpg"
  },
  {
    id: "gymnasium",
    name: "Gymnasium",
    description: "A well-equipped gymnasium promoting health and fitness among students and staff.",
    image: "https://www.asbm.ac.in/wp-content/uploads/2023/05/gymnasium.jpg"
  }
];

export const events: Event[] = [
  {
    id: "1",
    title: "National Hackathon 2025",
    date: "2025-03-01",
    description: "ASBM University is thrilled to announce the National Hackathon Event 2025, a premier platform for tech enthusiasts to innovate, code, and conquer! The event will take place on 1st March 2025 at the ASBM University campus, Chandaka, Bhubaneswar.",
    image: "https://www.asbm.ac.in/wp-content/uploads/2025/02/hackathon-2025.jpg",
    link: "https://www.asbm.ac.in/news/asbm-university-to-host-national-hackathon-event-2025-on-1st-march/"
  },
  {
    id: "2",
    title: "ASBM Confluence 2025 – The Grand Alumni Meet",
    date: "2025-02-08",
    description: "ASBM University proudly invites you to Confluence 2025, our Grand Alumni Meet! Join us on 8th February 2025 at our beautiful Bhubaneswar campus as we bring together alumni from across the globe for a memorable day of nostalgia, networking, and camaraderie.",
    image: "https://www.asbm.ac.in/wp-content/uploads/2025/01/confluence-2025.jpg",
    link: "https://www.asbm.ac.in/asbm-confluence-2025-the-grand-alumni-meet/"
  },
  {
    id: "3",
    title: "Moot Court Competition 2025",
    date: "2025-03-21",
    description: "The ASBM School of Law is set to host its First Moot Court Competition on March 21-22, 2025, offering aspiring legal professionals a platform to showcase their advocacy skills, legal reasoning, and courtroom etiquette.",
    image: "https://www.asbm.ac.in/wp-content/uploads/2025/02/moot-court-2025.jpg",
    link: "https://www.asbm.ac.in/events/moot-court-competition-2025/"
  },
  {
    id: "4",
    title: "10th International Management Conference – IMCon 2025",
    date: "2025-02-21",
    description: "Join us for the 10th International Management Conference (IMCon 2025), focusing on 'Navigating the Future: Management Strategies for Sustainable Transformation.' The conference will be held on 21st and 22nd February 2025 at ASBM University.",
    image: "https://www.asbm.ac.in/wp-content/uploads/2025/01/imcon-2025.jpg",
    link: "https://www.asbm.ac.in/events/10th-international-management-conference-imcon-2025/"
  }
];
