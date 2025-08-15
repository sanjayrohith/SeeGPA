import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Subject, GradingSystem } from '@/types/calculator';

interface SubjectRowProps {
  subject: Subject;
  gradingSystem: GradingSystem;
  onUpdate: (updates: Partial<Subject>) => void;
  onRemove: () => void;
}

export const SubjectRow = ({ subject, gradingSystem, onUpdate, onRemove }: SubjectRowProps) => {
  return (
    <>
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gradient-card rounded-lg border border-card-border transition-smooth hover:shadow-card">
        {/* Subject Name */}
        <div className="col-span-4">
          <Input
            placeholder="Subject name"
            value={subject.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="border-primary/20 focus:border-primary transition-smooth"
            aria-label="Subject name"
          />
        </div>

        {/* Credits */}
        <div className="col-span-2">
          <Input
            type="number"
            placeholder="Credits"
            value={subject.credits}
            onChange={(e) => onUpdate({ credits: Number(e.target.value) || 0 })}
            min="0"
            max="10"
            className="border-primary/20 focus:border-primary transition-smooth"
            aria-label="Subject credits"
          />
        </div>

        {/* Grade */}
        <div className="col-span-3">
          <Select value={subject.grade} onValueChange={(grade) => onUpdate({ grade })}>
            <SelectTrigger className="border-primary/20 focus:border-primary transition-smooth">
              <SelectValue placeholder="Select grade" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(gradingSystem.grades).map((grade) => (
                <SelectItem key={grade} value={grade}>
                  {grade} ({gradingSystem.grades[grade]} points)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Grade Points */}
        <div className="col-span-2">
          <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background/50">
            <span className="text-sm font-medium">
              {subject.gradePoints.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Remove Button */}
        <div className="col-span-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onRemove}
                className="border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
                aria-label={`Remove ${subject.name || 'subject'}`}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove this subject</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Mobile Layout - Stacked Card */}
      <div className="md:hidden bg-gradient-card rounded-lg border border-card-border p-4 space-y-4 transition-smooth hover:shadow-card">
        <div className="flex justify-between items-start">
          <div className="flex-1 space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subject Name</label>
              <Input
                placeholder="Subject name"
                value={subject.name}
                onChange={(e) => onUpdate({ name: e.target.value })}
                className="border-primary/20 focus:border-primary transition-smooth mt-1"
                aria-label="Subject name"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Credits</label>
                <Input
                  type="number"
                  placeholder="Credits"
                  value={subject.credits}
                  onChange={(e) => onUpdate({ credits: Number(e.target.value) || 0 })}
                  min="0"
                  max="10"
                  className="border-primary/20 focus:border-primary transition-smooth mt-1"
                  aria-label="Subject credits"
                />
              </div>
              
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Grade Points</label>
                <div className="flex items-center h-10 px-3 rounded-md border border-input bg-background/50 mt-1">
                  <span className="text-sm font-medium">
                    {subject.gradePoints.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Grade</label>
              <Select value={subject.grade} onValueChange={(grade) => onUpdate({ grade })}>
                <SelectTrigger className="border-primary/20 focus:border-primary transition-smooth mt-1">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(gradingSystem.grades).map((grade) => (
                    <SelectItem key={grade} value={grade}>
                      {grade} ({gradingSystem.grades[grade]} points)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="ml-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={onRemove}
                  className="border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
                  aria-label={`Remove ${subject.name || 'subject'}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove this subject</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};