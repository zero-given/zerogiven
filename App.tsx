import React from 'react';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  return (
    <main className="min-h-screen w-full bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      <LandingPage />
    </main>
  );
};

export default App;