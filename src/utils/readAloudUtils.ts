
/**
 * Utility functions for handling read aloud functionality
 */

/**
 * Speaks the provided text if speech synthesis is available
 * @param text The text to be spoken
 * @param cancelPrevious Whether to cancel any ongoing speech before speaking
 * @param options Optional configuration for speech (rate, pitch, voice)
 * @returns void
 */
export const speakText = (
  text: string, 
  cancelPrevious = true,
  options?: {
    rate?: number;
    pitch?: number;
    voiceURI?: string;
  }
): void => {
  if (!window.speechSynthesis) {
    console.warn('Speech synthesis not supported in this browser');
    return;
  }
  
  if (cancelPrevious) {
    window.speechSynthesis.cancel();
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Apply custom options if provided
  if (options) {
    if (options.rate !== undefined) utterance.rate = options.rate;
    if (options.pitch !== undefined) utterance.pitch = options.pitch;
    
    // Set specific voice if requested
    if (options.voiceURI && window.speechSynthesis.getVoices().length > 0) {
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.voiceURI === options.voiceURI);
      if (voice) utterance.voice = voice;
    }
  }
  
  window.speechSynthesis.speak(utterance);
};

/**
 * Cancels any ongoing speech synthesis
 */
export const cancelSpeech = (): void => {
  if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

/**
 * Pauses ongoing speech
 */
export const pauseSpeech = (): void => {
  if (window.speechSynthesis) {
    window.speechSynthesis.pause();
  }
};

/**
 * Resumes paused speech
 */
export const resumeSpeech = (): void => {
  if (window.speechSynthesis) {
    window.speechSynthesis.resume();
  }
};

/**
 * Gets available voices from the browser
 */
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  return window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
};

/**
 * Gets the read aloud preference from localStorage
 * @returns boolean indicating if read aloud is enabled
 */
export const getReadAloudPreference = (): boolean => {
  const savedReadAloud = localStorage.getItem('readAloud');
  return savedReadAloud === 'true';
};

/**
 * Sets the read aloud preference in localStorage
 * @param enabled Boolean indicating if read aloud should be enabled
 */
export const setReadAloudPreference = (enabled: boolean): void => {
  localStorage.setItem('readAloud', enabled.toString());
};

/**
 * Gets the speech rate preference from localStorage
 * @returns number representing speech rate (0.1-2.0, default 1.0)
 */
export const getSpeechRatePreference = (): number => {
  const savedRate = localStorage.getItem('speechRate');
  return savedRate ? parseFloat(savedRate) : 1.0;
};

/**
 * Sets the speech rate preference in localStorage
 * @param rate Number between 0.1 and 2.0
 */
export const setSpeechRatePreference = (rate: number): void => {
  localStorage.setItem('speechRate', rate.toString());
};

/**
 * Gets the speech pitch preference from localStorage
 * @returns number representing speech pitch (0.1-2.0, default 1.0)
 */
export const getSpeechPitchPreference = (): number => {
  const savedPitch = localStorage.getItem('speechPitch');
  return savedPitch ? parseFloat(savedPitch) : 1.0;
};

/**
 * Sets the speech pitch preference in localStorage
 * @param pitch Number between 0.1 and 2.0
 */
export const setSpeechPitchPreference = (pitch: number): void => {
  localStorage.setItem('speechPitch', pitch.toString());
};

/**
 * Gets the preferred voice URI from localStorage
 * @returns string representing the preferred voice URI or null if not set
 */
export const getPreferredVoiceURI = (): string | null => {
  return localStorage.getItem('preferredVoiceURI');
};

/**
 * Sets the preferred voice URI in localStorage
 * @param voiceURI String representing the voice URI
 */
export const setPreferredVoiceURI = (voiceURI: string): void => {
  localStorage.setItem('preferredVoiceURI', voiceURI);
};
