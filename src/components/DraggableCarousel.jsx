import React, { useRef, useEffect, useState } from "react";

const DraggableCarousel = ({ children, autoScroll = true, scrollSpeed = 1, delay = 20 }) => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState(1);
  const startRef = useRef(0);
  const scrollStartRef = useRef(0);
  const animationFrameRef = useRef(null);

  // Auto-scroll en modo "ping-pong": avanza hasta el final y luego invierte la dirección.
  useEffect(() => {
    if (!autoScroll || isDragging) return;
    const interval = setInterval(() => {
      const carousel = carouselRef.current;
      if (carousel) {
        const newScrollLeft = carousel.scrollLeft + scrollSpeed * direction;
        if (newScrollLeft <= 0) {
          setDirection(1);
          carousel.scrollLeft = 0;
          return;
        }
        if (newScrollLeft >= carousel.scrollWidth - carousel.clientWidth) {
          setDirection(-1);
          carousel.scrollLeft = carousel.scrollWidth - carousel.clientWidth;
          return;
        }
        carousel.scrollLeft = newScrollLeft;
      }
    }, delay);
    return () => clearInterval(interval);
  }, [autoScroll, isDragging, scrollSpeed, direction, delay]);

  // Inicia el arrastre.
  const startDrag = (pageX) => {
    setIsDragging(true);
    startRef.current = pageX - carouselRef.current.offsetLeft;
    scrollStartRef.current = carouselRef.current.scrollLeft;
  };

  // Calcula el "walk" en base al movimiento y actualiza el scroll.
  const drag = (pageX) => {
    if (!isDragging) return;
    const x = pageX - carouselRef.current.offsetLeft;
    const walk = x - startRef.current;
    carouselRef.current.scrollLeft = scrollStartRef.current - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
  };

  // Eventos con requestAnimationFrame para suavizar el desplazamiento.
  const handleMouseDown = (e) => startDrag(e.pageX);

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      drag(e.pageX);
    });
  };

  const handleTouchStart = (e) => startDrag(e.touches[0].pageX);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(() => {
      drag(e.touches[0].pageX);
    });
  };

  return (
    <div
      ref={carouselRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={endDrag}
      onMouseLeave={endDrag}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={endDrag}
      className={`flex space-x-4 overflow-x-hidden scrollbar-hide ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ scrollBehavior: "smooth", willChange: "scroll-position" }}
    >
      {children}
    </div>
  );
};

export default DraggableCarousel;