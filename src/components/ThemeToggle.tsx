
import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { Switch } from './ui/switch';
import { toast } from 'sonner';
import { cancelSpeech } from '@/utils/readAloudUtils';

interface ThemeToggleProps {
  inSettings?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ inSettings = false }) => {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('dark');

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
      </div>
    );
  }

  // Don't render anything if not in settings (since we're removing the standalone button)
  return null;
};

export default ThemeToggle;
