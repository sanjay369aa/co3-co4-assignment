import React, { useState } from 'react';
import { Copy, Check, Download, Search, FileCode2, Terminal, Sparkles } from 'lucide-react';
import { CPP_SOURCE_CODE } from '../data/cppCode';

export const CodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(CPP_SOURCE_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([CPP_SOURCE_CODE], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'main.cpp';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const taskFilters = [
    { label: 'Task 1: Deep Copy', query: 'TASK 1' },
    { label: 'Task 2: delete[] Destructor', query: 'TASK 2' },
    { label: 'Task 3: Operator Overload', query: 'TASK 3' },
    { label: 'Task 4: Abstract Base', query: 'TASK 4' },
    { label: 'Task 5: Virtual Base Class', query: 'TASK 5' },
    { label: 'Task 6: Composition Order', query: 'TASK 6' },
    { label: 'Task 7: Polymorphism', query: 'TASK 7' },
    { label: 'Task 8: this & dynamic_cast', query: 'TASK 8' },
    { label: 'Task Demos (1-8)', query: 'demoTask' },
    { label: 'Menu Driver', query: 'displayMenu' },
  ];

  const lines = CPP_SOURCE_CODE.split('\n');

  return (
    <div className="flex flex-col h-full bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileCode2 className="w-5 h-5 text-indigo-400" />
          <div>
            <h3 className="text-sm font-semibold text-slate-100 font-mono">main.cpp</h3>
            <p className="text-[11px] text-slate-400">Complete C++17 Academic Implementation (ISO/IEC 14882 - CO3/CO4)</p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-700/80 rounded pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono w-40 sm:w-48"
            />
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            Download main.cpp
          </button>
        </div>
      </div>

      {/* Task Jump Tags */}
      <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
        <span className="text-slate-500 whitespace-nowrap">Filter / Jump:</span>
        {taskFilters.map((tf, i) => (
          <button
            key={i}
            onClick={() => setSearchQuery(searchQuery === tf.query ? '' : tf.query)}
            className={`px-2 py-0.5 rounded border whitespace-nowrap transition-colors ${
              searchQuery === tf.query 
                ? 'bg-indigo-600 text-white border-indigo-500 font-semibold' 
                : 'bg-indigo-950 text-indigo-300 border-indigo-800/50 hover:bg-indigo-900'
            }`}
          >
            {tf.label}
          </button>
        ))}
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700 text-[10px] ml-1"
          >
            Clear Filter
          </button>
        )}
      </div>

      {/* Code Display Area with Line Numbers */}
      <div className="flex-1 overflow-y-auto font-mono text-xs p-4 bg-slate-950 select-text">
        <div className="space-y-0.5">
          {lines.map((line, idx) => {
            const lineNum = idx + 1;
            const isMatch = searchQuery && line.toLowerCase().includes(searchQuery.toLowerCase());
            const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*');
            const isKeyword = line.includes('class ') || line.includes('virtual ') || line.includes('override') || line.includes('public:') || line.includes('private:') || line.includes('protected:') || line.includes('struct ');

            return (
              <div 
                key={lineNum} 
                className={`flex items-start hover:bg-slate-900/60 py-0.5 px-1 rounded transition-colors ${
                  isMatch ? 'bg-indigo-950/80 border-l-2 border-indigo-400' : ''
                }`}
              >
                <span className="w-12 text-right pr-4 text-slate-600 select-none text-[11px] shrink-0 font-mono">
                  {lineNum}
                </span>
                <pre className={`font-mono flex-1 whitespace-pre-wrap ${
                  isComment ? 'text-slate-500 italic' : isKeyword ? 'text-indigo-300 font-semibold' : 'text-slate-200'
                }`}>
                  {line}
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
