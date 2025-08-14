import { useState, useEffect, useCallback } from 'react';
import { Subject, Semester, CalculatorData, GradingSystem, gradingSystems } from '@/types/calculator';

const STORAGE_KEY = 'cgpa-calculator-data';

export const useCalculator = () => {
  const [data, setData] = useState<CalculatorData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to default
      }
    }
    return {
      semesters: [],
      cgpa: 0,
      totalCredits: 0,
      totalGradePoints: 0,
    };
  });

  const [gradingSystem, setGradingSystem] = useState<GradingSystem>(gradingSystems[0]);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

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