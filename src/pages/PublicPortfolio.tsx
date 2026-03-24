import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, ShieldCheck, FileText, Mail, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const PublicPortfolio = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data: prof } = await supabase.from("profiles").select("*").eq("username", username).single();
      if (prof) {
        setProfile(prof);
        const [skillsRes, certsRes, portfolioRes] = await Promise.all([
          supabase.from("skills").select("*").eq("user_id", prof.user_id),
          supabase.from("certificates").select("*").eq("user_id", prof.user_id),
          supabase.from("portfolio_items").select("*").eq("user_id", prof.user_id),
        ]);
        setSkills(skillsRes.data || []);
        setCertificates(certsRes.data || []);
        setPortfolioItems(portfolioRes.data || []);
      }
      setLoading(false);
    };
    fetch();
  }, [username]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-xl font-heading font-bold text-card-foreground mb-2">Profile not found</p>
        <p className="text-muted-foreground mb-4">This user doesn't exist.</p>
        <Link to="/"><Button variant="outline">Go Home</Button></Link>
      </div>
    );
  }

  const initials = profile.full_name?.split(" ").map((n: string) => n[0]).join("") || "?";

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8 space-y-6">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to FundiLink
        </Link>

        {/* Header */}
        <div className="rounded-xl border bg-card p-6 shadow-card">
          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full gradient-warm text-2xl font-bold text-primary-foreground font-heading shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-heading text-2xl font-bold text-card-foreground">{profile.full_name}</h1>
              {profile.location && (
                <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" /> {profile.location}
                </p>
              )}
              <p className="text-sm text-card-foreground mt-2 leading-relaxed">{profile.bio || "No bio yet."}</p>
              <div className="mt-3">
                <a href={`mailto:${profile.email}`}>
                  <Button size="sm">
                    <Mail className="h-4 w-4 mr-1" /> Contact / Hire
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <Badge key={s.id} variant="secondary" className="px-3 py-1.5 text-sm gap-1.5">
                  <ShieldCheck className="h-3 w-3 text-accent" />
                  {s.skill_name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Certificates */}
        {certificates.length > 0 && (
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Certificates</h2>
            {certificates.map((cert) => (
              <Link
                key={cert.id}
                to={`/certificate/${cert.certificate_id}`}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors mb-2"
              >
                <div>
                  <p className="font-medium text-card-foreground">{cert.skill_category}</p>
                  <p className="text-xs text-muted-foreground">ID: {cert.certificate_id}</p>
                </div>
                <FileText className="h-5 w-5 text-primary" />
              </Link>
            ))}
          </div>
        )}

        {/* Portfolio Items */}
        {portfolioItems.length > 0 && (
          <div className="rounded-xl border bg-card p-5 shadow-card">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Portfolio</h2>
            <div className="grid gap-3">
              {portfolioItems.map((item) => (
                <div key={item.id} className="p-3 rounded-lg border">
                  <p className="font-medium text-card-foreground">{item.title}</p>
                  {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPortfolio;
