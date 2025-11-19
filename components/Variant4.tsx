import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MoveRight } from 'lucide-react';

const Variant4: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FDFBF7] text-[#1c1917] selection:bg-[#dca54c] selection:text-white">
       <div className="h-screen flex flex-col md:flex-row">
          
          {/* Visual Side */}
          <div className="w-full md:w-1/2 h-1/3 md:h-full bg-[#e7e5e1] relative overflow-hidden border-b md:border-b-0 md:border-r border-[#d6d3cd]">
             <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <span className="text-[40vw] font-serif">Z</span>
             </div>
             <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-12 border border-[#1c1917] flex items-center justify-center"
             >
                <div className="text-center space-y-4">
                   <h2 className="text-xs uppercase tracking-[0.3em] font-sans text-[#57534e]">Collection 001</h2>
                   <h1 className="text-5xl md:text-7xl font-serif italic">Coming<br/>Soon</h1>
                </div>
             </motion.div>
             
             <div className="absolute bottom-6 left-6 text-[10px] font-sans uppercase tracking-widest">
                Fig. 1 — The Beginning
             </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 h-2/3 md:h-full flex flex-col p-8 md:p-20 justify-center bg-[#FDFBF7]">
             <div className="max-w-md mx-auto w-full space-y-12">
                <div className="space-y-2 text-center md:text-left">
                   <h3 className="font-serif text-4xl md:text-5xl text-[#1c1917]">Zero Given</h3>
                   <p className="font-sans text-[#57534e] text-sm tracking-wide uppercase">A modern design studio</p>
                </div>

                <div className="w-12 h-px bg-[#1c1917] mx-auto md:mx-0"></div>

                <p className="font-serif text-lg md:text-xl leading-relaxed text-[#44403c] text-center md:text-left">
                   We are crafting an experience that blends the elegance of the past with the precision of the future. 
                </p>

                <div className="space-y-4">
                   {status === 'success' ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-4 border-y border-[#1c1917] text-center font-serif italic text-xl"
                      >
                         Merci. We will be in touch.
                      </motion.div>
                   ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="relative group">
                            <Input 
                               placeholder="Your Email Address" 
                               className="h-12 bg-transparent border-b border-[#1c1917] border-t-0 border-x-0 rounded-none px-0 placeholder:text-[#a8a29e] placeholder:font-serif placeholder:italic focus-visible:ring-0 focus-visible:border-[#1c1917] text-lg font-serif transition-all"
                               required
                            />
                         </div>
                         <div className="flex justify-center md:justify-start">
                            <Button variant="link" className="pl-0 text-[#1c1917] hover:text-[#dca54c] transition-colors uppercase tracking-widest text-xs font-bold">
                               Notify Me <MoveRight className="ml-2 w-4 h-4" />
                            </Button>
                         </div>
                      </form>
                   )}
                </div>

                <div className="pt-12 flex justify-center md:justify-start gap-6 text-xs uppercase tracking-widest text-[#78716c]">
                   <a href="#" className="hover:text-[#1c1917] hover:underline underline-offset-4">Instagram</a>
                   <a href="#" className="hover:text-[#1c1917] hover:underline underline-offset-4">Pinterest</a>
                   <a href="#" className="hover:text-[#1c1917] hover:underline underline-offset-4">Email</a>
                </div>
             </div>
          </div>

       </div>
    </div>
  );
};

export default Variant4;