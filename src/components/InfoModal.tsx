"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play } from "lucide-react";
import { MediaItem } from "@/types";

interface InfoModalProps {
  item: MediaItem | null;
  onClose: () => void;
}

export default function InfoModal({ item, onClose }: InfoModalProps) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 px-4 pt-[5vh] pb-10"
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-[#181818] shadow-[0_0_40px_rgba(0,0,0,0.8)]"
          >
            {/* Top hero area */}
            <div className="relative flex h-[280px] items-end bg-gradient-to-br from-[#333] to-[#1a1a1a]">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#181818]" />
              <button
                onClick={onClose}
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#181818] text-white transition-colors hover:bg-[#252525]"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="relative z-10 px-8 pb-6">
                <h2 className="text-3xl font-bold text-white">{item.title}</h2>
                <div className="mt-4 flex items-center gap-3">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-[4px] bg-white px-6 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/75"
                    >
                      <Play className="h-4 w-4 fill-black" />
                      Open
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-[4px] bg-white/20 px-6 py-2 text-sm font-semibold text-white">
                      <Play className="h-4 w-4 fill-white" />
                      Preview
                    </span>
                  )}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#808080] text-white transition-colors hover:border-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Details section */}
            <div className="px-8 py-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-[#46d369]">{item.tag}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#d2d2d2]">
                {item.description}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
