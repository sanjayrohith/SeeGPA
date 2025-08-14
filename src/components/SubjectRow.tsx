import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Subject, GradingSystem } from '@/types/calculator';

interface SubjectRowProps {
  subject: Subject;
  gradingSystem: GradingSystem;
  onUpdate: (updates: Partial<Subject>) => void;
  onRemove: () => void;
}

export const SubjectRow = ({ subject, gradingSystem, onUpdate, onRemove }: SubjectRowProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 bg-gradient-card rounded-lg border border-card-border transition-smooth hover:shadow-card">
      {/* Subject Name */}
      <div className="md:col-span-4">
        <Input
          placeholder="Subject name"
          value={subject.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="border-primary/20 focus:border-primary transition-smooth"
        />
      </div>

      {/* Credits */}
      <div className="md:col-span-2">
        <Input
          type="number"
          placeholder="Credits"
          value={subject.credits}
          onChange={(e) => onUpdate({ credits: Number(e.target.value) || 0 })}
          min="0"
          max="10"
          className="border-primary/20 focus:border-primary transition-smooth"
        />
      </div>

      {/* Grade */}
      <div className="md:col-span-3">
        <Select value={subject.grade} onValueChange={(grade) => onUpdate({ grade })}>
          <SelectTrigger className="border-primary/20 focus:border-primary transition-smooth">
            <SelectValue placeholder="Select grade" />
          </SelectTrigger>
          <SelectContent className="bg-card border-card-border">
            {Object.keys(gradingSystem.grades).map((grade) => (
              <SelectItem key={grade} value={grade} className="hover:bg-secondary transition-smooth">
                {grade} ({gradingSystem.grades[grade]})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Grade Points */}
      <div className="md:col-span-2">
        <div className="flex items-center justify-center h-10 px-3 bg-muted rounded-md text-sm font-medium text-muted-strong">
          {subject.gradePoints.toFixed(1)}
        </div>
      </div>

      {/* Remove Button */}
      <div className="md:col-span-1">
        <Button
          variant="outline"
          size="icon"
          onClick={onRemove}
          className="w-full md:w-10 h-10 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};