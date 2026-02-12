'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import LandingPage from './components/LandingPage';
import QuizClassic from './components/QuizClassic';
import QuizNeo from './components/QuizNeo';

function HomeContent() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<'LANDING' | 'CLASSIC' | 'NEO'>('LANDING');
  const [initialData, setInitialData] = useState<any>(null);
  const [initialAnswers, setInitialAnswers] = useState<string | undefined>(undefined);

  useEffect(() => {
    const share = searchParams.get('share');
    const urlMode = searchParams.get('mode');

    if (share && urlMode === 'NEO') {
      setInitialAnswers(share);
      setMode('NEO');
    }
  }, [searchParams]);

  const handleSelectMode = (mode: 'LANDING' | 'CLASSIC' | 'NEO', data?: any, answers?: string) => {
    setMode(mode);
    if (data) {
      setInitialData(data);
    }
    if (answers) {
      setInitialAnswers(answers);
    }
  };

  if (mode === 'CLASSIC') {
    return <QuizClassic initialData={initialData} />;
  }

  if (mode === 'NEO') {
    return <QuizNeo initialData={initialData} initialAnswers={initialAnswers} />;
  }

  return (
    <LandingPage onSelectMode={handleSelectMode} />
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
