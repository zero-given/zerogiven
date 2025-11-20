import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { RenderPresetId, renderPresetOrder, renderPresets } from './Background3D';

interface ControlPanelProps {
  renderPresetId: RenderPresetId;
  onRenderPresetChange: (presetId: RenderPresetId) => void;
  autoCycleEnabled: boolean;
  onToggleAutoCycle: () => void;
  autoCycleInterval: number;
  onAutoCycleIntervalChange: (ms: number) => void;
  transitionDuration: number;
  onTransitionDurationChange: (duration: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  renderPresetId,
  onRenderPresetChange,
  autoCycleEnabled,
  onToggleAutoCycle,
  autoCycleInterval,
  onAutoCycleIntervalChange,
  transitionDuration,
  onTransitionDurationChange,
}) => {
  const [open, setOpen] = useState(false);

  const handleIntervalInput = (value: number) => {
    onAutoCycleIntervalChange(value * 1000);
  };

  const handleTransitionInput = (value: number) => {
    onTransitionDurationChange(parseFloat(value.toFixed(2)));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-white shadow-lg backdrop-blur"
      >
        <SlidersHorizontal className="w-4 h-4" />
        Tune
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="controls-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black pointer-events-auto"
              onClick={() => setOpen(false)}
            />
            <motion.div
              key="controls-panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed bottom-20 right-6 z-50 w-80 max-w-[calc(100vw-3rem)] rounded-3xl border border-white/20 bg-zinc-900/90 p-6 text-white shadow-2xl backdrop-blur-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">Control</p>
                  <p className="text-lg font-semibold leading-tight">Visual Tuning</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/70 hover:bg-white/10"
                  aria-label="Close controls"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6 text-xs uppercase tracking-[0.2em]">
                <div>
                  <div className="mb-2 text-white/60">Render intensity</div>
                  <div className="grid grid-cols-3 gap-2">
                    {renderPresetOrder.map((presetId) => (
                      <button
                        key={presetId}
                        type="button"
                        onClick={() => onRenderPresetChange(presetId)}
                        className={`rounded-full border px-2 py-2 text-[11px] font-semibold transition ${
                          renderPresetId === presetId
                            ? 'bg-white text-black border-white'
                            : 'border-white/20 text-white/70 hover:border-white/40'
                        }`}
                      >
                        {renderPresets[presetId].shortLabel}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60">Auto cycle</span>
                  <button
                    type="button"
                    onClick={onToggleAutoCycle}
                    aria-pressed={autoCycleEnabled}
                    className={`relative inline-flex h-6 w-16 items-center rounded-full px-1 text-[10px] font-bold tracking-widest ${
                      autoCycleEnabled ? 'bg-emerald-400 text-black' : 'bg-white/10 text-white/60'
                    }`}
                  >
                    <span
                      className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        autoCycleEnabled ? 'translate-x-9' : 'translate-x-0'
                      }`}
                    />
                    <span className="w-full text-center">AUTO</span>
                  </button>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-white/60">
                    <span>Auto cycle tempo</span>
                    <span className="text-white">{(autoCycleInterval / 1000).toFixed(1)}s</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    step={0.5}
                    value={autoCycleInterval / 1000}
                    onChange={(e) => handleIntervalInput(parseFloat(e.target.value))}
                    className="w-full accent-white"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between text-white/60">
                    <span>Fade duration</span>
                    <span className="text-white">{transitionDuration.toFixed(2)}s</span>
                  </div>
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={transitionDuration}
                    onChange={(e) => handleTransitionInput(parseFloat(e.target.value))}
                    className="w-full accent-white"
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ControlPanel;
