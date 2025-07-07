import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEventListener } from 'react-use';
import { MessageCircle, Zap, ArrowUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Scroll Progress Indicator
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="progress-bar"
      style={{ scaleX }}
    />
  );
}

// Floating Action Button with Context Menu
export function FloatingActionButton() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Expanded menu items */}
        <motion.div
          className="absolute bottom-16 right-0 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : 20,
            pointerEvents: isExpanded ? "auto" : "none"
          }}
          transition={{ staggerChildren: 0.1 }}
        >
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full h-12 w-12 shadow-lg backdrop-blur-sm bg-card/80"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full h-12 w-12 shadow-lg backdrop-blur-sm bg-card/80"
            >
              <Zap className="h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>

        {/* Main FAB */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            size="lg"
            className="rounded-full h-16 w-16 shadow-xl glow"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <motion.div
              animate={{ rotate: isExpanded ? 45 : 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <Sparkles className="h-6 w-6" />
            </motion.div>
          </Button>
          
          {/* Floating orbs around FAB */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/20 backdrop-blur-sm"
              style={{
                width: 8,
                height: 8,
                top: "50%",
                left: "50%",
              }}
              animate={{
                x: [0, Math.cos(i * 2 * Math.PI / 3) * 40],
                y: [0, Math.sin(i * 2 * Math.PI / 3) * 40],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

// Mouse Tracker Effect
export function MouseTracker() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEventListener('mousemove', (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  });

  useEventListener('mouseleave', () => {
    setIsVisible(false);
  });

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: mousePosition.x - 20,
        top: mousePosition.y - 20,
      }}
      animate={{
        opacity: isVisible ? 0.6 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      <div className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30" />
    </motion.div>
  );
}

// Scroll to Top Button
export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Button
        size="lg"
        variant="outline"
        className="rounded-full h-14 w-14 shadow-lg backdrop-blur-sm bg-card/80 border-border/50"
        onClick={scrollToTop}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>
    </motion.div>
  );
}

// Floating Background Elements
export function FloatingElements() {
  const elements = [
    { size: 60, x: '10%', y: '20%', delay: 0 },
    { size: 40, x: '80%', y: '30%', delay: 1 },
    { size: 80, x: '70%', y: '70%', delay: 2 },
    { size: 50, x: '20%', y: '80%', delay: 1.5 },
    { size: 30, x: '90%', y: '60%', delay: 0.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute floating-orb"
          style={{
            width: element.size,
            height: element.size,
            left: element.x,
            top: element.y,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: element.delay, duration: 2 }}
        />
      ))}
    </div>
  );
}

// Magnetic Button Effect
export function MagneticButton({ 
  children, 
  className = "", 
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left - width / 2;
    const y = e.clientY - top - height / 2;
    
    setPosition({ x: x * 0.3, y: y * 0.3 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.button
      ref={ref}
      className={`magnetic ${className}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

// Sparkle Effect
export function SparkleEffect({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const sparkleId = useRef(0);

  const createSparkle = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newSparkle = {
      id: sparkleId.current++,
      x: x + Math.random() * 20 - 10,
      y: y + Math.random() * 20 - 10,
    };
    
    setSparkles(prev => [...prev, newSparkle]);
    
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1000);
  }, []);

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseMove={createSparkle}
    >
      {children}
      {sparkles.map(sparkle => (
        <motion.div
          key={sparkle.id}
          className="absolute w-2 h-2 bg-primary rounded-full pointer-events-none"
          style={{ left: sparkle.x, top: sparkle.y }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
            y: sparkle.y - 20,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// Text Animation with Typewriter Effect
export function TypewriterText({ 
  text, 
  delay = 0, 
  speed = 50,
  className = ""
}: { 
  text: string; 
  delay?: number; 
  speed?: number;
  className?: string;
}) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, speed]);

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="inline-block w-0.5 h-5 bg-primary ml-1"
      />
    </span>
  );
}