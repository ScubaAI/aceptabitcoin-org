"use client";

export default function BitcoinAgentEmbed() {
  return (
    <div className="w-full rounded-3xl overflow-hidden border border-turquesa/30 shadow-2xl shadow-turquesa/10 bg-black">
      <div className="bg-zinc-900 px-4 py-2.5 border-b border-white/10 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-4 text-sm text-gray-400">Bitcoin Agent • Aprende haciendo</span>
      </div>
      
      <iframe
        src="https://bitcoinbot-five.vercel.app/es?embed=true"
        className="w-full h-[700px] md:h-[760px]"
        allow="clipboard-write"
        title="Bitcoin Agent"
      />
    </div>
  );
}