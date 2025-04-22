import { useState, useEffect, useRef } from 'react';

// Hook personalizado para detectar cuando un elemento entra en el viewport
const useInView = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Cuando el elemento entra en el viewport, actualizar el estado
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
        // Si solo queremos observar una vez, dejar de observar después de que sea visible
        if (options.once !== false) {
          observer.unobserve(entry.target);
        }
      } else if (!entry.isIntersecting && options.once === false) {
        setIsVisible(false);
      }
    }, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.1,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.root, options.rootMargin, options.threshold, options.once, isVisible]);

  return [ref, isVisible];
};

export default useInView;