import Problem from '../models/Problem.js';

// GET /api/problems
export const getProblems = async (req, res) => {
  try {
    const { topic, status, search } = req.query;

    const filter = { user: req.user._id };

    if (topic) filter.topic = topic;
    if (status) filter.status = status;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const problems = await Problem.find(filter).sort({ createdAt: -1 });

    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/problems
export const createProblem = async (req, res) => {
  try {
    const { title, topic, difficulty, status, link } = req.body;

    if (!title || !topic) {
      return res.status(400).json({ message: 'Title and topic are required' });
    }

    const problem = await Problem.create({
      user: req.user._id,
      title,
      topic,
      difficulty,
      status,
      link
    });

    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/problems/:id
export const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to edit this problem' });
    }

    const { title, topic, difficulty, status, link } = req.body;

    problem.title = title ?? problem.title;
    problem.topic = topic ?? problem.topic;
    problem.difficulty = difficulty ?? problem.difficulty;
    problem.status = status ?? problem.status;
    problem.link = link ?? problem.link;

    const updated = await problem.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/problems/:id
export const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    if (problem.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to delete this problem' });
    }

    await problem.deleteOne();

    res.json({ message: 'Problem deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};