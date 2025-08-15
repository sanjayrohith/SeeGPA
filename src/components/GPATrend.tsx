import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Semester } from '@/types/calculator';

interface GPATrendProps {
  semesters: Semester[];
  scale: number;
}

export const GPATrend = ({ semesters, scale }: GPATrendProps) => {
  if (semesters.length < 2) {
    return null;
  }

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (current < previous) return <TrendingDown className="h-4 w-4 text-red-600" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getTrendColor = (current: number, previous: number) => {
    if (current > previous) return 'text-green-600';
    if (current < previous) return 'text-red-600';
    return 'text-gray-500';
  };

  const getPercentage = (value: number) => ((value / scale) * 100).toFixed(1);

  return (
    <Card className="bg-gradient-card shadow-card border-card-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-primary flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          SGPA Trend Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Visual Bar Chart */}
          <div className="space-y-2">
            {semesters.map((semester, index) => (
              <div key={semester.id} className="flex items-center gap-3">
                <div className="w-16 text-xs font-medium text-muted-foreground">
                  {semester.name.replace('Semester ', 'S')}
                </div>
                <div className="flex-1 relative">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-6 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                      style={{ width: `${getPercentage(semester.sgpa)}%` }}
                    >
                      <span className="text-xs font-medium text-white">
                        {semester.sgpa.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-8 flex justify-center">
                  {index > 0 && getTrendIcon(semester.sgpa, semesters[index - 1].sgpa)}
                </div>
              </div>
            ))}
          </div>

          {/* Summary Statistics */}
          <div className="pt-4 border-t border-card-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-muted-foreground">Highest</div>
                <div className="font-bold text-green-600">
                  {Math.max(...semesters.map(s => s.sgpa)).toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-muted-foreground">Lowest</div>
                <div className="font-bold text-orange-600">
                  {Math.min(...semesters.map(s => s.sgpa)).toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-muted-foreground">Latest</div>
                <div className={`font-bold ${
                  semesters.length > 1 
                    ? getTrendColor(semesters[semesters.length - 1].sgpa, semesters[semesters.length - 2].sgpa)
                    : 'text-primary'
                }`}>
                  {semesters[semesters.length - 1].sgpa.toFixed(2)}
                </div>
              </div>
              <div className="text-center">
                <div className="font-medium text-muted-foreground">Avg.</div>
                <div className="font-bold text-blue-600">
                  {(semesters.reduce((sum, s) => sum + s.sgpa, 0) / semesters.length).toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Insights */}
          {semesters.length >= 3 && (
            <div className="pt-4 border-t border-card-border">
              <div className="text-sm text-muted-foreground">
                <div className="font-medium mb-2">📈 Quick Insights:</div>
                <ul className="space-y-1 text-xs">
                  {(() => {
                    const latestThree = semesters.slice(-3);
                    const isImproving = latestThree.every((sem, idx) => 
                      idx === 0 || sem.sgpa >= latestThree[idx - 1].sgpa
                    );
                    const isDecreasing = latestThree.every((sem, idx) => 
                      idx === 0 || sem.sgpa <= latestThree[idx - 1].sgpa
                    );
                    
                    return [
                      isImproving && !isDecreasing && "• Consistent improvement in last 3 semesters! 🎉",
                      isDecreasing && !isImproving && "• Consider reviewing study strategies for better performance",
                      !isImproving && !isDecreasing && "• Performance has been stable across recent semesters"
                    ].filter(Boolean);
                  })()}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
