
import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import Header from '../components/Header';
import ThemeToggle from '../components/ThemeToggle';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  getReadAloudPreference, 
  setReadAloudPreference,
  getSpeechRatePreference,
  setSpeechRatePreference,
  getSpeechPitchPreference,
  setSpeechPitchPreference,
  getAvailableVoices,
  getPreferredVoiceURI,
  setPreferredVoiceURI,
  speakText
} from '../utils/readAloudUtils';

const Settings: React.FC = () => {
  const [readAloud, setReadAloud] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>("");
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  useEffect(() => {
    // Check read aloud preference
    setReadAloud(getReadAloudPreference());
    setSpeechRate(getSpeechRatePreference());
    setSpeechPitch(getSpeechPitchPreference());
    
    // Initialize voices and preferred voice
    const loadVoices = () => {
      const availableVoices = getAvailableVoices();
      if (availableVoices.length > 0) {
        setVoices(availableVoices);
        setVoicesLoaded(true);
        
        // Set selected voice from preferences or default to first voice
        const preferredVoice = getPreferredVoiceURI();
        if (preferredVoice && availableVoices.some(voice => voice.voiceURI === preferredVoice)) {
          setSelectedVoice(preferredVoice);
        } else if (availableVoices.length > 0) {
          // Default to first voice
          setSelectedVoice(availableVoices[0].voiceURI);
        }
      }
    };
    
    // Load voices immediately
    loadVoices();
    
    // Some browsers load voices asynchronously, so we need to wait for them
    if (window.speechSynthesis) {
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }, []);

  const handleReadAloudToggle = () => {
    const newValue = !readAloud;
    setReadAloudPreference(newValue);
    setReadAloud(newValue);
    
    if (newValue) {
      toast.success('Read aloud enabled', {
        description: 'Product details will be read aloud',
        icon: <Volume2 className="text-premium-500" />
      });
    } else {
      toast.info('Read aloud disabled', {
        icon: <VolumeX className="text-muted-foreground" />
      });
    }
  };

  const handleRateChange = (value: number[]) => {
    const newRate = value[0];
    setSpeechRate(newRate);
    setSpeechRatePreference(newRate);
  };

  const handlePitchChange = (value: number[]) => {
    const newPitch = value[0];
    setSpeechPitch(newPitch);
    setSpeechPitchPreference(newPitch);
  };

  const handleVoiceChange = (voiceURI: string) => {
    setSelectedVoice(voiceURI);
    setPreferredVoiceURI(voiceURI);
  };

  const handleTestVoice = () => {
    if (readAloud) {
      const options = {
        rate: speechRate,
        pitch: speechPitch,
        voiceURI: selectedVoice
      };
      speakText("This is a test of the read aloud feature with your selected settings.", true, options);
    } else {
      toast.info('Read aloud is disabled', {
        description: 'Enable read aloud to test the voice',
        icon: <VolumeX className="text-muted-foreground" />
      });
    }
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
          <div className="pt-2 mb-4">
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
          
          {/* Read Aloud Settings (only show when enabled) */}
          {readAloud && (
            <div className="mt-4 ml-7 space-y-6 bg-light-200 dark:bg-dark-100 p-4 rounded-lg">
              {/* Speech Rate */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium dark:text-light-300 text-dark-400">Speech Rate</label>
                  <span className="text-xs dark:text-light-500 text-dark-500">{speechRate.toFixed(1)}x</span>
                </div>
                <Slider
                  defaultValue={[speechRate]}
                  min={0.5}
                  max={2}
                  step={0.1}
                  onValueChange={handleRateChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs dark:text-light-500 text-dark-500">
                  <span>Slow</span>
                  <span>Fast</span>
                </div>
              </div>
              
              {/* Speech Pitch */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium dark:text-light-300 text-dark-400">Speech Pitch</label>
                  <span className="text-xs dark:text-light-500 text-dark-500">{speechPitch.toFixed(1)}</span>
                </div>
                <Slider
                  defaultValue={[speechPitch]}
                  min={0.5}
                  max={1.5}
                  step={0.1}
                  onValueChange={handlePitchChange}
                  className="w-full"
                />
                <div className="flex justify-between text-xs dark:text-light-500 text-dark-500">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              
              {/* Voice Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium dark:text-light-300 text-dark-400">Voice</label>
                {voicesLoaded ? (
                  <Select value={selectedVoice} onValueChange={handleVoiceChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map((voice) => (
                        <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                          {voice.name} - {voice.lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="text-xs dark:text-light-500 text-dark-500">Loading available voices...</p>
                )}
              </div>
              
              {/* Test Voice Button */}
              <button
                onClick={handleTestVoice}
                className="w-full py-2 px-4 bg-premium-500 text-white rounded-lg hover:bg-premium-600 transition flex items-center justify-center gap-2"
              >
                <Volume2 size={16} />
                Test Voice
              </button>
            </div>
          )}
        </div>

        {/* You can add more settings sections here */}
        
      </div>
    </div>
  );
};

export default Settings;
