
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import Header from '../components/Header';
import ThemeToggle, { toggleReadAloud } from '../components/ThemeToggle';

const Settings: React.FC = () => {
  const [readAloud, setReadAloud] = useState(false);

  useEffect(() => {
    // Check read aloud preference
    const savedReadAloud = localStorage.getItem('readAloud');
    if (savedReadAloud) {
      setReadAloud(savedReadAloud === 'true');
    }
  }, []);

  const handleReadAloudToggle = () => {
    const newValue = toggleReadAloud(readAloud);
    setReadAloud(newValue);
  };

  return (
    <div className="app-container bg-white dark:bg-dark-300">
      <Header title="Settings" showBack={true} />
      
      <div className="flex-1 overflow-auto p-4">
        {/* Theme Settings */}
        <div className="mb-6 pb-6 border-b dark:border-dark-100 border-light-400">
          <h2 className="text-lg font-semibold mb-4 dark:text-light-300 text-dark-400">Theme</h2>
          <ThemeToggle inSettings={true} />
        </div>

        {/* Features Section */}
        <div className="mb-6 pb-6 border-b dark:border-dark-100 border-light-400">
          <h2 className="text-lg font-semibold mb-4 dark:text-light-300 text-dark-400">Features</h2>
          
          {/* Read Aloud toggle */}
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {readAloud ? (
                  <Volume2 size={18} className="text-premium-500" />
                ) : (
                  <VolumeX size={18} className="dark:text-light-400 text-dark-500" />
                )}
                <span className="dark:text-light-300 text-dark-400">Read Aloud</span>
              </div>
              <Switch 
                checked={readAloud} 
                onCheckedChange={handleReadAloudToggle}
                className={readAloud ? "bg-premium-500" : ""} 
              />
            </div>
            <p className="text-sm mt-1 dark:text-light-500 text-dark-500 ml-7">
              Enable text-to-speech for product details
            </p>
          </div>
        </div>

        {/* You can add more settings sections here */}
        
      </div>
    </div>
  );
};

export default Settings;
