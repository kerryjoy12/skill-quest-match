import { Star, MapPin, ShieldCheck, Briefcase, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockWorker } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Profile = () => {
  const w = mockWorker;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl py-8">
        {/* Profile header */}
        <div className="rounded-xl border bg-card p-6 shadow-card mb-6 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-warm text-2xl font-bold text-primary-foreground font-heading shrink-0">
              {w.name.split(" ").map((n) => n[0]).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading text-2xl font-bold text-card-foreground">{w.name}</h1>
                {w.verified && (
                  <Badge className="gap-1 bg-accent text-accent-foreground">
                    <ShieldCheck className="h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
              <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                <MapPin className="h-3.5 w-3.5" /> {w.location}
              </p>
              <p className="text-sm text-card-foreground mt-2 leading-relaxed">{w.bio}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { icon: Star, label: "Rating", value: w.rating.toFixed(1), color: "text-primary" },
            { icon: Briefcase, label: "Jobs Done", value: w.completedJobs.toString(), color: "text-accent" },
            { icon: Award, label: "Rep Score", value: `${w.reputationScore}%`, color: "text-primary" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-card p-4 text-center shadow-card animate-fade-in"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <stat.icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
              <p className="font-heading text-xl font-bold text-card-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reputation bar */}
        <div className="rounded-xl border bg-card p-5 shadow-card mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Reputation Score
          </h2>
          <Progress value={w.reputationScore} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            Based on verified jobs, ratings, recency, and rater credibility
          </p>
        </div>

        {/* Skills */}
        <div className="rounded-xl border bg-card p-5 shadow-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Verified Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {w.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="px-3 py-1.5 text-sm gap-1.5">
                <ShieldCheck className="h-3 w-3 text-accent" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
