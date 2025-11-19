import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

const Variant3: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#05050a] text-slate-100 font-sans selection:bg-indigo-500/30 overflow-hidden">
      
      {/* Subtle Moving Gradient */}
      <div className="absolute inset-0 overflow-hidden">
         <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-[20%] -right-[20%] w-[80vw] h-[80vw] bg-indigo-900/20 rounded-full blur-[120px]"
         />
         <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[100px]"
         />
      </div>

      {/* Glass Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        <nav className="flex justify-between items-center mb-20">
          <div className="text-sm tracking-[0.2em] uppercase text-slate-400">Zero Given</div>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
          </div>
        </nav>

        <main className="flex-1 flex flex-col justify-center">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                 <motion.h1 
                   initial={{ opacity: 0, filter: "blur(10px)" }}
                   animate={{ opacity: 1, filter: "blur(0px)" }}
                   transition={{ duration: 1 }}
                   className="text-6xl md:text-9xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-600"
                 >
                    Essential.
                    <br/>
                    Timeless.
                 </motion.h1>
              </div>

              <div className="lg:col-span-4">
                 <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-8 rounded-2xl shadow-2xl">
                    <h3 className="text-lg font-medium mb-2">Early Access</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                       Join the waiting list for our upcoming release. We respect your inbox and your time.
                    </p>

                    {status === 'success' ? (
                       <motion.div 
                         initial={{ scale: 0.95, opacity: 0 }}
                         animate={{ scale: 1, opacity: 1 }}
                         className="bg-indigo-500/20 border border-indigo-500/50 p-4 rounded-xl text-indigo-200 text-sm flex items-center gap-2"
                       >
                          <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                          Access Reserved.
                       </motion.div>
                    ) : (
                       <form onSubmit={handleSubmit} className="space-y-3">
                          <Input 
                             placeholder="email@domain.com" 
                             className="bg-black/20 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-500/50 h-12 rounded-xl"
                             type="email"
                             required
                          />
                          <Button 
                             type="submit" 
                             loading={status === 'loading'}
                             className="w-full bg-white text-black hover:bg-indigo-50 h-12 rounded-xl font-medium"
                          >
                             Join Waitlist
                          </Button>
                       </form>
                    )}
                 </div>
                 
                 <div className="mt-8 flex items-center gap-4 text-xs text-slate-500 uppercase tracking-widest font-medium">
                    <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
                    <span className="w-px h-3 bg-slate-700"></span>
                    <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
                    <span className="w-px h-3 bg-slate-700"></span>
                    <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
                 </div>
              </div>
           </div>
        </main>

        <footer className="mt-20 flex justify-between items-end border-t border-white/5 pt-8">
           <div className="text-xs text-slate-600 max-w-xs">
              © 2024 Zero Given Inc.<br/>
              All rights reserved.
           </div>
           <div className="hidden md:flex gap-12 text-xs text-slate-400">
              <div className="flex flex-col gap-2">
                 <span className="text-slate-600 uppercase tracking-wider">Project</span>
                 <span>Alpha Build 0.9</span>
              </div>
              <div className="flex flex-col gap-2">
                 <span className="text-slate-600 uppercase tracking-wider">Server</span>
                 <span>US-East-1</span>
              </div>
           </div>
        </footer>

      </div>
    </div>
  );
};

export default Variant3;