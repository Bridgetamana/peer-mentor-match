import { Badge } from "@progress/kendo-react-indicators";
import { Label } from "@progress/kendo-react-labels";

export default function StatCard({ icon, label, value, tone = "accent" }) {
  return (
    <div className="box-shadow bg-background p-4">
      <div className="flex items-center gap-4">
        <Badge
          className={`!w-10 !h-10 !flex !items-center !justify-center !border-2 !border-foreground ${
            tone === "success" ? "!bg-success" : "!bg-accent"
          }`}
          text=""
        >
          {icon}
        </Badge>
        <div>
          <Label className="!text-sm !text-muted !block">{label}</Label>
          <p className="text-2xl font-bold !leading-none">{value}</p>
        </div>
      </div>
    </div>
  );
}
