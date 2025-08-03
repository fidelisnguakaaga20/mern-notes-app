import { useEffect, useState } from "react";
import api from "../lib/axios"; // ✅ Default import, not named
import { useAuth } from "../context/AuthContext"; // ✅ Fix: useAuth, not useAuthContext

export default function useFetchNotes(page = 1, limit = 6, search = "") {
  const { user, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNotes = async () => {
      if (authLoading) return;
      setLoading(true);
      setError("");

      try {
        const res = await api.get(`/notes`, {
          params: { page, limit, search },
        });

        setNotes(res.data.notes);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchNotes();
  }, [user, authLoading, page, limit, search]);

  return { notes, loading, error, totalPages };
}
