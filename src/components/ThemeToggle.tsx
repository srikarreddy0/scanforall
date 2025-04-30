
import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor, Volume2, VolumeX } from 'lucide-react';
import { Switch } from './ui/switch';
import { toast } from 'sonner';

interface ThemeToggleProps {
  inSettings?: boolean;
}

export const toggleReadAloud = (currentValue: boolean) => {
  const newValue = !currentValue;
  localStorage.setItem('readAloud', newValue.toString());
  
  if (newValue) {
    toast.success('Read aloud enabled', {
      description: 'Product details will be read aloud',
      icon: <Volume2 className="text-premium-500" />
    });
  } else {
    toast.info('Read aloud disabled', {
      icon: <VolumeX className="text-muted-foreground" />
    });
    // Stop any ongoing speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }
  
  return newValue;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ inSettings = false }) => {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');
  const [readAloud, setReadAloud] = useState(false);

  useEffect(() => {
    // Check if user has already set a preference
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Initialize theme based on stored preference or system preference
    if (storedTheme === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    } else if (storedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      // System preference
      setTheme('system');
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    }

    // Check read aloud preference
    const savedReadAloud = localStorage.getItem('readAloud');
    if (savedReadAloud) {
      setReadAloud(savedReadAloud === 'true');
    }
  }, []);

  const setThemeMode = (newTheme: 'dark' | 'light' | 'system') => {
    setTheme(newTheme);
    
    if (newTheme === 'light') {
      // Switch to light mode
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else if (newTheme === 'dark') {
      // Switch to dark mode
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      // System preference
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
    }
  };

  const handleReadAloudToggle = () => {
    const newValue = toggleReadAloud(readAloud);
    setReadAloud(newValue);
  };

  if (inSettings) {
    // Render radio button style options for settings panel
    return (
      <div className="space-y-4">
        <div className="flex flex-col space-y-2">
          <button 
            onClick={() => setThemeMode('light')}
            className={`flex items-center gap-2 py-2 px-3 rounded-lg ${theme === 'light' ? 'bg-premium-500 text-white' : 'dark:text-light-400 text-dark-500 dark:hover:bg-dark-100 hover:bg-light-400'}`}
          >
            <Sun size={16} />
            <span>Light Mode</span>
          </button>
          
          <button 
            onClick={() => setThemeMode('dark')}
            className={`flex items-center gap-2 py-2 px-3 rounded-lg ${theme === 'dark' ? 'bg-premium-500 text-white' : 'dark:text-light-400 text-dark-500 dark:hover:bg-dark-100 hover:bg-light-400'}`}
          >
            <Moon size={16} />
            <span>Dark Mode</span>
          </button>
          
          <button 
            onClick={() => setThemeMode('system')}
            className={`flex items-center gap-2 py-2 px-3 rounded-lg ${theme === 'system' ? 'bg-premium-500 text-white' : 'dark:text-light-400 text-dark-500 dark:hover:bg-dark-100 hover:bg-light-400'}`}
          >
            <Monitor size={16} />
            <span>System Default</span>
          </button>
        </div>

        {/* Read Aloud toggle moved to Settings page */}
      </div>
    );
  }

  // Don't render anything if not in settings (since we're removing the standalone button)
  return null;
};

export default ThemeToggle;
