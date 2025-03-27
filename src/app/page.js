'use client';

import { useEffect, useRef, useState } from 'react';
import MemeEditor from '@/components/MemeEditor';


export default function MemeEditor2() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <MemeEditor />
    </div>
  );

}
