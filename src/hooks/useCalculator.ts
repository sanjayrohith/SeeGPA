import { useState, useEffect, useCallback } from 'react';
import { Subject, Semester, CalculatorData, GradingSystem, gradingSystems } from '@/types/calculator';

const STORAGE_KEY = 'cgpa-calculator-data';
const GRADING_SYSTEM_KEY = 'cgpa-calculator-grading-system';
const DATA_VERSION = '1.0.0';

interface StoredData {
  version: string;
  data: CalculatorData;
  gradingSystemId: string;
  timestamp: number;
}

// Safe data loading with migration support
const loadStoredData = (): { data: CalculatorData; gradingSystemId: string } => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      
      // Version check and migration logic can be added here
      if (parsed.version === DATA_VERSION) {
        return {
          data: parsed.data,
          gradingSystemId: parsed.gradingSystemId
        };
      }
      
      // For now, handle legacy data without version
      if (!parsed.version && parsed.semesters) {
        return {
          data: parsed as CalculatorData,
          gradingSystemId: gradingSystems[0].id
        };
      }
    }
  } catch (error) {
    console.warn('Failed to load stored data:', error);
  }
  
  return {
    data: {
      semesters: [],
      cgpa: 0,
      totalCredits: 0,
      totalGradePoints: 0,
    },
    gradingSystemId: gradingSystems[0].id
  };
};

// Safe data saving
const saveStoredData = (data: CalculatorData, gradingSystemId: string) => {
  try {
    const storedData: StoredData = {
      version: DATA_VERSION,
      data,
      gradingSystemId,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
  } catch (error) {
    console.error('Failed to save data:', error);
  }
};

export const useCalculator = () => {
  const [data, setData] = useState<CalculatorData>(() => {
    const { data } = loadStoredData();
    return data;
  });

  const [gradingSystem, setGradingSystem] = useState<GradingSystem>(() => {
    const { gradingSystemId } = loadStoredData();
    return gradingSystems.find(gs => gs.id === gradingSystemId) || gradingSystems[0];
  });

  // Save to localStorage whenever data or grading system changes
  useEffect(() => {
    saveStoredData(data, gradingSystem.id);
  }, [data, gradingSystem.id]);

  // Calculate SGPA for a semester
  const calculateSGPA = useCallback((subjects: Subject[]): number => {
    const totalCredits = subjects.reduce((sum, subject) => sum + subject.credits, 0);
    const totalGradePoints = subjects.reduce((sum, subject) => sum + (subject.gradePoints * subject.credits), 0);
    
    if (totalCredits === 0) return 0;
    return totalGradePoints / totalCredits;
  }, []);

  // Calculate overall CGPA
  const calculateCGPA = useCallback((semesters: Semester[]): { cgpa: number; totalCredits: number; totalGradePoints: number } => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    semesters.forEach(semester => {
      semester.subjects.forEach(subject => {
        totalCredits += subject.credits;
        totalGradePoints += subject.gradePoints * subject.credits;
      });
    });

    const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
    return { cgpa, totalCredits, totalGradePoints };
  }, []);

  // Update calculations
  const updateCalculations = useCallback((semesters: Semester[]) => {
    const updatedSemesters = semesters.map(semester => ({
      ...semester,
      sgpa: calculateSGPA(semester.subjects),
    }));

    const { cgpa, totalCredits, totalGradePoints } = calculateCGPA(updatedSemesters);

    setData({
      semesters: updatedSemesters,
      cgpa,
      totalCredits,
      totalGradePoints,
    });
  }, [calculateSGPA, calculateCGPA]);

  // Add new semester
  const addSemester = useCallback(() => {
    const newSemester: Semester = {
      id: Date.now().toString(),
      name: `Semester ${data.semesters.length + 1}`,
      subjects: [],
      sgpa: 0,
    };

    updateCalculations([...data.semesters, newSemester]);
  }, [data.semesters, updateCalculations]);

  // Remove semester
  const removeSemester = useCallback((semesterId: string) => {
    const updatedSemesters = data.semesters.filter(s => s.id !== semesterId);
    updateCalculations(updatedSemesters);
  }, [data.semesters, updateCalculations]);

  // Add subject to semester
  const addSubject = useCallback((semesterId: string) => {
    const newSubject: Subject = {
      id: Date.now().toString(),
      name: '',
      credits: 3,
      grade: '',
      gradePoints: 0,
    };

    const updatedSemesters = data.semesters.map(semester => 
      semester.id === semesterId 
        ? { ...semester, subjects: [...semester.subjects, newSubject] }
        : semester
    );

    updateCalculations(updatedSemesters);
  }, [data.semesters, updateCalculations]);

  // Remove subject from semester
  const removeSubject = useCallback((semesterId: string, subjectId: string) => {
    const updatedSemesters = data.semesters.map(semester => 
      semester.id === semesterId 
        ? { ...semester, subjects: semester.subjects.filter(s => s.id !== subjectId) }
        : semester
    );

    updateCalculations(updatedSemesters);
  }, [data.semesters, updateCalculations]);

  // Update subject
  const updateSubject = useCallback((semesterId: string, subjectId: string, updates: Partial<Subject>) => {
    const updatedSemesters = data.semesters.map(semester => 
      semester.id === semesterId 
        ? {
            ...semester, 
            subjects: semester.subjects.map(subject => 
              subject.id === subjectId 
                ? { 
                    ...subject, 
                    ...updates,
                    // Auto-update grade points if grade is changed
                    gradePoints: updates.grade !== undefined 
                      ? gradingSystem.grades[updates.grade] || 0
                      : subject.gradePoints
                  }
                : subject
            )
          }
        : semester
    );

    updateCalculations(updatedSemesters);
  }, [data.semesters, updateCalculations, gradingSystem]);

  // Update semester name
  const updateSemesterName = useCallback((semesterId: string, name: string) => {
    const updatedSemesters = data.semesters.map(semester => 
      semester.id === semesterId ? { ...semester, name } : semester
    );

    updateCalculations(updatedSemesters);
  }, [data.semesters, updateCalculations]);

  // Clear all data
  const clearData = useCallback(() => {
    setData({
      semesters: [],
      cgpa: 0,
      totalCredits: 0,
      totalGradePoints: 0,
    });
  }, []);

  return {
    data,
    gradingSystem,
    setGradingSystem,
    addSemester,
    removeSemester,
    addSubject,
    removeSubject,
    updateSubject,
    updateSemesterName,
    clearData,
  };
};