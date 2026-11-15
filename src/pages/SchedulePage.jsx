import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchSchedule } from "../api/portal.api";

const DAY_NAMES = [
  "",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function SchedulePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetchSchedule();
        if (alive) setData(res);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load schedule");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (!data) return null;

  if (!data.enabled) {
    return (
      <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold">Schedule</h2>
        <p className="mt-2 text-sm text-gray-500">
          Member training schedules are not enabled at your gym.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Schedule</h2>
      {(data.schedules || []).length === 0 ? (
        <p className="text-sm text-gray-500">No sessions assigned.</p>
      ) : (
        <ul className="space-y-2">
          {data.schedules.map((s) => (
            <li
              key={s._id}
              className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm"
            >
              <p className="text-sm font-medium">
                {DAY_NAMES[s.dayOfWeek] || `Day ${s.dayOfWeek}`}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {s.startTime} – {s.endTime}
              </p>
              <p className="text-sm mt-1">
                {s.member?.name || "Member"}
                {s.member?.memberCode ? ` · ${s.member.memberCode}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
