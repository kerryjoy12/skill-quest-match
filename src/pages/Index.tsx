import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryFilter from "@/components/CategoryFilter";
import JobCard from "@/components/JobCard";
import { mockJobs } from "@/lib/mockData";
import { Briefcase } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredJobs = useMemo(() => {
    return mockJobs.filter((job) => {
      const matchesSearch =
        !searchQuery ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = !selectedCategory || job.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container py-8">
        <div className="mb-6">
          <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Briefcase className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {filteredJobs.length} job{filteredJobs.length !== 1 ? "s" : ""} available
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job, i) => (
            <div
              key={job.id}
              className="animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <JobCard job={job} />
            </div>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-lg font-heading">No jobs found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
