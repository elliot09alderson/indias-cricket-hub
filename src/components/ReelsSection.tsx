import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import cricketAction1 from "@/assets/cricket-action-1.jpg";
import cricketAction2 from "@/assets/cricket-action-2.jpg";
import cricketCelebration from "@/assets/cricket-celebration.jpg";

const ReelsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reels = [
    {
      id: 1,
      title: "Massive Six by Sharma! 🔥",
      thumbnail: cricketAction1,
      views: "2.5M",
      duration: "0:45",
    },
    {
      id: 2,
      title: "Unbelievable Catch - Best of the Match",
      thumbnail: cricketAction2,
      views: "1.8M",
      duration: "0:30",
    },
    {
      id: 3,
      title: "Championship Winning Moment",
      thumbnail: cricketCelebration,
      views: "3.2M",
      duration: "1:15",
    },
    {
      id: 4,
      title: "Hat-trick Bowling Performance",
      thumbnail: cricketAction1,
      views: "1.5M",
      duration: "1:00",
    },
    {
      id: 5,
      title: "Record Breaking Century",
      thumbnail: cricketAction2,
      views: "2.1M",
      duration: "0:55",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, reels.length - 2));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, reels.length - 2)) % Math.max(1, reels.length - 2));
  };

  return (
    <section id="reels" className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="mb-2 inline-block rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
            🎬 Trending Now
          </div>
          <h2 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
            Cricket Reels
          </h2>
          <p className="text-muted-foreground">
            Catch the best moments, highlights, and behind-the-scenes action
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-background shadow-lg hover:scale-110"
              onClick={prevSlide}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full bg-background shadow-lg hover:scale-110"
              onClick={nextSlide}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Reels Grid */}
          <div className="overflow-hidden">
            <div
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {reels.map((reel, index) => (
                <div
                  key={reel.id}
                  className="w-full flex-shrink-0 md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]"
                >
                  <Card className="group overflow-hidden border-border/50 bg-card transition-all hover:scale-[1.02] hover:shadow-xl">
                    <CardContent className="p-0">
                      {/* Thumbnail */}
                      <div className="relative aspect-[9/16] overflow-hidden bg-muted">
                        <img
                          src={reel.thumbnail}
                          alt={reel.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/90 backdrop-blur-sm transition-all group-hover:scale-110 group-hover:bg-accent">
                            <PlayCircle className="h-8 w-8 text-white" />
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                          {reel.duration}
                        </div>

                        {/* Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="mb-2 font-semibold text-white line-clamp-2">
                            {reel.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-white/80">
                            <span>👁️ {reel.views} views</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="mt-6 flex justify-center gap-2 lg:hidden">
            {Array.from({ length: Math.max(1, reels.length - 2) }).map((_, idx) => (
              <button
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? "w-8 bg-accent" : "w-2 bg-muted-foreground/30"
                }`}
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReelsSection;
