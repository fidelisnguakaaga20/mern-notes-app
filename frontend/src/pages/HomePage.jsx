import { useState } from "react";
import { Link } from "react-router-dom"; // ✅ required for the create button
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";
import useFetchNotes from "../hooks/useFetchNotes";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const limit = 6;

  const { notes, loading, error, totalPages } = useFetchNotes(page, limit);

  const goToNextPage = () => {
    if (page < totalPages) setPage((prev) => prev + 1);
  };

  const goToPrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Notes</h1>

        {/* ✅ Add Create Note button */}
        <Link
          to="/create"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Note
        </Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && notes.length === 0 && <NotesNotFound />}

      <div className="grid gap-4">
        {notes.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </div>

      {/* Pagination controls */}
      {notes.length > 0 && (
        <div className="flex justify-between mt-6">
          <button
            onClick={goToPrevPage}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-lg">Page {page}</span>

          <button
            onClick={goToNextPage}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
