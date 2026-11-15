import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchClients, fetchMonths } from "../api/portal.api";

function money(n) {
  return `Rs ${Number(n || 0).toLocaleString()}`;
}

export default function ClientsPage() {
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await fetchMonths();
        if (!alive) return;
        setMonths(list);
        const initial =
          list[0] || new Date().toISOString().slice(0, 7);
        setMonth(initial);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load months");
        setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!month) return;
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchClients(month);
        if (alive) setClients(res.clients || []);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load clients");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [month]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">Clients</h2>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-2 py-1.5 text-sm"
        >
          {(months.length ? months : [month]).map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : clients.length === 0 ? (
        <p className="text-sm text-gray-500">No clients for this month.</p>
      ) : (
        <ul className="space-y-2">
          {clients.map((c) => (
            <li
              key={c.id}
              className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-[#17252a]">{c.name}</p>
                  <p className="text-xs text-gray-500">
                    {c.memberCode || "—"} · {c.phone || "—"}
                  </p>
                </div>
                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                    c.feesStatus === "paid"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {c.feesStatus}
                </span>
              </div>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs text-gray-600">
                <span>Fee {money(c.trainingFee)}</span>
                <span>{c.commissionPercent}%</span>
                <span className="font-semibold text-[#17252a]">
                  {money(c.commissionAmount)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
