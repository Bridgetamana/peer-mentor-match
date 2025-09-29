"use client";

import { useState } from "react";
import { EmptyState } from "./EmptyState";

export default function AvailabilityEditor({
  profile,
  loading,
  labels,
  onUpdated,
}) {
  const [saving, setSaving] = useState(false);
  const availability = profile?.data?.availability || "";

  async function handleSave(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nextAvailability = form.get("availability");
    if (!nextAvailability) return;
    try {
      setSaving(true);
      const nextData = {
        ...(profile?.data || {}),
        availability: nextAvailability,
        role: "tutor",
      };
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nextData),
      });
      if (!res.ok) throw new Error("Failed to update availability");
      // Locally reflect the change
      onUpdated?.({ ...profile, data: nextData, completed: true });
    } catch (e) {
      console.error(e);
      alert("Could not save availability. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Availability</h2>
      <div className="box-shadow bg-background p-6">
        {loading ? (
          <EmptyState title="Loading profile…" />
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="p-4 border-2 border-foreground">
              <label className="block text-sm text-muted mb-2">
                Select availability
              </label>
              <select
                name="availability"
                defaultValue={availability}
                className="w-full p-3 bg-background border-2 border-foreground"
              >
                <option value="">Choose availability</option>
                <option value="mornings">{labels.mornings}</option>
                <option value="afternoons">{labels.afternoons}</option>
                <option value="evenings">{labels.evenings}</option>
                <option value="weekends">{labels.weekends}</option>
                <option value="flexible">{labels.flexible}</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving ? "Saving…" : "Save Availability"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
