export interface Subject {
  id: string;
  name: string;
  credits: number;
  grade: string;
  gradePoints: number;
}

export interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
  sgpa: number;
}

export interface CalculatorData {
  semesters: Semester[];
  cgpa: number;
  totalCredits: number;
  totalGradePoints: number;
}

export interface GradingSystem {
  id: string;
  name: string;
  scale: number;
  grades: {
    [key: string]: number;
  };
}

export const gradingSystems: GradingSystem[] = [
  {
    id: '10-point',
    name: '10-Point Scale',
    scale: 10,
    grades: {
      'O': 10,
      'A+': 9,
      'A': 8,
      'B+': 7,
      'B': 6,
      'C+': 5,
      'C': 4,
      'F': 0,
    },
  },
  {
    id: '4-point',
    name: '4-Point Scale (GPA)',
    scale: 4,
    grades: {
      'A': 4.0,
      'A-': 3.7,
      'B+': 3.3,
      'B': 3.0,
      'B-': 2.7,
      'C+': 2.3,
      'C': 2.0,
      'C-': 1.7,
      'D+': 1.3,
      'D': 1.0,
      'F': 0.0,
    },
  },
];

export const defaultSubject: Omit<Subject, 'id'> = {
  name: '',
  credits: 3,
  grade: '',
  gradePoints: 0,
};

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  college?: string;
  course?: string;
  createdAt: Date;
}

export interface UserFormData {
  name: string;
  email: string;
  phone: string;
  college: string;
  course: string;
}