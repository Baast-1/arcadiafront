'use client';

import Link from 'next/link';

export default function Home() {

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center">Arcadia</h2>
          <Link href={"/admin"}>Se connecter</Link>
        </div>
    </div>
  );
}
