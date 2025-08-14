import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ResultCardProps {
  title: string;
  value: number;
  scale: number;
  icon?: React.ReactNode;
  gradient?: boolean;
}

export const ResultCard = ({ title, value, scale, icon, gradient = false }: ResultCardProps) => {
  const percentage = (value / scale) * 100;
  
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 dark:text-green-400';
    if (percentage >= 80) return 'text-blue-600 dark:text-blue-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    if (percentage >= 60) return 'text-orange-600 dark:text-orange-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getGradeLetter = (percentage: number) => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    return 'D';
  };

  return (
    <Card className={`transition-smooth hover-lift ${gradient ? 'bg-gradient-card shadow-card' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-strong">{title}</CardTitle>
        {icon && <div className="text-muted-strong">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline space-x-2">
          <div className={`text-3xl font-bold ${getGradeColor(percentage)}`}>
            {value.toFixed(2)}
          </div>
          <div className="text-muted-foreground">/ {scale}</div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className={`text-sm font-medium ${getGradeColor(percentage)}`}>
            Grade: {getGradeLetter(percentage)}
          </div>
          <div className="text-sm text-muted-foreground">
            {percentage.toFixed(1)}%
          </div>
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              percentage >= 90 ? 'bg-gradient-success' :
              percentage >= 80 ? 'bg-gradient-primary' :
              percentage >= 70 ? 'bg-gradient-warning' :
              'bg-destructive'
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
};