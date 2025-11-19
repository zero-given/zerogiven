import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import Background3D from './Background3D';
import ThemeToggle from './ThemeToggle';
import shoeModels from '@/models';
import LoadingIndicator from './LoadingIndicator';

const LandingPage: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [modelIndex, setModelIndex] = useState(0);
  const [autoCycleEnabled, setAutoCycleEnabled] = useState(true);
  const totalModels = shoeModels.length;
  const currentModel = shoeModels[modelIndex % totalModels];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  const handlePrevModel = () => {
    setModelIndex((prev) => (prev - 1 + totalModels) % totalModels);
  };

  const handleNextModel = () => {
    setModelIndex((prev) => (prev + 1) % totalModels);
  };

  useEffect(() => {
    if (!autoCycleEnabled) return;

    const timeout = window.setTimeout(() => {
      setModelIndex((prev) => (prev + 1) % totalModels);
    }, 3000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [autoCycleEnabled, modelIndex, totalModels]);

  const handleAutoCycleToggle = () => {
    setAutoCycleEnabled((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500 overflow-hidden">
      <LoadingIndicator />
      
      {/* 3D Background Layer */}
      <Background3D modelUrl={currentModel.url} />

      {/* Model switcher arrows */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-8">
        <button
          type="button"
          onClick={handlePrevModel}
          aria-label="View previous model"
          className="pointer-events-auto inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/40 bg-black/40 backdrop-blur-md text-white shadow-lg hover:bg-black/60 transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={handleNextModel}
          aria-label="View next model"
          className="pointer-events-auto inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/40 bg-black/40 backdrop-blur-md text-white shadow-lg hover:bg-black/60 transition"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen border-l border-zinc-200 dark:border-zinc-900 relative z-10 transition-colors duration-500">
        
        {/* Left Sidebar */}
        <div className="hidden md:flex md:col-span-1 border-r border-zinc-200 dark:border-zinc-900 flex-col justify-between py-8 items-center bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm transition-colors duration-500">
            <div className="text-xs font-bold -rotate-90 whitespace-nowrap tracking-widest text-zinc-400 dark:text-zinc-600">EST. 2024</div>
            <div className="h-32 w-px bg-zinc-200 dark:bg-zinc-800"></div>
            <div className="text-xs font-bold -rotate-90 whitespace-nowrap tracking-widest text-zinc-400 dark:text-zinc-600">ZG—SYS</div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-1 md:col-span-11 flex flex-col bg-transparent">
            
            {/* Top Bar */}
            <div className="border-b border-zinc-200 dark:border-zinc-900 p-6 md:p-8 flex justify-between items-center bg-white/50 dark:bg-zinc-950/50 backdrop-blur-sm sticky top-0 z-50 transition-colors duration-500">
                <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-start md:items-center">
                   <div className="text-sm font-medium tracking-tighter">(001) — SYSTEM GRID</div>
                   <div className="hidden md:block w-px h-4 bg-zinc-300 dark:bg-zinc-700"></div>
                   <div className="text-xs text-zinc-500 dark:text-zinc-500">STATUS: PENDING</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleAutoCycleToggle}
                    aria-pressed={autoCycleEnabled}
                    aria-label="Toggle automatic shoe cycling"
                    className={`relative inline-flex items-center h-6 w-14 rounded-full border border-zinc-300 dark:border-zinc-700 px-1 transition-colors ${
                      autoCycleEnabled ? 'bg-emerald-500/80 text-white' : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    <span
                      className={`text-[10px] font-semibold tracking-widest w-full text-center transition-opacity ${
                        autoCycleEnabled ? 'opacity-100' : 'opacity-70'
                      }`}
                    >
                      AUTO
                    </span>
                    <span
                      className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-white dark:bg-zinc-200 shadow transition-transform ${
                        autoCycleEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <ThemeToggle />
                </div>
            </div>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col justify-center p-6 md:p-12 relative overflow-hidden">
                
                {/* Static Noise/Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none transition-[background-image] duration-500"></div>
                
                <motion.h1 
                   initial={{ y: 100, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                   className="text-[15vw] leading-[0.8] font-bold tracking-tighter uppercase relative z-10 mix-blend-hard-light dark:mix-blend-difference"
                >
                    Zero
                    <br/>
                    Given
                </motion.h1>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-zinc-200 dark:border-zinc-900 pt-12 relative z-10 transition-colors duration-500">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Mission</h3>
                        <p className="text-xl md:text-2xl font-light leading-tight max-w-md text-zinc-700 dark:text-zinc-300">
                            We are restructuring the digital void.
                            <br/>
                            Silence is the new luxury.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">Access</h3>
                        {status === 'success' ? (
                            <motion.div 
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-2xl font-light text-emerald-600 dark:text-emerald-500"
                            >
                                Request acknowledged.
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                                <Input 
                                    placeholder="EMAIL_ADDRESS" 
                                    className="bg-transparent border-b border-zinc-300 dark:border-zinc-800 border-t-0 border-x-0 rounded-none px-0 text-xl h-16 focus-visible:ring-0 focus-visible:border-zinc-900 dark:focus-visible:border-white transition-colors placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-mono text-zinc-900 dark:text-zinc-100"
                                    required
                                    type="email"
                                />
                                <div className="flex justify-end">
                                    <Button variant="ghost" type="submit" className="group text-xl font-light hover:bg-transparent text-zinc-900 dark:text-zinc-300 hover:text-zinc-500 dark:hover:text-zinc-100 p-0 h-auto transition-colors">
                                        INITIALIZE 
                                        <ArrowUpRight className="ml-2 w-6 h-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                    </Button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-200 dark:border-zinc-900 divide-x divide-zinc-200 dark:divide-zinc-900 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-500">
                {['CONCEPT', 'VISUALS', 'SYSTEM', 'CONTACT'].map((item, i) => (
                    <div key={item} className="p-4 md:p-8 h-32 md:h-40 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer flex flex-col justify-between group">
                        <span className="text-xs text-zinc-400 dark:text-zinc-600">0{i + 1}</span>
                        <span className="font-bold text-lg md:text-xl group-hover:translate-x-2 transition-transform text-zinc-900 dark:text-zinc-100">{item}</span>
                    </div>
                ))}
            </div>

        </div>
      </div>
    </div>
  );
};

export default LandingPage;
