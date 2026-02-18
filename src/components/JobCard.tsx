import { MapPin, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import type { Job } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

const urgencyStyles = {
  urgent: "bg-destructive/10 text-destructive border-destructive/20",
  normal: "bg-primary/10 text-primary border-primary/20",
  flexible: "bg-accent/10 text-accent border-accent/20",
};

const JobCard = ({ job }: { job: Job }) => {
  return (
    <Link to={`/job/${job.id}`} className="block group">
      <div className="rounded-xl border bg-card p-5 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-0.5 group-hover:border-primary/20">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-heading text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <Badge variant="outline" className={urgencyStyles[job.urgency]}>
            {job.urgency}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {job.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {job.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {job.postedAt}
          </span>
          <span className="flex items-center gap-1">
            <Tag className="h-3.5 w-3.5" />
            {job.category}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 flex-wrap">
            {job.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs font-normal">
                {skill}
              </Badge>
            ))}
          </div>
          <span className="font-heading text-lg font-bold text-primary whitespace-nowrap">
            {job.pay}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;
