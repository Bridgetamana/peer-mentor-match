export default function LearningProfile({ loading, profile }) {
  return (
    <div className="box-shadow bg-background p-6">
      {loading ? (
        <div>Loading your preferences…</div>
      ) : !profile?.data ? (
        <div className="text-muted">
          We couldn&apos;t find your onboarding details yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted">School</div>
            <div className="font-medium">{profile.data.school || "—"}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Subject</div>
            <div className="font-medium capitalize">
              {profile.data.subject || "—"}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted">Specific Topic</div>
            <div className="font-medium">
              {profile.data.specificTopic || "—"}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted">Urgency</div>
            <div className="font-medium">{profile.data.urgency || "—"}</div>
          </div>
          <div>
            <div className="text-sm text-muted">Availability</div>
            <div className="font-medium">
              {profile.data.availability || "—"}
            </div>
          </div>
          <div>
            <div className="text-sm text-muted">Preferred Contact</div>
            <div className="font-medium">
              {profile.data.contactMethod || "—"}
            </div>
          </div>
          <div className="sm:col-span-2">
            <div className="text-sm text-muted">Learning Goal</div>
            <div className="font-medium">
              {profile.data.learningGoal || "—"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
