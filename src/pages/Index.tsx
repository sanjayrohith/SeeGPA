import { ThemeProvider } from '@/contexts/ThemeContext';
import { CGPACalculator } from '@/components/CGPACalculator';

const Index = () => {
  return (
    <ThemeProvider>
      <CGPACalculator />
    </ThemeProvider>
  );
};

export default Index;
