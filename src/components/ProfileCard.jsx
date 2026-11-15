import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function formatJoinDate(value) {
  if (!value) return "—";
  try {
    return new Date(value)
      .toLocaleDateString("en-GB")
      .replace(/\//g, "-");
  } catch {
    return "—";
  }
}

export default function ProfileCard({ trainer, compact = false }) {
  if (!trainer) return null;

  const isFreelance = trainer.employmentType === "freelance";

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white border border-black/5 shadow-sm overflow-hidden"
    >
      <div className="bg-gradient-to-br from-[#3aafa9] to-[#2d8a7d] px-4 pt-5 pb-10 sm:px-5 sm:pt-6 sm:pb-12">
        <p className="text-[11px] uppercase tracking-wide text-white/80">
          {trainer.gym?.name || "GymFinity"}
        </p>
        <p className="text-white/90 text-xs mt-0.5">Your profile</p>
      </div>

      <div className="px-4 sm:px-5 -mt-8 sm:-mt-10 pb-4 sm:pb-5">
        <div className="flex flex-col items-center text-center">
          {trainer.imageUrl ? (
            <img
              src={trainer.imageUrl}
              alt={trainer.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white shadow-lg bg-white"
            />
          ) : (
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-lg bg-[#3aafa9] text-white flex items-center justify-center text-5xl">
              <FaUserCircle />
            </div>
          )}

          <h2 className="mt-3 text-xl sm:text-2xl font-bold text-[#1c323a] break-words px-2">
            {trainer.name}
          </h2>
          <p className="text-sm text-gray-500 break-words px-2">
            {trainer.designation || "Trainer"}
          </p>
          <span
            className={`mt-2 inline-block text-[11px] font-semibold px-2.5 py-1 rounded-md ${
              isFreelance
                ? "bg-[#3aafa9]/15 text-[#2b8a85]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isFreelance
              ? `Freelance${
                  trainer.commissionDefaultPercent != null
                    ? ` · ${trainer.commissionDefaultPercent}%`
                    : ""
                }`
              : "Salaried"}
          </span>
        </div>

        {!compact && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm">
            <Field label="Phone" value={trainer.phone} />
            <Field label="Age" value={trainer.age} />
            <Field label="Experience" value={trainer.experience} />
            <Field label="Timing" value={trainer.timing} />
            <Field label="Qualification" value={trainer.qualification} />
            <Field label="Joining" value={formatJoinDate(trainer.joiningDate)} />
            {!isFreelance && (
              <Field
                label="Salary"
                value={
                  trainer.salary != null
                    ? `Rs ${Number(trainer.salary).toLocaleString()}`
                    : "—"
                }
              />
            )}
            <Field label="Address" value={trainer.address} wide />
            {trainer.notes ? (
              <Field label="Notes" value={trainer.notes} wide />
            ) : null}
          </div>
        )}
      </div>
    </motion.section>
  );
}

function Field({ label, value, wide }) {
  return (
    <div
      className={`rounded-xl bg-[#f5f7f8] px-3 py-2.5 text-left ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      <p className="text-[10px] uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="mt-0.5 font-medium text-[#1c323a] break-words whitespace-pre-wrap">
        {value || "—"}
      </p>
    </div>
  );
}
