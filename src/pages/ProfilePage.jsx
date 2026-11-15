import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../auth/AuthContext";
import { fetchMe } from "../api/portal.api";
import ProfileCard from "../components/ProfileCard";

export default function ProfilePage() {
  const { trainer, setTrainerProfile } = useAuth();
  const [loading, setLoading] = useState(!trainer);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetchMe();
        if (!alive) return;
        if (res?.trainer) setTrainerProfile(res.trainer);
      } catch (err) {
        toast.error(err?.response?.data?.message || "Failed to load profile");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [setTrainerProfile]);

  if (loading && !trainer) {
    return <p className="text-sm text-gray-500 py-8 text-center">Loading…</p>;
  }

  return (
    <div className="space-y-4">
      <ProfileCard trainer={trainer} />
    </div>
  );
}
