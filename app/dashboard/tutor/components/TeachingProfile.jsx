export default function TeachingProfile({
  loading,
  error,
  profile,
  userName,
  labels,
}) {
  const {
    SUBJECT_LABELS,
    EXPERIENCE_LABELS,
    AVAILABILITY_LABELS,
    CONTACT_LABELS,
  } = labels;
  return (
    <div className="lg:col-span-2 box-shadow bg-background p-6">
      <h2 className="text-xl font-bold mb-4">Your Teaching Profile</h2>
      {loading ? (
        <p className="text-muted">Loading your teaching profile…</p>
      ) : error ? (
        <p className="text-primary">{error}</p>
      ) : profile?.data ? (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-muted">Name</span>
            <span className="font-medium">{profile.data.name || userName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">School</span>
            <span className="font-medium">{profile.data.school || "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Experience</span>
            <span className="font-medium">
              {EXPERIENCE_LABELS[profile.data.experienceLevel] || "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Availability</span>
            <span className="font-medium">
              {AVAILABILITY_LABELS[profile.data.availability] || "—"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Contact</span>
            <span className="font-medium">
              {CONTACT_LABELS[profile.data.contactMethod] || "—"}
            </span>
          </div>
          <div>
            <div className="text-muted mb-1">Subjects</div>
            <div className="flex flex-wrap gap-2">
              {(profile.data.subjects || []).length > 0 ? (
                profile.data.subjects.map((s, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-sm border-2 border-foreground bg-accent font-medium"
                  >
                    {SUBJECT_LABELS[s] || s}
                  </span>
                ))
              ) : (
                <span className="text-muted">No subjects listed</span>
              )}
            </div>
          </div>
          {profile.data.intro ? (
            <div>
              <div className="text-muted mb-1">Introduction</div>
              <p className="text-sm">{profile.data.intro}</p>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="text-muted">
          We couldn&apos;t find your profile details. Try reloading.
        </p>
      )}
    </div>
  );
}
