import { Plus, Trash2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { SubjectRow } from './SubjectRow';
import { Semester, GradingSystem } from '@/types/calculator';

interface SemesterCardProps {
  semester: Semester;
  gradingSystem: GradingSystem;
  onUpdateName: (name: string) => void;
  onAddSubject: () => void;
  onRemoveSubject: (subjectId: string) => void;
  onUpdateSubject: (subjectId: string, updates: any) => void;
  onRemoveSemester: () => void;
}

export const SemesterCard = ({
  semester,
  gradingSystem,
  onUpdateName,
  onAddSubject,
  onRemoveSubject,
  onUpdateSubject,
  onRemoveSemester,
}: SemesterCardProps) => {
  const totalCredits = semester.subjects.reduce((sum, subject) => sum + subject.credits, 0);

  return (
    <Card className="bg-gradient-card shadow-card border-card-border animate-slide-up">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center space-x-3 flex-1">
          <GraduationCap className="h-5 w-5 text-primary" />
          <Input
            value={semester.name}
            onChange={(e) => onUpdateName(e.target.value)}
            className="text-lg font-semibold border-none bg-transparent p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
            aria-label="Semester name"
          />
        </div>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-strong">
            SGPA: <span className="font-bold text-primary">{semester.sgpa.toFixed(2)}</span>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onRemoveSemester}
                className="border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
                aria-label={`Delete ${semester.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete this semester</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 bg-muted/50 rounded-lg text-sm font-medium text-muted-strong">
          <div className="col-span-4">Subject Name</div>
          <div className="col-span-2">Credits</div>
          <div className="col-span-3">Grade</div>
          <div className="col-span-2">Points</div>
          <div className="col-span-1">Action</div>
        </div>

        {/* Subject Rows */}
        <div className="space-y-3">
          {semester.subjects.map((subject) => (
            <SubjectRow
              key={subject.id}
              subject={subject}
              gradingSystem={gradingSystem}
              onUpdate={(updates) => onUpdateSubject(subject.id, updates)}
              onRemove={() => onRemoveSubject(subject.id)}
            />
          ))}
        </div>

        {/* Add Subject Button */}
        <div className="pt-4 border-t border-card-border">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onAddSubject}
                variant="outline"
                className="w-full border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Add a new subject to this semester"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Subject
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a new subject to this semester</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Semester Summary */}
        <div className="pt-4 border-t border-card-border">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-strong">Total Credits:</span>
              <span className="font-medium">{totalCredits}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-strong">SGPA:</span>
              <span className="font-bold text-primary">{semester.sgpa.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};