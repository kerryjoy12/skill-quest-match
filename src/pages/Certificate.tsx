import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Award, ShieldCheck, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface CertData {
  certificate_id: string;
  skill_category: string;
  issued_date: string;
  profiles: {
    full_name: string;
    username: string | null;
  } | null;
}

const Certificate = () => {
  const { certId } = useParams();
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

        setCert({
          ...data,
          profiles: profile,
        });
      }
      setLoading(false);
    };
    fetchCert();
  }, [certId]);

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading...</div>;
  }

  if (!cert) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <p className="text-muted-foreground mb-4">Certificate not found</p>
        <Link to="/"><Button variant="outline">Go Home</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>

        {/* Certificate */}
        <div className="relative rounded-2xl border-2 border-primary/30 bg-card p-8 shadow-warm text-center overflow-hidden">
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-primary/40 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-primary/40 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-primary/40 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-primary/40 rounded-br-2xl" />

          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-warm">
              <Award className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>

          <p className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-1">Certificate of Skill Verification</p>
          <h1 className="font-heading text-lg font-bold text-primary mb-6">FundiLink</h1>

          <p className="text-sm text-muted-foreground mb-1">This certifies that</p>
          <h2 className="font-heading text-2xl font-bold text-card-foreground mb-4">{cert.profiles?.full_name || "Unknown"}</h2>

          <p className="text-sm text-muted-foreground mb-1">has demonstrated verified skills in</p>
          <div className="inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 mb-6">
            <ShieldCheck className="h-5 w-5 text-accent" />
            <span className="font-heading text-lg font-bold text-accent">{cert.skill_category}</span>
          </div>

          <div className="border-t border-border pt-4 mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Certificate ID</p>
              <p className="font-mono font-medium text-card-foreground">{cert.certificate_id}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Issued Date</p>
              <p className="font-medium text-card-foreground">{new Date(cert.issued_date).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
