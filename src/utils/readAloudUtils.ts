
/**
 * Utility functions for handling read aloud functionality
 */

/**
 * Speaks the provided text if speech synthesis is available
 * @param text The text to be spoken
 * @param cancelPrevious Whether to cancel any ongoing speech before speaking
 * @returns void
 */
export const speakText = (text: string, cancelPrevious = true): void => {
  if (!window.speechSynthesis) {
    console.warn('Speech synthesis not supported in this browser');
    return;
  }
  
  if (cancelPrevious) {
    window.speechSynthesis.cancel();
  }
  
  const utterance = new SpeechSynthesisUtterance(text);
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
