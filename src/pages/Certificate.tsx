import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Award, ShieldCheck, ArrowLeft, Share2, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CertData {
  certificate_id: string;
  skill_category: string;
  issued_date: string;
  profiles: { full_name: string; username: string | null } | null;
}

const Certificate = () => {
  const { certId } = useParams();
  const { toast } = useToast();
  const [cert, setCert] = useState<CertData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCert = async () => {
      const { data } = await supabase
        .from("certificates")
        .select("certificate_id, skill_category, issued_date, user_id")
        .eq("certificate_id", certId)
        .single();

      if (data) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("full_name, username")
          .eq("user_id", data.user_id)
          .single();
        setCert({ ...data, profiles: profile });
      }
      setLoading(false);
    };
    fetchCert();
  }, [certId]);

  const handleShare = () => {
    const url = `${window.location.origin}/certificate/${cert?.certificate_id}`;
    navigator.clipboard.writeText(url);
    toast({ title: "Certificate link copied!" });
  };

  if (loading) {
    return <div className="min-h-screen bg-secondary flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!cert) {
    return (
      <div className="min-h-screen bg-secondary flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Certificate not found</p>
        <Link to="/"><Button variant="outline">Go Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <Button size="sm" variant="outline" onClick={handleShare} className="gap-1.5">
            <Share2 className="h-4 w-4" /> Share Certificate
          </Button>
        </div>

        {/* Certificate - professional design inspired by reference */}
        <div className="relative bg-card rounded-xl overflow-hidden shadow-card-hover">
          {/* Top decorative bar */}
          <div className="h-3 gradient-warm" />

          {/* Blue/gold side borders */}
          <div className="absolute left-0 top-3 bottom-0 w-2 bg-primary/20" />
          <div className="absolute right-0 top-3 bottom-0 w-2 bg-primary/20" />

          <div className="p-8 md:p-12 text-center">
            {/* Corner decorations */}
            <div className="absolute top-6 left-6 w-12 h-12 border-t-4 border-l-4 border-primary/30 rounded-tl-lg" />
            <div className="absolute top-6 right-6 w-12 h-12 border-t-4 border-r-4 border-primary/30 rounded-tr-lg" />
            <div className="absolute bottom-6 left-6 w-12 h-12 border-b-4 border-l-4 border-primary/30 rounded-bl-lg" />
            <div className="absolute bottom-6 right-6 w-12 h-12 border-b-4 border-r-4 border-primary/30 rounded-br-lg" />

            {/* Title */}
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-card-foreground tracking-[0.15em] uppercase">
              Certificate
            </h1>
            <p className="font-heading text-sm text-muted-foreground uppercase tracking-[0.2em] mt-1">
              of Achievement
            </p>

            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2 my-6">
              <div className="h-px w-16 bg-primary/40" />
              <div className="h-2 w-2 rotate-45 bg-primary" />
              <div className="h-3 w-3 rotate-45 bg-primary" />
              <div className="h-2 w-2 rotate-45 bg-primary" />
              <div className="h-px w-16 bg-primary/40" />
            </div>

            <p className="text-sm text-muted-foreground">This certificate is proudly presented to</p>

            {/* Name */}
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-card-foreground mt-3 mb-2" style={{ fontStyle: "italic" }}>
              {cert.profiles?.full_name || "Unknown"}
            </h2>

            <div className="h-px w-48 bg-primary/30 mx-auto my-4" />

            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              For demonstrating verified professional skills and competence in the field of{" "}
              <strong className="text-card-foreground">{cert.skill_category}</strong>, as assessed and certified by the FundiLink platform.
            </p>

            {/* Seal / Badge */}
            <div className="flex justify-center my-8">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full gradient-warm shadow-warm">
                  <Award className="h-10 w-10 text-primary-foreground" />
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-0.5 rounded-full uppercase tracking-wider">
                  Verified
                </div>
              </div>
            </div>

            {/* Signature lines */}
            <div className="grid grid-cols-2 gap-8 mt-8">
              <div>
                <div className="h-px bg-border mb-2" />
                <p className="text-xs text-muted-foreground">FundiLink Platform</p>
              </div>
              <div>
                <div className="h-px bg-border mb-2" />
                <p className="text-xs text-muted-foreground">Authorized Signature</p>
              </div>
            </div>

            {/* Footer details */}
            <div className="border-t border-border pt-4 mt-8 grid grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground">Certificate ID</p>
                <p className="font-mono font-medium text-card-foreground">{cert.certificate_id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Issued Date</p>
                <p className="font-medium text-card-foreground">{new Date(cert.issued_date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Skill</p>
                <p className="font-medium text-card-foreground">{cert.skill_category}</p>
              </div>
            </div>
          </div>

          {/* Bottom decorative bar */}
          <div className="h-3 gradient-warm" />
        </div>
      </div>
    </div>
  );
};

export default Certificate;
