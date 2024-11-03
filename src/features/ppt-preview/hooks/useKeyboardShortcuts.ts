import { useEffect } from 'react';

export function useKeyboardShortcuts(deck: any) {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch(event.key) {
        case 'f':
          if (event.ctrlKey || event.metaKey) {
            deck?.toggleOverview();
          }
          break;
        case 'n':
          if (event.ctrlKey || event.metaKey) {
            deck?.toggleSpeakerNotes();
          }
          break;
        case 'b':
          if (event.ctrlKey || event.metaKey) {
            deck?.togglePause();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [deck]);
} 