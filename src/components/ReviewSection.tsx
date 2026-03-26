import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer_name?: string;
}

interface Props {
  workerId: string;
  readOnly?: boolean;
}

const ReviewSection = ({ workerId, readOnly = false }: Props) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("worker_id", workerId)
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      const reviewerIds = [...new Set(data.map((r: any) => r.reviewer_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", reviewerIds);

      const nameMap: Record<string, string> = {};
      profiles?.forEach((p: any) => { nameMap[p.user_id] = p.full_name; });

      setReviews(data.map((r: any) => ({ ...r, reviewer_name: nameMap[r.reviewer_id] || "Anonymous" })));
    } else {
      setReviews([]);
    }
  };

  useEffect(() => { fetchReviews(); }, [workerId]);

  const handleSubmit = async () => {
    if (!user) { toast({ title: "Please log in to leave a review", variant: "destructive" }); return; }
    if (user.id === workerId) { toast({ title: "You can't review yourself", variant: "destructive" }); return; }
    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      worker_id: workerId,
      reviewer_id: user.id,
      rating,
      comment: comment.trim(),
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Review submitted!" });
      setComment("");
      setRating(5);
      fetchReviews();
    }
    setSubmitting(false);
  };

  const avg = reviews.length > 0 ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;

  return (
    <div className="space-y-4">
      {/* Average */}
      {reviews.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className={`h-5 w-5 ${s <= Math.round(avg) ? "text-primary fill-primary" : "text-muted"}`} />
            ))}
          </div>
          <span className="font-heading font-bold text-card-foreground">{avg.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({reviews.length} review{reviews.length !== 1 ? "s" : ""})</span>
        </div>
      )}

      {/* Leave a review */}
      {!readOnly && user && user.id !== workerId && (
        <div className="rounded-lg border p-4 space-y-3">
          <p className="font-heading text-sm font-semibold text-card-foreground">Leave a Review</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button key={s} onClick={() => setRating(s)}>
                <Star className={`h-6 w-6 transition-colors ${s <= rating ? "text-primary fill-primary" : "text-muted hover:text-primary/50"}`} />
              </button>
            ))}
          </div>
          <Input placeholder="Write your review..." value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button size="sm" onClick={handleSubmit} disabled={submitting}>Submit Review</Button>
        </div>
      )}

      {/* Reviews list */}
      {reviews.map((r) => (
        <div key={r.id} className="rounded-lg border p-3 space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-medium text-sm text-card-foreground">{r.reviewer_name}</span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className={`h-3.5 w-3.5 ${s <= r.rating ? "text-primary fill-primary" : "text-muted"}`} />
              ))}
            </div>
          </div>
          {r.comment && <p className="text-sm text-muted-foreground">{r.comment}</p>}
          <p className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</p>
        </div>
      ))}

      {reviews.length === 0 && <p className="text-sm text-muted-foreground">No reviews yet.</p>}
    </div>
  );
};

export default ReviewSection;
