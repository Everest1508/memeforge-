'use client';

import MemeEditor from '@/components/MemeEditor';

export default function MemeEditor2() {
  return (
    <div className="flex flex-col items-center justify-start w-full min-h-screen relative overflow-y-auto">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://www.tabichain.com/images/new/bg/1.svg')`,
        }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(184, 0, 0, 0.8) 0%, transparent 70%)",
          mixBlendMode: "lighten",
        }}
      />

      {/* Foreground Content (Editor Above Background) */}
      <div className="relative z-10 w-full px-52  bg-opacity-90 shadow-lg rounded-lg overflow-y-auto">
        <MemeEditor />
      </div>
    </div>
  );
}
