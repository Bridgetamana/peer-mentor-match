export default function BookingView({ tutor, onBack }) {
  const data = tutor?.data || {};
  const displayName = data.name || "Tutor";
  const subjects = Array.isArray(data.subjects) ? data.subjects : [];

  return (
    <div className="min-h-screen bg-background">
      <header className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="box-shadow bg-accent hover:bg-accent/80 !p-2 font-medium"
            >
              ← Back
            </button>
            <div className="text-2xl font-bold">Tutor Details</div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        <div className="box-shadow bg-background p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-success border-2 border-foreground flex items-center justify-center">
              <span className="text-foreground font-bold text-xl">
                {displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold">{displayName}</h3>
              {data.school && <p className="text-muted">{data.school}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-sm text-muted">Experience</div>
              <div className="font-medium capitalize">
                {data.experienceLevel || "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted">Availability</div>
              <div className="font-medium capitalize">
                {data.availability || "—"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted">Preferred Contact</div>
              <div className="font-medium">{data.contactMethod || "—"}</div>
            </div>
            <div>
              <div className="text-sm text-muted">Subjects</div>
              <div className="font-medium">
                {subjects.length > 0 ? subjects.join(", ") : "—"}
              </div>
            </div>
          </div>

          {data.intro && (
            <div className="mb-2">
              <div className="text-sm text-muted">Introduction</div>
              <p className="text-muted">{data.intro}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
