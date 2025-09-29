export default function StatCard({ icon, label, value, tone = "accent" }) {
  return (
    <div className="box-shadow bg-background p-4">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 flex items-center justify-center border-2 border-foreground ${
            tone === "success" ? "bg-success" : "bg-accent"
          }`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="text-2xl font-bold !leading-none">{value}</p>
        </div>
      </div>
    </div>
  );
}
