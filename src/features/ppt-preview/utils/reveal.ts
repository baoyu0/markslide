interface TouchEventHandlers {
  handleTouchStart: (e: TouchEvent) => void
  handleTouchMove: (e: TouchEvent) => void
  handleTouchEnd: (e: TouchEvent) => void
}

export function initializeRevealEvents(deck: any, handlers: TouchEventHandlers) {
  const options = {
    passive: true
  };

  document.querySelectorAll('.controls').forEach(control => {
    control.addEventListener('touchstart', handlers.handleTouchStart as EventListener, options);
    control.addEventListener('touchmove', handlers.handleTouchMove as EventListener, options);
    control.addEventListener('touchend', handlers.handleTouchEnd as EventListener, options);
  });

  document.querySelectorAll('.slides').forEach(slide => {
    slide.addEventListener('touchstart', handlers.handleTouchStart as EventListener, options);
    slide.addEventListener('touchmove', handlers.handleTouchMove as EventListener, options);
    slide.addEventListener('touchend', handlers.handleTouchEnd as EventListener, options);
  });

  return () => {
    document.querySelectorAll('.controls, .slides').forEach(element => {
      element.removeEventListener('touchstart', handlers.handleTouchStart as EventListener);
      element.removeEventListener('touchmove', handlers.handleTouchMove as EventListener);
      element.removeEventListener('touchend', handlers.handleTouchEnd as EventListener);
    });
  };
} 