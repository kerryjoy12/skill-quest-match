import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Star, MapPin, ShieldCheck, Briefcase, Award, Settings, Share2, FileText, Plus, X, Camera, Upload } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import SkillQuizModal from "@/components/SkillQuizModal";
import ReviewSection from "@/components/ReviewSection";

const Profile = () => {
  const { user, profile, refreshProfile, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);
  const [skills, setSkills] = useState<{ id: string; skill_name: string; experience_level: string }[]>([]);
  const [certificates, setCertificates] = useState<{ id: string; certificate_id: string; skill_category: string; issued_date: string }[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({ full_name: "", bio: "", location: "" });
  const [newSkill, setNewSkill] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("");
  const [quizCategory, setQuizCategory] = useState<string | null>(null);
  const [newPortfolioTitle, setNewPortfolioTitle] = useState("");
  const [newPortfolioDesc, setNewPortfolioDesc] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (profile) {
      setFormData({ full_name: profile.full_name, bio: profile.bio || "", location: profile.location || "" });
      fetchSkills();
      fetchCertificates();
      fetchPortfolio();
    }
  }, [profile]);

  const fetchSkills = async () => {
    if (!user) return;
    const { data } = await supabase.from("skills").select("*").eq("user_id", user.id);
    if (data) setSkills(data);
  };

  const fetchCertificates = async () => {
    if (!user) return;
    const { data } = await supabase.from("certificates").select("*").eq("user_id", user.id);
    if (data) setCertificates(data);
  };

  const fetchPortfolio = async () => {
    if (!user) return;
    const { data } = await supabase.from("portfolio_items").select("*").eq("user_id", user.id);
    if (data) setPortfolioItems(data);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update(formData).eq("user_id", user.id);
    if (error) {
      toast({ title: "Error saving", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
      await refreshProfile();
      setEditing(false);
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const filePath = `${user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true });
    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
    } else {
      await supabase.from("profiles").update({ profile_photo: filePath }).eq("user_id", user.id);
      await refreshProfile();
      toast({ title: "Photo updated!" });
    }
    setUploading(false);
  };

  const handleAddSkill = async () => {
    if (!user || !newSkill.trim()) return;
    const { error } = await supabase.from("skills").insert({ user_id: user.id, skill_name: newSkill.trim(), experience_level: "intermediate" });
    if (!error) { setNewSkill(""); fetchSkills(); }
  };

  const handleDeleteSkill = async (id: string) => {
    await supabase.from("skills").delete().eq("id", id);
    fetchSkills();
  };

  const handleStartCertification = () => {
    if (!newSkillCategory.trim()) return;
    setQuizCategory(newSkillCategory.trim());
  };

  const handleQuizPass = async () => {
    if (!user || !quizCategory) return;
    const { error } = await supabase.from("certificates").insert({ user_id: user.id, skill_category: quizCategory });
    if (!error) {
      setNewSkillCategory("");
      setQuizCategory(null);
      fetchCertificates();
      toast({ title: "🎉 Certificate generated!" });
    }
  };

  const handleAddPortfolio = async () => {
    if (!user || !newPortfolioTitle.trim()) return;
    const { error } = await supabase.from("portfolio_items").insert({
      user_id: user.id,
      title: newPortfolioTitle.trim(),
      description: newPortfolioDesc.trim(),
    });
    if (!error) {
      setNewPortfolioTitle("");
      setNewPortfolioDesc("");
      fetchPortfolio();
      toast({ title: "Portfolio item added!" });
    }
  };

  const handleDeletePortfolio = async (id: string) => {
    await supabase.from("portfolio_items").delete().eq("id", id);
    fetchPortfolio();
  };

  const handleSharePortfolio = () => {
    const url = `${window.location.origin}/profile/${profile?.username}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Portfolio link copied!", description: url });
  };

  const handleShareCertificate = (certId: string) => {
    const url = `${window.location.origin}/certificate/${certId}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Certificate link copied!" });
  };

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container max-w-2xl py-16 text-center text-muted-foreground">Loading...</div>
      </div>
    );
  }

  const isSkilled = profile.role === "skilled";
  const initials = profile.full_name?.split(" ").map((n) => n[0]).join("") || "?";
  const photoUrl = profile.profile_photo
    ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/avatars/${profile.profile_photo}`
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container max-w-2xl py-8 space-y-6">
        {/* Header */}
        <div className="rounded-xl border bg-card p-6 shadow-card animate-fade-in">
          <div className="flex items-start gap-4">
            {/* Avatar with upload */}
            <div className="relative shrink-0 group">
              {photoUrl ? (
                <img src={photoUrl} alt={profile.full_name} className="h-20 w-20 rounded-xl object-cover border-2 border-primary/20" />
              ) : (
                <div className="flex h-20 w-20 items-center justify-center rounded-xl gradient-warm text-2xl font-bold text-primary-foreground font-heading">
                  {initials}
                </div>
              )}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-foreground/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-6 w-6 text-primary-foreground" />
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading text-2xl font-bold text-card-foreground">{profile.full_name}</h1>
                <Badge className="gap-1 bg-accent text-accent-foreground">
                  {isSkilled ? "Skilled Worker" : "Job Seeker"}
                </Badge>
                {certificates.length > 0 && (
                  <Badge className="gap-1 bg-primary text-primary-foreground">
                    <Award className="h-3 w-3" /> Verified
                  </Badge>
                )}
              </div>
              {profile.location && (
                <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                  <MapPin className="h-3.5 w-3.5" /> {profile.location}
                </p>
              )}
              <p className="text-sm text-card-foreground mt-2 leading-relaxed">{profile.bio || "No bio yet."}</p>
            </div>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            <Button size="sm" variant="outline" onClick={() => setEditing(!editing)}>
              <Settings className="h-4 w-4 mr-1" /> {editing ? "Cancel" : "Edit Profile"}
            </Button>
            {isSkilled && (
              <>
                <Button size="sm" variant="outline" onClick={handleSharePortfolio}>
                  <Share2 className="h-4 w-4 mr-1" /> Share My Portfolio
                </Button>
                {certificates.length > 0 && (
                  <Link to={`/certificate/${certificates[0].certificate_id}`}>
                    <Button size="sm" variant="outline">
                      <FileText className="h-4 w-4 mr-1" /> View My Certificate
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>
        </div>

        {/* Edit form */}
        {editing && (
          <div className="rounded-xl border bg-card p-5 shadow-card space-y-4 animate-fade-in">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider">Edit Profile</h2>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input value={formData.full_name} onChange={(e) => setFormData({ ...formData, full_name: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="e.g. Westlands, Nairobi" />
            </div>
            <div className="space-y-2">
              <Label>Bio</Label>
              <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Tell clients about yourself and your services..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label>Profile Photo</Label>
              <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                <Upload className="h-4 w-4 mr-1" /> {uploading ? "Uploading..." : "Upload Photo"}
              </Button>
            </div>
            <Button onClick={handleSaveProfile}>Save Changes</Button>
          </div>
        )}

        {/* Skills */}
        <div className="rounded-xl border bg-card p-5 shadow-card animate-fade-in">
          <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">My Skills</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {skills.map((skill) => (
              <Badge key={skill.id} variant="secondary" className="px-3 py-1.5 text-sm gap-1.5">
                <ShieldCheck className="h-3 w-3 text-accent" />
                {skill.skill_name}
                <button onClick={() => handleDeleteSkill(skill.id)} className="ml-1 hover:text-destructive">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {skills.length === 0 && <p className="text-sm text-muted-foreground">No skills added yet.</p>}
          </div>
          <div className="flex gap-2">
            <Input placeholder="Add a skill (e.g. Plumbing)" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddSkill()} className="flex-1" />
            <Button size="sm" onClick={handleAddSkill}><Plus className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Portfolio (skilled only) */}
        {isSkilled && (
          <div className="rounded-xl border bg-card p-5 shadow-card animate-fade-in">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Work Portfolio</h2>
            {portfolioItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border mb-2">
                <div>
                  <p className="font-medium text-card-foreground">{item.title}</p>
                  {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                </div>
                <button onClick={() => handleDeletePortfolio(item.id)} className="text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            <div className="space-y-2 mt-3">
              <Input placeholder="Work title (e.g. Kitchen Renovation)" value={newPortfolioTitle} onChange={(e) => setNewPortfolioTitle(e.target.value)} />
              <Input placeholder="Description (optional)" value={newPortfolioDesc} onChange={(e) => setNewPortfolioDesc(e.target.value)} />
              <Button size="sm" onClick={handleAddPortfolio}><Plus className="h-4 w-4 mr-1" /> Add Work</Button>
            </div>
          </div>
        )}

        {/* Certificates (skilled only) */}
        {isSkilled && (
          <div className="rounded-xl border bg-card p-5 shadow-card animate-fade-in">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Digital Certificates</h2>
            {certificates.map((cert) => (
              <div key={cert.id} className="flex items-center justify-between p-3 rounded-lg border mb-2">
                <Link to={`/certificate/${cert.certificate_id}`} className="flex-1">
                  <p className="font-medium text-card-foreground">{cert.skill_category}</p>
                  <p className="text-xs text-muted-foreground">ID: {cert.certificate_id} · {new Date(cert.issued_date).toLocaleDateString()}</p>
                </Link>
                <Button size="sm" variant="ghost" onClick={() => handleShareCertificate(cert.certificate_id)}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <div className="flex gap-2 mt-3">
              <Input placeholder="Skill category (e.g. Plumbing)" value={newSkillCategory} onChange={(e) => setNewSkillCategory(e.target.value)} className="flex-1" />
              <Button size="sm" onClick={handleStartCertification}>
                <Award className="h-4 w-4 mr-1" /> Get Certified
              </Button>
            </div>
          </div>
        )}

        {/* Reviews */}
        {isSkilled && (
          <div className="rounded-xl border bg-card p-5 shadow-card animate-fade-in">
            <h2 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">My Reviews</h2>
            <ReviewSection workerId={user!.id} readOnly />
          </div>
        )}
      </div>

      {/* Quiz Modal */}
      {quizCategory && (
        <SkillQuizModal
          skillCategory={quizCategory}
          onPass={handleQuizPass}
          onClose={() => setQuizCategory(null)}
        />
      )}
    </div>
  );
};

export default Profile;
