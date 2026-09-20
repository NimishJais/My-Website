"use client";

import React, { useState, useRef, useEffect } from "react";
import { soundFx } from "../ui/SoundFx";
import { SectionHeading } from "../ui/SectionHeading";
import { TERMINAL_COMMANDS } from "@/data/portfolioData";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Trash2 } from "lucide-react";

interface CommandLog {
  id: string;
  command: string;
  output: string | string[];
}

export function InteractiveTerminal({ onOpenResumeModal }: { onOpenResumeModal: () => void }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "initial-1",
      command: "nimish --init",
      output: [
        "=======================================================",
        " NIMISH JAIS // ENTERPRISE SYSTEM INTERFACE v2.6.4",
        " Associate Technical Analyst @ Sapiens Technologies",
        " Type 'help' to inspect available system commands.",
        "=======================================================",
      ],
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    soundFx.playChirp(700, 0.05);

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (trimmed === "resume") {
      onOpenResumeModal();
    }

    let output: string | string[] = "Command not recognized. Type 'help' to see valid operations.";

    if (TERMINAL_COMMANDS[trimmed]) {
      output = TERMINAL_COMMANDS[trimmed];
    } else if (trimmed === "bravo") {
      output = "🏆 BRAVO AWARD: Recognized at Sapiens Technologies for high-ticket module delivery ahead of schedule and zero-defect production release!";
    } else if (trimmed === "matrix") {
      output = [
        "Document Automation: GhostDraft CCM [95%]",
        "Data Transformations: XSLT 2.0 / XPath [90%]",
        "Languages: Java [88%], XML [95%], JSON [92%], SQL [85%]",
        "Cloud: AWS S3 [88%], REST/SOAP APIs [92%]"
      ];
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        command: cmdText,
        output,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  const quickCommands = ["help", "whoami", "skills", "experience", "bravo", "awards", "contact", "clear"];

  return (
    <section id="terminal" className="py-20 md:py-32 relative bg-[#090b10]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Interactive Terminal"
          title="Edgy Developer Console // Real-Time Shell"
          subtitle="Explore system logs, career milestones, awards, and credentials directly via keyboard."
        />

        {/* Quick Command Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Quick Cmds:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#111726] border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
            >
              ${cmd}
            </button>
          ))}
          <button
            onClick={() => setHistory([])}
            className="ml-auto text-xs font-mono text-slate-500 hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>

        {/* Terminal Window Box */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="rounded-2xl border border-cyan-500/30 bg-[#06080d] shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden font-mono text-xs cursor-text"
        >
          {/* Terminal Window Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#0d121c] border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-slate-400 text-xs ml-2 font-medium">
                guest@nimish-jais-macbook: ~
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <TerminalIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span>bash - 80x24</span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 md:p-6 space-y-4 min-h-[300px] max-h-[420px] overflow-y-auto scrollbar-thin text-slate-200">
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-emerald-400 font-bold">nimish@terminal:~$</span>
                  <span className="text-slate-100">{item.command}</span>
                </div>

                <div className="text-slate-300 pl-4 border-l border-white/10 leading-relaxed text-xs">
                  {Array.isArray(item.output) ? (
                    item.output.map((line, lIdx) => (
                      <div key={lIdx} className={line.startsWith("=") ? "text-cyan-400/70" : ""}>
                        {line}
                      </div>
                    ))
                  ) : (
                    <div className="whitespace-pre-line">{item.output}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Input Prompt Row */}
            <div className="flex items-center gap-2 pt-2">
              <span className="text-emerald-400 font-bold shrink-0">nimish@terminal:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type a command (e.g. 'help', 'skills', 'awards')..."
                className="w-full bg-transparent text-cyan-300 focus:outline-none font-mono text-xs placeholder:text-slate-600"
                autoFocus
              />
              <CornerDownLeft className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            </div>

            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
