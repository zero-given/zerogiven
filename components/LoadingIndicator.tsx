import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useProgress } from '@react-three/drei';

interface LoadingIndicatorProps {
  hideAfterInitial?: boolean;
  initialLoadComplete?: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ hideAfterInitial = false, initialLoadComplete = false }) => {
  const { active, progress } = useProgress();
  const roundedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  if (hideAfterInitial && initialLoadComplete) {
    return null;
  }

  return (
    <AnimatePresence>
      {(active || roundedProgress < 100) && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 md:left-auto md:right-12 z-50 pointer-events-none"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-black/70 dark:bg-black/60 text-white px-4 py-2 shadow-lg backdrop-blur-sm">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-medium">
              Loading
            </span>
            <div className="w-28 h-1.5 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                key={roundedProgress}
                initial={{ width: 0 }}
                animate={{ width: `${roundedProgress}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full bg-white"
              />
            </div>
            <span className="text-xs font-semibold tabular-nums">
              {roundedProgress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingIndicator;
