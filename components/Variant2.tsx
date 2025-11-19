import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

const Variant2: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f0f0] text-black font-sans selection:bg-[#ff3b30] selection:text-white">
      <div className="max-w-[1800px] mx-auto border-x border-zinc-300 min-h-screen flex flex-col bg-white">
        
        {/* Header */}
        <header className="grid grid-cols-2 md:grid-cols-4 border-b border-zinc-300">
          <div className="p-6 border-r border-zinc-300 flex items-center gap-2">
             <div className="w-4 h-4 bg-[#ff3b30] rounded-full"></div>
             <span className="font-bold tracking-tight">ZERO GIVEN</span>
          </div>
          <div className="p-6 border-r border-zinc-300 hidden md:block text-zinc-500 font-medium">
             Est. 2024
          </div>
          <div className="p-6 border-r border-zinc-300 hidden md:block text-zinc-500 font-medium">
             Zürich / New York
          </div>
          <div className="p-6 flex items-center justify-end md:justify-start font-medium">
             Coming Soon
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 grid grid-cols-1 md:grid-cols-2">
           <div className="p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 border-zinc-300">
              <div className="space-y-8">
                 <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8 }}
                   className="inline-block px-3 py-1 bg-black text-white text-xs font-bold uppercase tracking-widest"
                 >
                   Under Construction
                 </motion.div>
                 <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                   Build.<br/>
                   Break.<br/>
                   <span className="text-zinc-300">Repeat.</span>
                 </h1>
              </div>
              
              <div className="mt-12 md:mt-0">
                <p className="text-lg md:text-xl font-medium leading-relaxed max-w-md">
                  We are focusing on the essential. Stripping away the noise to reveal the signal.
                </p>
              </div>
           </div>

           <div className="border-l border-zinc-300 flex flex-col">
              <div className="flex-1 p-8 md:p-16 bg-[#f4f4f5] flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-5">
                    {Array.from({ length: 36 }).map((_, i) => (
                        <div key={i} className="border border-black/20"></div>
                    ))}
                 </div>
                 
                 <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                    className="w-48 h-48 md:w-64 md:h-64 border-[20px] border-[#ff3b30] rounded-full relative z-10 mix-blend-multiply"
                 />
                 <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, ease: "linear", repeat: Infinity }}
                    className="absolute w-48 h-48 md:w-64 md:h-64 border-[20px] border-black rounded-full z-0 opacity-20"
                 />
              </div>

              <div className="border-t border-zinc-300 p-8 md:p-12 bg-white">
                 {status === 'success' ? (
                    <div className="flex items-center gap-4 text-[#ff3b30] font-bold text-xl">
                       <Plus className="w-6 h-6" />
                       <span>Welcome to the list.</span>
                    </div>
                 ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-0 md:gap-0">
                       <Input 
                          placeholder="Enter your email"
                          className="h-16 bg-white border-2 border-black text-black text-lg placeholder:text-zinc-400 focus-visible:ring-0 focus-visible:border-[#ff3b30] rounded-none z-10 relative"
                          required
                          type="email"
                       />
                       <Button 
                          type="submit"
                          className="h-16 px-10 bg-black text-white hover:bg-[#ff3b30] rounded-none font-bold uppercase tracking-wider text-sm transition-colors"
                          loading={status === 'loading'}
                       >
                          Notify Me
                       </Button>
                    </form>
                 )}
              </div>
           </div>
        </main>

      </div>
    </div>
  );
};

export default Variant2;