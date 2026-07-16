import { PricingTier } from "@/data/pricing";
import Link from "next/link";

export default function PricingCard({ tier }: { tier: PricingTier }) {
  return (
    <div className={`relative border bg-black/80 backdrop-blur-md p-6 rounded-sm group hover:border-matrix/60 transition-all duration-300 flex flex-col ${tier.isPopular ? 'border-bitcoin/50 shadow-[0_0_20px_rgba(247,147,26,0.15)]' : 'border-matrix/30'}`}>
      {/* Corner Accents (Design System v2.0) */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-matrix"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-matrix"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-matrix"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-matrix"></div>

      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bitcoin text-black font-vt323 text-sm px-3 py-1 tracking-widest">
          POPULAR
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-vt323 text-2xl text-matrix tracking-wider">{tier.name}</h3>
          <p className="font-mono text-xs text-gray-400 mt-1">"{tier.tagline}"</p>
        </div>
        <div className="text-right">
          <span className="font-vt323 text-3xl text-bitcoin">{tier.setup}</span>
          <span className="font-mono text-xs text-gray-500 block">Setup Inicial</span>
        </div>
      </div>

      <p className="font-mono text-sm text-gray-300 mb-6 leading-relaxed flex-grow">
        {tier.target}
      </p>

      <ul className="font-mono text-sm text-gray-300 space-y-3 mb-8 flex-grow">
        {tier.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-matrix mt-1">✓</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="border-t border-white/10 pt-4 mb-6 space-y-2">
        <div className="flex justify-between font-mono text-xs">
          <span className="text-gray-400">Comisión:</span>
          <span className="text-bitcoin font-bold">{tier.fee}</span>
        </div>
        <div className="flex justify-between font-mono text-xs">
          <span className="text-gray-400">Mensualidad:</span>
          <span className="text-matrix font-bold">{tier.monthly}</span>
        </div>
        <div className="flex justify-between font-mono text-xs">
          <span className="text-gray-400">Entrega:</span>
          <span className="text-white">{tier.delivery}</span>
        </div>
      </div>

      <Link
        href={tier.ctaLink}
        className="block w-full text-center font-vt323 text-lg bg-bitcoin text-black py-3 px-4 hover:bg-bitcoin/90 transition-colors uppercase tracking-widest shadow-[0_0_20px_rgba(247,147,26,0.3)] hover:shadow-[0_0_30px_rgba(247,147,26,0.5)]"
      >
        {tier.ctaText}
      </Link>
    </div>
  );
}
