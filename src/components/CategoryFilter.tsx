import { CATEGORIES } from "@/lib/mockData";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Badge
        variant={selected === null ? "default" : "outline"}
        className="cursor-pointer px-3 py-1.5 text-sm transition-colors"
        onClick={() => onSelect(null)}
      >
        All Jobs
      </Badge>
      {CATEGORIES.map((cat) => (
        <Badge
          key={cat}
          variant={selected === cat ? "default" : "outline"}
          className="cursor-pointer px-3 py-1.5 text-sm transition-colors"
          onClick={() => onSelect(selected === cat ? null : cat)}
        >
          {cat}
        </Badge>
      ))}
    </div>
  );
};

export default CategoryFilter;
