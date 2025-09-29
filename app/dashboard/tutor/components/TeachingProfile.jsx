export default function TeachingProfile({ loading, error, profile }) {
  return (
    <div className="lg:col-span-2 box-shadow bg-background p-6">
      <h2 className="text-xl font-bold mb-4">Your Teaching Bio</h2>
      {loading ? (
        <p className="text-muted">Loading your bio…</p>
      ) : error ? (
        <p className="text-primary">{error}</p>
      ) : profile?.data?.intro ? (
        <p className="text-sm leading-relaxed">{profile.data.intro}</p>
      ) : (
        <p className="text-muted">
          No bio yet. Add a short intro so learners can get to know you.
        </p>
      )}
    </div>
  );
}
