import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CornerDownRight, Scan } from 'lucide-react';

const Variant5: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#0033cc] text-white font-mono selection:bg-white selection:text-[#0033cc] overflow-hidden relative">
      
      {/* Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff30_1px,transparent_1px),linear-gradient(to_bottom,#ffffff30_1px,transparent_1px)] bg-[size:100px_100px]"></div>

      <div className="relative z-10 h-full flex flex-col">
         
         {/* Header */}
         <header className="flex justify-between items-start p-4 md:p-8 border-b border-white/20 bg-[#0033cc]/80 backdrop-blur-sm">
             <div className="border border-white p-2">
                 <Scan className="w-6 h-6" />
             </div>
             <div className="text-right text-xs leading-tight opacity-80">
                 REF: ZG-2024-X<br/>
                 BLUEPRINT: ALPHA
             </div>
         </header>

         {/* Main Content */}
         <main className="flex-1 flex flex-col justify-center items-start p-4 md:p-12 max-w-6xl mx-auto w-full">
             
             <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-2 mb-12"
             >
                <div className="text-xs uppercase tracking-widest opacity-60 border-l-2 border-white pl-2 mb-4">Project Identity</div>
                <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight">
                   Zero_Given
                </h1>
                <div className="h-4 w-24 bg-white mt-2"></div>
             </motion.div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full border-t border-white/20 pt-8">
                 <div className="space-y-6">
                     <p className="text-sm md:text-base leading-relaxed opacity-90 max-w-md">
                        // SYSTEM STATUS: CONSTRUCTION<br/>
                        // ESTIMATED COMPLETION: TBD<br/>
                        <br/>
                        We are engineering a new standard. Precision is not an option; it is the requirement.
                     </p>
                 </div>

                 <div className="bg-[#002bb8] border border-white/30 p-6 max-w-md">
                    <h3 className="text-xs font-bold uppercase mb-4 flex items-center gap-2">
                       <CornerDownRight className="w-4 h-4" /> Input Vector
                    </h3>
                    
                    {status === 'success' ? (
                       <div className="bg-white text-[#0033cc] p-4 font-bold text-center animate-pulse">
                          DATA STORED SUCCESSFULLY
                       </div>
                    ) : (
                       <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                          <Input 
                             className="bg-[#001f80] border-white/20 text-white placeholder:text-white/30 rounded-none h-12 font-mono text-sm focus-visible:ring-1 focus-visible:ring-white"
                             placeholder="USER_EMAIL"
                             required
                          />
                          <Button className="bg-white text-[#0033cc] hover:bg-white/90 rounded-none h-12 font-bold">
                             EXECUTE
                          </Button>
                       </form>
                    )}
                 </div>
             </div>

         </main>

         {/* Footer Info */}
         <footer className="p-4 md:p-8 border-t border-white/20 flex justify-between text-[10px] md:text-xs uppercase tracking-widest opacity-60">
             <div>Coordinates: 40.7128° N, 74.0060° W</div>
             <div>Architecture: React / Tailwind</div>
         </footer>

      </div>
    </div>
  );
};

export default Variant5;