import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-workers.jpg";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Skilled workers collaborating"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-85" />
      </div>

      <div className="container relative z-10 py-20 md:py-28">
        <div className="max-w-2xl">
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl animate-fade-in">
            Find Work.{" "}
            <span className="text-primary">Build Your Rep.</span>
          </h1>
          <p
            className="mt-4 text-lg text-primary-foreground/80 max-w-lg animate-fade-in"
            style={{ animationDelay: "0.15s" }}
          >
            Verified skills, trusted ratings, and real jobs for skilled workers across Kenya.
          </p>

          {/* Search */}
          <div
            className="mt-8 relative max-w-md animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, skill, or location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-11 h-12 bg-card/95 backdrop-blur border-0 shadow-warm text-base"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
