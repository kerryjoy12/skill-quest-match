import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, ShieldCheck, FileText, Mail, ArrowLeft, Phone, Star, Award, Briefcase, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ReviewSection from "@/components/ReviewSection";

const PublicPortfolio = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const load = async () => {
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
    load();
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
  const hasCert = certificates.length > 0;
  const photoUrl = profile.profile_photo
    ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${profile.profile_photo}`
    : null;

  const navItems = [
    { id: "about", label: "About Me", icon: User },
    { id: "skills", label: "Skills", icon: ShieldCheck },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen bg-secondary">
      {/* Hero Section - dark split layout inspired by Figma reference */}
      <div className="relative overflow-hidden">
        <div className="gradient-hero min-h-[420px] flex items-center">
          <div className="container max-w-5xl py-12">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary/70 hover:text-primary mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to FundiLink
            </Link>
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="shrink-0">
                {photoUrl ? (
                  <img src={photoUrl} alt={profile.full_name} className="h-40 w-40 rounded-2xl object-cover border-4 border-primary/30 shadow-warm" />
                ) : (
                  <div className="flex h-40 w-40 items-center justify-center rounded-2xl gradient-warm text-5xl font-bold text-primary-foreground font-heading border-4 border-primary/30">
                    {initials}
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <p className="text-primary/70 text-sm font-medium mb-1">Hi, I am</p>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground mb-2">{profile.full_name}</h1>
                <p className="text-lg text-primary/80 font-medium">
                  {skills.length > 0 ? skills.map((s) => s.skill_name).join(" · ") : "Skilled Worker"}
                </p>
                {profile.location && (
                  <p className="flex items-center gap-1.5 text-sm text-primary-foreground/60 mt-3 justify-center md:justify-start">
                    <MapPin className="h-4 w-4" /> {profile.location}
                  </p>
                )}
                <div className="flex gap-3 mt-5 justify-center md:justify-start">
                  {hasCert && (
                    <Badge className="gap-1.5 bg-accent text-accent-foreground px-3 py-1.5">
                      <Award className="h-3.5 w-3.5" /> Verified Fundi
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inner Navigation */}
      <div className="bg-card border-b sticky top-0 z-10">
        <div className="container max-w-5xl flex gap-1 overflow-x-auto py-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
                activeSection === item.id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-card-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-5xl py-8 space-y-6">
        {/* About Me */}
        {activeSection === "about" && (
          <div className="rounded-xl border bg-card p-6 shadow-card animate-fade-in">
            <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 uppercase tracking-wider">About Me</h2>
            <p className="text-card-foreground leading-relaxed">{profile.bio || "No bio added yet."}</p>
            <div className="mt-6 border-t border-border pt-6">
              <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Services</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skills.map((s) => (
                  <div key={s.id} className="flex items-start gap-3 p-4 rounded-lg border">
                    <ShieldCheck className="h-5 w-5 text-accent mt-0.5" />
                    <div>
                      <p className="font-medium text-card-foreground">{s.skill_name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{s.experience_level || "Experienced"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Skills */}
        {activeSection === "skills" && (
          <div className="rounded-xl border bg-card p-6 shadow-card animate-fade-in">
            <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 uppercase tracking-wider">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((s) => (
                <Badge key={s.id} variant="secondary" className="px-4 py-2 text-sm gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  {s.skill_name}
                </Badge>
              ))}
              {skills.length === 0 && <p className="text-muted-foreground">No skills listed yet.</p>}
            </div>

            {/* Certificates */}
            {hasCert && (
              <div className="mt-8 border-t border-border pt-6">
                <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Certifications</h3>
                {certificates.map((cert) => (
                  <Link
                    key={cert.id}
                    to={`/certificate/${cert.certificate_id}`}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors mb-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                        <Award className="h-5 w-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-card-foreground">{cert.skill_category}</p>
                        <p className="text-xs text-muted-foreground">Verified · ID: {cert.certificate_id}</p>
                      </div>
                    </div>
                    <FileText className="h-5 w-5 text-primary" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Portfolio */}
        {activeSection === "portfolio" && (
          <div className="rounded-xl border bg-card p-6 shadow-card animate-fade-in">
            <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 uppercase tracking-wider">Portfolio</h2>
            {portfolioItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioItems.map((item) => (
                  <div key={item.id} className="rounded-lg border overflow-hidden">
                    {item.image_url && (
                      <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover" />
                    )}
                    <div className="p-4">
                      <p className="font-heading font-bold text-card-foreground">{item.title}</p>
                      {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No portfolio items yet.</p>
            )}
          </div>
        )}

        {/* Reviews */}
        {activeSection === "reviews" && (
          <div className="rounded-xl border bg-card p-6 shadow-card animate-fade-in">
            <h2 className="font-heading text-xl font-bold text-card-foreground mb-4 uppercase tracking-wider">Reviews</h2>
            <ReviewSection workerId={profile.user_id} />
          </div>
        )}

        {/* Contact */}
        {activeSection === "contact" && (
          <div className="rounded-xl border bg-card p-6 shadow-card animate-fade-in text-center space-y-4">
            <h2 className="font-heading text-xl font-bold text-card-foreground uppercase tracking-wider">Contact / Hire</h2>
            <p className="text-muted-foreground">Get in touch to hire {profile.full_name} for your next project.</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a href={`mailto:${profile.email}`}>
                <Button className="gap-2"><Mail className="h-4 w-4" /> Email</Button>
              </a>
              <a href={`https://wa.me/?text=Hi ${profile.full_name}, I found you on FundiLink!`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2"><Phone className="h-4 w-4" /> WhatsApp</Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicPortfolio;
