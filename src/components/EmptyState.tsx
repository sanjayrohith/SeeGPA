import { Plus, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/calculator-hero.jpg';

interface EmptyStateProps {
  onAddSemester: () => void;
}

export const EmptyState = ({ onAddSemester }: EmptyStateProps) => {
  return (
    <Card className="relative overflow-hidden bg-gradient-card shadow-lg-custom border-primary/20">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <CardContent className="relative z-10 text-center py-16 px-8">
        <div className="space-y-6 max-w-md mx-auto">
          {/* Animated Icon */}
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-lg-custom animate-glow">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-warning rounded-full flex items-center justify-center animate-bounce">
              <Plus className="h-4 w-4 text-white" />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold gradient-text">
              Ready to Track Your Academic Journey?
            </h2>
            <p className="text-muted-strong text-lg leading-relaxed">
              Start by adding your first semester to calculate your CGPA and track your academic progress with our beautiful, intuitive calculator.
            </p>
          </div>
          
          {/* CTA Button */}
          <Button 
            onClick={onAddSemester}
            size="lg"
            className="bg-gradient-primary hover:bg-gradient-secondary text-white shadow-primary transition-smooth hover-lift px-8 py-3 text-lg"
            aria-label="Add your first semester to start tracking your academic progress"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Semester
          </Button>
          
          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 text-sm text-muted-strong">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
              <span>Multiple grading systems</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
              <span>Auto-save functionality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
              <span>Real-time calculations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gradient-primary rounded-full"></div>
              <span>Export your data</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};