// src/hooks/useIntersectionObserver.js - Alternative version
import { useEffect, useRef, useState } from 'react';

export function useIntersectionObserver(options = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      // Only update state when it changes to intersecting
      if (entry.isIntersecting && !isIntersecting) {
        setIsIntersecting(true);
      } else if (!entry.isIntersecting && isIntersecting) {
        setIsIntersecting(false);
      }
    }, {
      root: null,
      rootMargin: '50px', // Load more when 50px away from viewport
      threshold: 0,
      ...options
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options, isIntersecting]);

  return [targetRef, isIntersecting];
}