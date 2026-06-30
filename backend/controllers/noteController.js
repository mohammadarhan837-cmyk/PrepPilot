import Note from "../models/Note.js";

export const createNote = async (req, res) => {
  const { company, content } = req.body;

  if (!company || !content) {
    return res.status(400).json({
      message: "Company and content are required",
    });
  }

  const note = await Note.create({
    company,
    content,
    user: req.user._id,
  });

  res.status(201).json(note);
};

export const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.json(notes);
};

export const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  note.company = req.body.company || note.company;
  note.content = req.body.content || note.content;

  const updatedNote = await note.save();

  res.status(200).json(updatedNote);
};

export const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      message: "Note not found",
    });
  }

  if (note.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "Not Authorized",
    });
  }

  await note.deleteOne();

  res.status(200).json({
    message: "Note deleted successfully",
  });
};