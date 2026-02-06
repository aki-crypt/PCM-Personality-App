'use client';

import { useState } from 'react';
import LandingPage from './components/LandingPage';
import QuizClassic from './components/QuizClassic';
import QuizNeo from './components/QuizNeo';

export default function Home() {
  const [mode, setMode] = useState<'LANDING' | 'CLASSIC' | 'NEO'>('LANDING');

  if (mode === 'CLASSIC') {
    return <QuizClassic />;
  }

  if (mode === 'NEO') {
    return <QuizNeo />;
  }

  return (
    <LandingPage onSelectMode={setMode} />
  );
}
