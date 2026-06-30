"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { EducationEntry } from "@/types";

interface EducationTimelineProps {
  entries: EducationEntry[];
}

export default function EducationTimeline({ entries }: EducationTimelineProps) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8">
      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 sm:left-8" />

        <div className="space-y-12">
          {entries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-16 sm:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-[17px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white/20 bg-[#0a0a0a] sm:left-[25px]">
                <div className="h-2 w-2 rounded-full bg-[#6366f1]" />
              </div>

              {/* Card */}
              <div className="flex items-start justify-between gap-6 rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-white/10 hover:bg-white/[0.04]">
                <div className="min-w-0 flex-1">
                  {/* Duration */}
                  <p className="mb-1 text-xs font-medium tracking-wider text-[#6366f1] uppercase">
                    {entry.duration}
                  </p>

                  {/* School */}
                  <h3 className="text-lg font-semibold text-white sm:text-xl">
                    {entry.school}
                  </h3>

                  {/* Degree */}
                  <p className="mt-1 text-sm text-[#b3b3b3]">
                    {entry.degree}
                  </p>

                  {/* Coursework */}
                  {entry.coursework && entry.coursework.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-medium tracking-wider text-[#666] uppercase">
                        Relevant Coursework
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {entry.coursework.map((course) => (
                          <span
                            key={course}
                            className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-[#999]"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Logo placeholder */}
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] text-[#555] sm:h-16 sm:w-16">
                  <GraduationCap size={28} strokeWidth={1.5} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
