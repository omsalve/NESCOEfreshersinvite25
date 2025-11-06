// app/page.tsx

import AnimatedText from './components/AnimatedText';
import GuestListDownloader from './components/GuestListDownloader';
import RSVPForm from './components/RSVPform';

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 text-center overflow-hidden">
      {/* This is the cinematic background.
        A static dark background with a massive, soft, pulsing radial gradient 
        to create a subtle, elegant "breathing" light effect.
      */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-gray-950">
        <div
          className="absolute bottom-0 left-0 right-0 top-0 
                     bg-[radial-gradient(circle_800px_at_50%_200px,#3b0764,transparent)] 
                     animate-background-glow"
        ></div>
      </div>

      {/* Page Content */}
      <div className="z-10 flex flex-col items-center w-full">
        <AnimatedText />

        <div className="mt-10 md:mt-12 w-full">
          <RSVPForm />
        </div>

        <div className="mt-10">
          <GuestListDownloader />
        </div>
      </div>
    </main>
  );
}