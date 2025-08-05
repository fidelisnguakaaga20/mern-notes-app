// UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { title, content, tags } = req.body; // ✅ match with schema and createNote

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId },
      { title, content, tags }, // ✅ use `tags`, not `tag`
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Server error" });
  }
};
