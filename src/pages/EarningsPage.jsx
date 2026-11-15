import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { fetchEarnings, fetchMonths } from "../api/portal.api";

function money(n) {
  return `Rs ${Number(n || 0).toLocaleString()}`;
}

export default function EarningsPage() {
  const [months, setMonths] = useState([]);
  const [month, setMonth] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const list = await fetchMonths();
        if (!alive) return;
        setMonths(list);
        setMonth(list[0] || new Date().toISOString().slice(0, 7));
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
        const res = await fetchEarnings(month);
        if (alive) setData(res);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load earnings");
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
        <h2 className="text-lg font-semibold">Earnings</h2>
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

      {loading || !data ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <>
          <section className="rounded-2xl bg-white border border-black/5 p-4 shadow-sm">
            <p className="text-xs text-gray-500">Commission total</p>
            <p className="mt-1 text-2xl font-bold">
              {money(data.commissionTotal)}
            </p>
          </section>

          {data.employmentType === "salaried" && data.payroll && (
            <section className="rounded-2xl bg-white border border-black/5 p-4 shadow-sm space-y-1">
              <p className="text-sm font-semibold">Salary / payroll</p>
              <p className="text-sm text-gray-600">
                Base {money(data.payroll.baseSalary)}
              </p>
              {data.payroll.status === "available" ? (
                <>
                  <p className="text-sm text-gray-600">
                    Present {data.payroll.presentDays} · Absent{" "}
                    {data.payroll.absentDays} · Late {data.payroll.lateDays}
                  </p>
                  <p className="text-lg font-bold">
                    Net {money(data.payroll.netPay)}
                  </p>
                </>
              ) : (
                <p className="text-sm text-amber-700">
                  Payroll not generated for this month yet
                </p>
              )}
            </section>
          )}

          <ul className="space-y-2">
            {(data.lines || []).map((line) => (
              <li
                key={line.id}
                className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm text-sm"
              >
                <div className="flex justify-between gap-2">
                  <span className="font-medium">{line.memberName}</span>
                  <span className="font-semibold">
                    {money(line.commissionAmount)}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Fee {money(line.trainingFee)} · {line.commissionPercent}%
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
