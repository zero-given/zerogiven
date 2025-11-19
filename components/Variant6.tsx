import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Crown } from 'lucide-react';

const Variant6: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-[#e4e4e7] font-sans selection:bg-white selection:text-black flex flex-col items-center justify-center p-6">
      
      {/* Minimal Border Container */}
      <div className="w-full max-w-[1400px] h-[calc(100vh-3rem)] border border-zinc-800/50 relative flex flex-col items-center justify-center overflow-hidden bg-black shadow-2xl rounded-sm">
         
         {/* Decorative Corner Accents */}
         <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-zinc-700"></div>
         <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-zinc-700"></div>

         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 1 }}
           className="z-10 text-center space-y-12 max-w-3xl px-6"
         >
             <div className="flex justify-center">
                <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800 mb-4">
                   <Crown className="w-6 h-6 text-zinc-500" />
                </div>
             </div>

             <h1 className="text-6xl md:text-9xl font-bold tracking-tight text-zinc-100">
                <span className="block text-zinc-700">ZERO</span>
                <span className="block -mt-4 md:-mt-8">GIVEN</span>
             </h1>

             <p className="text-zinc-500 text-lg md:text-xl font-light tracking-wide max-w-lg mx-auto">
                The ultimate sophistication is simplicity. We are preparing an exclusive experience.
             </p>

             <div className="max-w-sm mx-auto pt-8">
                {status === 'success' ? (
                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     className="text-center text-zinc-400 text-sm tracking-widest uppercase border-b border-zinc-800 pb-2"
                   >
                      You are on the guest list.
                   </motion.div>
                ) : (
                   <form onSubmit={handleSubmit} className="relative">
                      <Input 
                         className="bg-zinc-950 border-zinc-800 text-center text-zinc-300 h-14 rounded-full focus-visible:ring-1 focus-visible:ring-zinc-700 transition-all"
                         placeholder="enter email for access"
                         required
                      />
                      <Button 
                         type="submit"
                         variant="ghost"
                         loading={status === 'loading'}
                         className="absolute right-2 top-2 bottom-2 rounded-full px-4 hover:bg-zinc-900 text-zinc-500 hover:text-white transition-colors"
                      >
                         Join
                      </Button>
                   </form>
                )}
             </div>
         </motion.div>

         {/* Background Texture */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
         
         {/* Footer */}
         <div className="absolute bottom-8 text-xs text-zinc-800 font-medium tracking-[0.3em] uppercase">
            MCMXCIV — MMXXIV
         </div>
      </div>
    </div>
  );
};

export default Variant6;