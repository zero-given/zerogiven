import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { ArrowUpRight } from 'lucide-react';

const Variant1: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-50 font-sans selection:bg-white selection:text-black">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen border-l border-zinc-900">
        
        {/* Left Sidebar */}
        <div className="hidden md:flex md:col-span-1 border-r border-zinc-900 flex-col justify-between py-8 items-center bg-zinc-950 relative z-10">
            <div className="text-xs font-bold -rotate-90 whitespace-nowrap tracking-widest">EST. 2024</div>
            <div className="h-32 w-px bg-zinc-800"></div>
            <div className="text-xs font-bold -rotate-90 whitespace-nowrap tracking-widest">ZG—SYS</div>
        </div>

        {/* Main Content Area */}
        <div className="col-span-1 md:col-span-11 flex flex-col bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-100">
            
            {/* Top Bar */}
            <div className="border-b border-zinc-900 p-6 md:p-8 flex justify-between items-start bg-zinc-950/50 backdrop-blur-sm">
                <div className="text-sm font-medium tracking-tighter">(001) — SYSTEM GRID</div>
                <div className="text-sm font-medium tracking-tighter text-zinc-500">STATUS: PENDING</div>
            </div>

            {/* Hero Section */}
            <div className="flex-1 flex flex-col justify-center p-6 md:p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>
                
                <motion.h1 
                   initial={{ y: 100, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                   className="text-[15vw] leading-[0.8] font-bold tracking-tighter uppercase mix-blend-difference relative z-10"
                >
                    Zero
                    <br/>
                    Given
                </motion.h1>
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-zinc-900 pt-12 relative z-10">
                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Mission</h3>
                        <p className="text-xl md:text-2xl font-light leading-tight max-w-md text-zinc-300">
                            We are restructuring the digital void.
                            <br/>
                            Silence is the new luxury.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Access</h3>
                        {status === 'success' ? (
                            <div className="text-2xl font-light text-emerald-500">Request acknowledged.</div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                                <Input 
                                    placeholder="EMAIL_ADDRESS" 
                                    className="bg-transparent border-b border-zinc-800 border-t-0 border-x-0 rounded-none px-0 text-xl h-16 focus-visible:ring-0 focus-visible:border-white transition-colors placeholder:text-zinc-800 font-mono"
                                    required
                                />
                                <div className="flex justify-end">
                                    <Button variant="ghost" type="submit" className="group text-xl font-light hover:bg-transparent hover:text-zinc-400 p-0 h-auto">
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
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-zinc-900 divide-x divide-zinc-900 bg-zinc-950">
                {['CONCEPT', 'VISUALS', 'SYSTEM', 'CONTACT'].map((item, i) => (
                    <div key={item} className="p-4 md:p-8 h-32 md:h-40 hover:bg-zinc-900 transition-colors cursor-pointer flex flex-col justify-between group">
                        <span className="text-xs text-zinc-500">0{i + 1}</span>
                        <span className="font-bold text-lg md:text-xl group-hover:translate-x-2 transition-transform">{item}</span>
                    </div>
                ))}
            </div>

        </div>
      </div>
    </div>
  );
};

export default Variant1;