// frontend/src/hooks/useFetchNotes.js
import { useEffect, useState } from "react";
import api from "../lib/api"; // ✅ Axios instance with interceptor
import { waitForAuthReady } from "../context/AuthContext"; // ✅ Ensure Firebase is ready

export default function useFetchNotes(page, limit) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      setError("");

      try {
        await waitForAuthReady(); // ✅ Wait for Firebase auth to be ready

        const res = await api.get("/notes", {
          params: { page, limit },
        });

        setNotes(res.data.notes);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to fetch notes"); // ✅ This was showing on your UI
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [page, limit]);

  return { notes, loading, error, totalPages };
}
