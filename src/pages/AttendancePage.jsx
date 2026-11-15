import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchAttendance } from "../api/portal.api";

export default function AttendancePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetchAttendance();
        if (alive) setData(res);
      } catch (err) {
        toast.error(
          err?.response?.data?.message || "Failed to load attendance"
        );
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
        <h2 className="text-lg font-semibold">Attendance</h2>
        <p className="mt-2 text-sm text-gray-500">
          Clock attendance is not enabled at your gym.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Attendance</h2>
      {(data.rows || []).length === 0 ? (
        <p className="text-sm text-gray-500">No clock records yet.</p>
      ) : (
        <ul className="space-y-2">
          {data.rows.map((row) => (
            <li
              key={row.date}
              className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm"
            >
              <p className="text-sm font-medium">{row.date}</p>
              <ul className="mt-1 space-y-0.5 text-xs text-gray-600">
                {(row.sessions || []).map((s, i) => (
                  <li key={i}>
                    In {fmtTime(s.checkInAt)}
                    {s.checkOutAt ? ` · Out ${fmtTime(s.checkOutAt)}` : ""}
                    {s.isLate ? " · late" : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function fmtTime(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleTimeString("en-GB", {
    timeZone: "Asia/Karachi",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
