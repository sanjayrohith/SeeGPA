import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, BookOpen, Award, HelpCircle } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl mx-auto max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-purple-600" />
            Help & About
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* CGPA Calculation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-blue-600" />
                How CGPA is Calculated
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <strong>CGPA (Cumulative Grade Point Average)</strong> is calculated across all semesters:
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <code className="text-sm">
                  CGPA = (Sum of all Grade Points × Credits) ÷ (Total Credits)
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                <strong>SGPA (Semester Grade Point Average)</strong> is calculated for individual semesters using the same formula.
              </p>
            </CardContent>
          </Card>

          {/* Grading Systems */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5 text-green-600" />
                Grading Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">10-Point Scale</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline">O = 10</Badge>
                  <Badge variant="outline">A+ = 9</Badge>
                  <Badge variant="outline">A = 8</Badge>
                  <Badge variant="outline">B+ = 7</Badge>
                  <Badge variant="outline">B = 6</Badge>
                  <Badge variant="outline">C+ = 5</Badge>
                  <Badge variant="outline">C = 4</Badge>
                  <Badge variant="outline">F = 0</Badge>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">4-Point Scale (GPA)</h4>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Badge variant="outline">A = 4.0</Badge>
                  <Badge variant="outline">A- = 3.7</Badge>
                  <Badge variant="outline">B+ = 3.3</Badge>
                  <Badge variant="outline">B = 3.0</Badge>
                  <Badge variant="outline">B- = 2.7</Badge>
                  <Badge variant="outline">C+ = 2.3</Badge>
                  <Badge variant="outline">C = 2.0</Badge>
                  <Badge variant="outline">C- = 1.7</Badge>
                  <Badge variant="outline">D+ = 1.3</Badge>
                  <Badge variant="outline">D = 1.0</Badge>
                  <Badge variant="outline">F = 0.0</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Key Features & Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Features</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• <strong>Multiple Grading Systems:</strong> Switch between 10-point and 4-point scales</li>
                    <li>• <strong>Automatic Calculations:</strong> SGPA and CGPA are calculated in real-time</li>
                    <li>• <strong>Data Persistence:</strong> Your data is automatically saved locally</li>
                    <li>• <strong>Export Data:</strong> Download your academic data as JSON</li>
                    <li>• <strong>User Profiles:</strong> Personalize your experience with user information</li>
                    <li>• <strong>Responsive Design:</strong> Works seamlessly on desktop and mobile</li>
                    <li>• <strong>GPA Trend Analysis:</strong> Visual charts showing academic progress</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Keyboard Shortcuts</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Add Semester</span>
                      <Badge variant="outline">Ctrl+N</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Export Data</span>
                      <Badge variant="outline">Ctrl+E</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Help</span>
                      <Badge variant="outline">Ctrl+H or ?</Badge>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <span>Navigate</span>
                      <Badge variant="outline">Tab/Shift+Tab</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Assumptions */}
          <div className="text-center space-y-2">
            <h4 className="font-medium text-sm">Assumptions & Notes</h4>
            <p className="text-xs text-muted-foreground">
              • Credit values can range from 0-10 per subject<br/>
              • Grade points are automatically calculated based on selected grading system<br/>
              • Data is stored locally in your browser and not transmitted to any server<br/>
              • For accurate CGPA calculation, ensure all subjects and credits are entered correctly
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
