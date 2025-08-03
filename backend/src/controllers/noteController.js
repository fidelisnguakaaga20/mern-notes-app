import Note from "../models/Note.js"; // ✅ correct based on your file

// CREATE NOTE
export const createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user.uid;

    const newNote = await Note.create({ title, content, tags, userId });

    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL NOTES with pagination + search
export const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { page = 1, limit = 6, search = "" } = req.query;

    const query = {
      userId,
      title: { $regex: search, $options: "i" },
    };

    const skip = (page - 1) * limit;

    const notes = await Note.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Note.countDocuments(query);

    res.status(200).json({
      notes,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE NOTE
export const getNoteById = async (req, res) => {
  try {
    const userId = req.user.uid;
    const note = await Note.findOne({ _id: req.params.id, userId });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const userId = req.user.uid;
    const { title, content, tag } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId },
      { title, content, tag },
      { new: true }
    );

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(note);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE NOTE
export const deleteNote = async (req, res) => {
  try {
    const userId = req.user.uid;

    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId,
    });

    if (!note) return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note deleted" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Server error" });
  }
};
