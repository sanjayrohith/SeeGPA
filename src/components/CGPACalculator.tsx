import { useState } from 'react';
import { Plus, Calculator, BookOpen, TrendingUp, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SemesterCard } from './SemesterCard';
import { ResultCard } from './ResultCard';
import { ThemeToggle } from './ThemeToggle';
import { EmptyState } from './EmptyState';
import { useCalculator } from '@/hooks/useCalculator';
import { gradingSystems } from '@/types/calculator';

export const CGPACalculator = () => {
  const {
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
  } = useCalculator();

  const handleExportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cgpa-calculator-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-primary">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">CGPA Calculator</h1>
                <p className="text-sm text-muted-foreground">Track your academic progress</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Grading System Selector */}
              <Select 
                value={gradingSystem.id} 
                onValueChange={(value) => {
                  const system = gradingSystems.find(s => s.id === value);
                  if (system) setGradingSystem(system);
                }}
              >
                <SelectTrigger className="w-32 md:w-48 border-primary/20 text-xs md:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradingSystems.map((system) => (
                    <SelectItem key={system.id} value={system.id}>
                      <span className="hidden md:inline">{system.name}</span>
                      <span className="md:hidden">{system.id.toUpperCase()}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Results Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ResultCard
            title="Overall CGPA"
            value={data.cgpa}
            scale={gradingSystem.scale}
            icon={<TrendingUp className="h-4 w-4" />}
            gradient={true}
          />
          <ResultCard
            title="Total Credits"
            value={data.totalCredits}
            scale={200} // Assuming max 200 credits
            icon={<BookOpen className="h-4 w-4" />}
          />
          <ResultCard
            title="Total Semesters"
            value={data.semesters.length}
            scale={8} // Assuming max 8 semesters
            icon={<Calculator className="h-4 w-4" />}
          />
        </section>

        {/* Action Buttons */}
        <section className="flex flex-wrap gap-4 justify-center md:justify-start">
          <Button 
            onClick={addSemester}
            className="bg-gradient-primary hover:bg-gradient-secondary text-white shadow-primary transition-smooth hover-lift"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Semester
          </Button>
          
          <Button
            variant="outline"
            onClick={handleExportData}
            className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          
          <Button
            variant="outline"
            onClick={clearData}
            className="border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
          >
            Clear All Data
          </Button>
        </section>

        {/* Semesters Section */}
        <section className="space-y-6">
          {data.semesters.length === 0 ? (
            <EmptyState onAddSemester={addSemester} />
          ) : (
            <div className="space-y-6">
              {data.semesters.map((semester) => (
                <SemesterCard
                  key={semester.id}
                  semester={semester}
                  gradingSystem={gradingSystem}
                  onUpdateName={(name) => updateSemesterName(semester.id, name)}
                  onAddSubject={() => addSubject(semester.id)}
                  onRemoveSubject={(subjectId) => removeSubject(semester.id, subjectId)}
                  onUpdateSubject={(subjectId, updates) => updateSubject(semester.id, subjectId, updates)}
                  onRemoveSemester={() => removeSemester(semester.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* Tips Section */}
        {data.semesters.length > 0 && (
          <section>
            <Card className="bg-gradient-secondary border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary">Tips for Better Grades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-strong">
                  <div className="space-y-2">
                    <p>• Maintain consistent study habits</p>
                    <p>• Attend all classes and participate actively</p>
                    <p>• Complete assignments on time</p>
                  </div>
                  <div className="space-y-2">
                    <p>• Form study groups with classmates</p>
                    <p>• Use office hours to clarify doubts</p>
                    <p>• Review and revise regularly</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>Built with ❤️ for students worldwide. Keep learning and growing!</p>
        </div>
      </footer>
    </div>
  );
};