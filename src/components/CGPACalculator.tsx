import { useState, useEffect } from 'react';
import { Plus, Calculator, BookOpen, TrendingUp, Download, LogIn, Trash2, HelpCircle, Info } from 'lucide-react';
import LogoSrc from '@/assets/logo.png';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';
import { SemesterCard } from './SemesterCard';
import { ResultCard } from './ResultCard';
import { ThemeToggle } from './ThemeToggle';
import { EmptyState } from './EmptyState';
import { LoginModal } from './LoginModal';
import { UserProfile } from './UserProfile';
import { CreditsModal } from './CreditsModal';
import { ConfirmationDialog } from './ConfirmationDialog';
import { HelpModal } from './HelpModal';
import { GPATrend } from './GPATrend';
import { useCalculator } from '@/hooks/useCalculator';
import { useUser } from '@/hooks/useUser';
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

  const {
    user,
    isLoginModalOpen,
    setIsLoginModalOpen,
    login,
    logout,
    updateUser,
  } = useUser();

  const { toast } = useToast();
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const [clearDataDialog, setClearDataDialog] = useState(false);
  const [deleteSemesterDialog, setDeleteSemesterDialog] = useState<string | null>(null);

  // Show login modal on first visit if no user
  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        setIsLoginModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [user, setIsLoginModalOpen]);

  const handleExportData = () => {
    try {
      const exportData = {
        ...data,
        user: user ? { name: user.name, email: user.email } : null,
        gradingSystem: gradingSystem.name,
        exportedAt: new Date().toISOString(),
      };
      
      const dataStr = JSON.stringify(exportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `cgpa-data-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Data Exported Successfully",
        description: "Your CGPA data has been downloaded as a JSON file.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Unable to export data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleClearData = () => {
    clearData();
    setClearDataDialog(false);
    toast({
      title: "Data Cleared",
      description: "All semester data has been removed.",
    });
  };

  const handleDeleteSemester = (semesterId: string) => {
    removeSemester(semesterId);
    setDeleteSemesterDialog(null);
    toast({
      title: "Semester Deleted",
      description: "The semester has been removed from your data.",
    });
  };

  // Keyboard shortcuts for better accessibility
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle shortcuts when no modal is open and not typing in inputs
      if (isLoginModalOpen || isCreditsModalOpen || isHelpModalOpen || clearDataDialog || deleteSemesterDialog) {
        return;
      }
      
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.contentEditable === 'true') {
        return;
      }

      // Keyboard shortcuts
      if (event.key === 'n' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        addSemester();
        toast({
          title: "Semester Added",
          description: "A new semester has been added. Use Tab to navigate to it.",
        });
      } else if (event.key === 'h' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        setIsHelpModalOpen(true);
      } else if (event.key === 'e' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        handleExportData();
      } else if (event.key === '?' && !event.ctrlKey && !event.metaKey) {
        event.preventDefault();
        setIsHelpModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLoginModalOpen, isCreditsModalOpen, isHelpModalOpen, clearDataDialog, deleteSemesterDialog, addSemester, handleExportData, toast]);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shadow-primary bg-white/5">
                  <img src={LogoSrc} alt="CGPA Calculator logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold gradient-text">CGPA Calculator</h1>
                  <p className="text-sm text-muted-foreground">Track your academic progress</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 md:space-x-3">
                {/* Help Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsHelpModalOpen(true)}
                      className="border-primary/20 hover:bg-primary/10"
                      aria-label="Help and About"
                    >
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Help & About</p>
                  </TooltipContent>
                </Tooltip>

                {/* Credits Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsCreditsModalOpen(true)}
                      className="border-primary/20 hover:bg-primary/10"
                      aria-label="Developer Credits"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Developer Credits</p>
                  </TooltipContent>
                </Tooltip>

                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Login Button or User Info */}
              {!user ? (
                <Button
                  onClick={() => setIsLoginModalOpen(true)}
                  variant="outline"
                  size="sm"
                  className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              ) : null}

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
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* User Profile Section */}
        {user && (
          <section className="animate-fade-in">
            <UserProfile user={user} onLogout={logout} onUpdateUser={updateUser} />
          </section>
        )}

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

        {/* GPA Trend Section */}
        {data.semesters.length >= 2 && (
          <section>
            <GPATrend semesters={data.semesters} scale={gradingSystem.scale} />
          </section>
        )}

        {/* Action Buttons */}
        <section className="flex flex-wrap gap-4 justify-center md:justify-start">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                onClick={addSemester}
                className="bg-gradient-primary hover:bg-gradient-secondary text-white shadow-primary transition-smooth hover-lift"
                aria-label="Add a new semester"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Semester
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add a new semester to track more subjects</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={handleExportData}
                className="border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
                aria-label="Export academic data"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download your academic data as JSON</p>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                onClick={() => setClearDataDialog(true)}
                className="border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-smooth"
                aria-label="Clear all academic data"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Remove all semester data (cannot be undone)</p>
            </TooltipContent>
          </Tooltip>
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
                  onRemoveSemester={() => setDeleteSemesterDialog(semester.id)}
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
          {user && (
            <p className="text-xs mt-2 opacity-75">
              Personalized for {user.name} • {user.college && `${user.college} • `}
              Member since {user.createdAt.toLocaleDateString()}
            </p>
          )}
        </div>
      </footer>

      {/* Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={login}
      />

      <CreditsModal
        isOpen={isCreditsModalOpen}
        onClose={() => setIsCreditsModalOpen(false)}
      />

      <HelpModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

      <ConfirmationDialog
        isOpen={clearDataDialog}
        onClose={() => setClearDataDialog(false)}
        onConfirm={handleClearData}
        title="Clear All Data"
        description="Are you sure you want to delete all your semester data? This action cannot be undone."
        confirmText="Clear Data"
        variant="destructive"
      />

      <ConfirmationDialog
        isOpen={!!deleteSemesterDialog}
        onClose={() => setDeleteSemesterDialog(null)}
        onConfirm={() => deleteSemesterDialog && handleDeleteSemester(deleteSemesterDialog)}
        title="Delete Semester"
        description="Are you sure you want to delete this semester and all its subjects? This action cannot be undone."
        confirmText="Delete Semester"
        variant="destructive"
      />
    </div>
    </TooltipProvider>
  );
};