const SponsorsBanner = () => {
  const sponsors = [
    "Dream11",
    "CEAT Tyres",
    "PayTM",
    "MRF",
    "Britannia",
    "Vivo",
    "BYJU'S",
    "Swiggy",
  ];

  return (
    <section className="border-y border-border/50 bg-card py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Official Partners
          </p>
        </div>
        
        {/* Scrolling Sponsors */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll gap-12">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <div
                key={index}
                className="flex-shrink-0 transform transition-transform hover:scale-110"
              >
                <div className="flex h-16 w-32 items-center justify-center rounded-lg border border-border/50 bg-background px-6 shadow-sm">
                  <span className="text-lg font-bold text-foreground/70">
                    {sponsor}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SponsorsBanner;
