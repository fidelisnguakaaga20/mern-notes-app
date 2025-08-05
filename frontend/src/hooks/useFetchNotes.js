// frontend/src/hooks/useFetchNotes.js
import { useEffect, useState } from "react";
import api from "../lib/api"; // ✅ Axios instance with interceptor
import { waitForAuthReady } from "../context/AuthContext"; // ✅ Ensure Firebase is ready
import { getAuth } from "firebase/auth"; // ✅ NEW

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
        await waitForAuthReady(); // ✅ Ensure Firebase is ready

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setError("User not authenticated");
          return;
        }

        const token = await user.getIdToken(); // ✅ Ensure token is refreshed

        const res = await api.get("/notes", {
          params: { page, limit },
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Attach token explicitly
          },
        });

        setNotes(res.data.notes);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error("Error fetching notes:", err);
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [page, limit]);

  return { notes, loading, error, totalPages };
}
