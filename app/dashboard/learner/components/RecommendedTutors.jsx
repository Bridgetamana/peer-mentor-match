export default function RecommendedTutors({
  tutors,
  loading,
  onSelect,
  subjectLabels = {},
  experienceLabels = {},
  availabilityLabels = {},
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loading ? (
        <div className="box-shadow bg-background p-6 col-span-full text-center">
          Loading tutors…
        </div>
      ) : tutors.length === 0 ? (
        <div className="box-shadow bg-background p-6 col-span-full text-center">
          <div className="font-medium">No tutors yet</div>
          <div className="text-muted text-sm">
            When tutors sign up, they&apos;ll appear here.
          </div>
        </div>
      ) : (
        tutors.map((t) => {
          const data = t.data || {};
          const displayName = data.name || "Tutor";
          const initials = displayName
            .split(" ")
            .map((n) => n[0])
            .join("");
          const exp =
            experienceLabels[data.experienceLevel] ||
            data.experienceLevel ||
            "—";
          const subjects = Array.isArray(data.subjects) ? data.subjects : [];
          const availability =
            availabilityLabels[data.availability] || data.availability || "—";
          return (
            <div key={t.userId} className="box-shadow bg-background p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-success border-2 border-foreground flex items-center justify-center">
                  <span className="font-bold">{initials}</span>
                </div>
                <div>
                  <h3 className="font-bold">{displayName}</h3>
                  <p className="text-sm text-muted">{exp}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {subjects.length > 0 ? (
                    subjects.map((subject) => (
                      <span
                        key={subject}
                        className="px-2 py-1 bg-accent text-foreground text-sm border-2 border-foreground"
                      >
                        {subjectLabels[subject] || subject}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted">
                      No subjects listed
                    </span>
                  )}
                </div>
              </div>

              {data.intro && (
                <p className="text-muted text-sm mb-4">{data.intro}</p>
              )}

              <div className="text-sm text-muted mb-4">
                Availability:{" "}
                <span className="font-medium text-foreground">
                  {availability}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => onSelect?.(t)} className="btn-primary w-full">Contact</button>
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch('/api/match/request', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ tutorId: t.userId, subject: data.subjects?.[0] || null })
                      })
                      if (!res.ok) throw new Error('Failed to send request')
                      alert('Request sent!')
                    } catch (e) {
                      alert('Could not send request.')
                    }
                  }}
                  className="box-shadow bg-accent"
                >
                  Request Match
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
