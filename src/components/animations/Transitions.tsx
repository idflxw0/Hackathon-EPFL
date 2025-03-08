import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Slide transition for panels and modals
interface SlideTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  direction: 'left' | 'right' | 'up' | 'down';
}

export const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  isVisible,
  direction,
}) => {
  const directionMap = {
    left: { x: -20 },
    right: { x: 20 },
    up: { y: -20 },
    down: { y: 20 },
  };

  const initial = directionMap[direction];
  const exit = directionMap[direction];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, ...initial }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, ...exit }}
          transition={{ duration: 0.2, ease: 'easeOut' }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Fade transition for elements
interface FadeTransitionProps {
  children: React.ReactNode;
  isVisible?: boolean;
  delay?: number;
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  isVisible = true,
  delay = 0,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut', delay }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Scale transition for smaller elements
interface ScaleTransitionProps {
  children: React.ReactNode;
  isVisible?: boolean;
}

export const ScaleTransition: React.FC<ScaleTransitionProps> = ({
  children,
  isVisible = true,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Staggered animation for lists
interface StaggeredListProps {
  children: React.ReactNode[];
}

export const StaggeredList: React.FC<StaggeredListProps> = ({ children }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0 },
          }}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Modal transition
interface ModalTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
}

export const ModalTransition: React.FC<ModalTransitionProps> = ({
  children,
  isVisible,
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="z-20 fixed inset-0 flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
