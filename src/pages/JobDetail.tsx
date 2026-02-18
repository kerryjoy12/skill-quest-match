import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Tag, User, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import { mockJobs } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const JobDetail = () => {
  const { id } = useParams();
  const job = mockJobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <p className="text-muted-foreground">Job not found.</p>
          <Link to="/">
            <Button variant="outline" className="mt-4">Back to Jobs</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl py-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to jobs
        </Link>

        <div className="rounded-xl border bg-card p-6 shadow-card animate-fade-in">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h1 className="font-heading text-2xl font-bold text-card-foreground">
              {job.title}
            </h1>
            <Badge
              variant="outline"
              className={
                job.urgency === "urgent"
                  ? "bg-destructive/10 text-destructive border-destructive/20"
                  : job.urgency === "normal"
                  ? "bg-primary/10 text-primary border-primary/20"
                  : "bg-accent/10 text-accent border-accent/20"
              }
            >
              {job.urgency}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><User className="h-3.5 w-3.5" />{job.employer}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.postedAt}</span>
            <span className="flex items-center gap-1"><Tag className="h-3.5 w-3.5" />{job.category}</span>
          </div>

          <div className="mb-6">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Description</h2>
            <p className="text-card-foreground leading-relaxed">{job.description}</p>
          </div>

          <div className="mb-6">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Required Skills</h2>
            <div className="flex gap-2 flex-wrap">
              {job.skills.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div>
              <p className="text-sm text-muted-foreground">Pay</p>
              <p className="font-heading text-2xl font-bold text-primary">{job.pay}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Shield className="h-4 w-4" /> Save
              </Button>
              <Button className="gap-2 shadow-warm">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
