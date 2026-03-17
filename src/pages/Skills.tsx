import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import { skilledWorkers, SKILL_CATEGORIES } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Phone, Clock, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const Skills = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return skilledWorkers.filter((w) => {
      const matchesSearch =
        !searchQuery ||
        w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCat = !selectedCategory || w.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero py-16 md:py-20">
        <div className="container relative z-10">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl font-extrabold tracking-tight text-primary-foreground md:text-5xl animate-fade-in">
              Find Skilled{" "}
              <span className="text-primary">Fundis</span>
            </h1>
            <p className="mt-3 text-lg text-primary-foreground/80 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              Browse verified workers across Kenya — from jua kali artisans to cooks and cleaners.
            </p>
            <div className="mt-6 relative max-w-md animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, skill, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12 bg-card/95 backdrop-blur border-0 shadow-warm text-base"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="container py-8">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-6">
          <Badge
            variant={selectedCategory === null ? "default" : "outline"}
            className="cursor-pointer px-3 py-1.5 text-sm transition-colors"
            onClick={() => setSelectedCategory(null)}
          >
            All Skills
          </Badge>
          {SKILL_CATEGORIES.map((cat) => (
            <Badge
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              className="cursor-pointer px-3 py-1.5 text-sm transition-colors"
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            >
              {cat}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {filtered.length} worker{filtered.length !== 1 ? "s" : ""} available
          </span>
        </div>

        {/* Worker cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((w, i) => (
            <div
              key={w.id}
              className="animate-fade-in rounded-xl border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5"
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full gradient-warm text-lg font-bold text-primary-foreground font-heading shrink-0">
                  {w.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading text-lg font-semibold text-card-foreground">{w.name}</h3>
                  <p className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {w.location}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1 text-primary shrink-0">
                  <Star className="h-4 w-4 fill-primary" />
                  <span className="font-heading font-bold text-sm">{w.rating}</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{w.bio}</p>

              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {w.experience}
                </span>
                <Badge variant="outline" className="text-xs">{w.category}</Badge>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {w.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>

              <a
                href={`tel:${w.phone.replace(/\s/g, "")}`}
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-primary text-primary-foreground py-2.5 text-sm font-semibold transition-colors hover:bg-primary/90"
              >
                <Phone className="h-4 w-4" />
                {w.phone}
              </a>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <User className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-heading">No workers found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Skills;
