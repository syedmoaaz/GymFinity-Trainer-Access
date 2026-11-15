import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchHome } from "../api/portal.api";

function money(n) {
  return `Rs ${Number(n || 0).toLocaleString()}`;
}

export default function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetchHome();
        if (alive) setData(res);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load home");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading…</p>;
  }

  if (!data) return null;

  const sessions = data.todayAttendance?.sessions || [];

  return (
    <div className="space-y-4">
      <section className="rounded-2xl bg-white border border-black/5 p-4 shadow-sm">
        <p className="text-xs text-gray-500">This month · {data.month}</p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Stat label="Clients" value={data.clientCount} />
          <Stat label="Commission" value={money(data.commissionTotal)} />
        </div>
      </section>

      {data.employmentType === "salaried" ? (
        <section className="rounded-2xl bg-white border border-black/5 p-4 shadow-sm">
          <p className="text-sm font-semibold">Salary</p>
          {data.payroll?.status === "available" ? (
            <p className="mt-2 text-2xl font-bold text-[#17252a]">
              {money(data.payroll.netPay)}
              <span className="ml-2 text-xs font-medium text-gray-500">
                net this month
              </span>
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-600">
              Base {money(data.payroll?.baseSalary ?? data.salary)} — payroll
              not generated yet
            </p>
          )}
        </section>
      ) : (
        <section className="rounded-2xl bg-white border border-black/5 p-4 shadow-sm">
          <p className="text-sm font-semibold">Freelance</p>
          <p className="mt-1 text-sm text-gray-600">
            Pay is commission-based (no fixed salary).
          </p>
        </section>
      )}

      {data.features?.attendance && (
        <section className="rounded-2xl bg-white border border-black/5 p-4 shadow-sm">
          <p className="text-sm font-semibold">Today&apos;s clock</p>
          {sessions.length ? (
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              {sessions.map((s, i) => (
                <li key={i}>
                  In {fmtTime(s.checkInAt)}
                  {s.checkOutAt ? ` · Out ${fmtTime(s.checkOutAt)}` : ""}
                  {s.isLate ? " · late" : ""}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-500">No punch yet today</p>
          )}
        </section>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-[#f3f7f7] px-3 py-3">
      <p className="text-[11px] uppercase tracking-wide text-gray-500">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-[#17252a]">{value}</p>
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
