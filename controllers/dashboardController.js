import Problem from '../models/Problem.js';
import Application from '../models/Application.js';

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    // ─── Basic counts ───────────────────────────────────────
    const totalSolved = await Problem.countDocuments({ user: userId, status: 'Solved' });
    const totalProblems = await Problem.countDocuments({ user: userId });
    const totalApplications = await Application.countDocuments({ user: userId });
    const totalInterviews = await Application.countDocuments({ user: userId, status: 'Interview' });
    const totalOffers = await Application.countDocuments({ user: userId, status: 'Selected' });
    const totalRejected = await Application.countDocuments({ user: userId, status: 'Rejected' });

    // ─── Success rate ────────────────────────────────────────
    const successRate = totalApplications > 0
      ? ((totalOffers / totalApplications) * 100).toFixed(1)
      : 0;

    // ─── Problems by topic (for bar chart) ──────────────────
    const problemsByTopic = await Problem.aggregate([
      { $match: { user: userId, status: 'Solved' } },
      { $group: { _id: '$topic', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    // ─── Problems by difficulty (for donut chart) ────────────
    const problemsByDifficulty = await Problem.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$difficulty', count: { $sum: 1 } } }
    ]);

    // ─── Application status breakdown (for pie chart) ────────
    const applicationsByStatus = await Application.aggregate([
      { $match: { user: userId } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // ─── Recent activity ─────────────────────────────────────
    const recentProblems = await Problem.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('title topic difficulty status createdAt');

    const recentApplications = await Application.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('company role status appliedDate');

    // ─── Weekly progress ─────────────────────────────────────
    const now = new Date();

    const startOfThisWeek = new Date(now);
    startOfThisWeek.setDate(now.getDate() - now.getDay());
    startOfThisWeek.setHours(0, 0, 0, 0);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);

    const problemsThisWeek = await Problem.countDocuments({
      user: userId,
      status: 'Solved',
      createdAt: { $gte: startOfThisWeek }
    });

    const problemsLastWeek = await Problem.countDocuments({
      user: userId,
      status: 'Solved',
      createdAt: { $gte: startOfLastWeek, $lt: startOfThisWeek }
    });

    const applicationsThisWeek = await Application.countDocuments({
      user: userId,
      createdAt: { $gte: startOfThisWeek }
    });

    const applicationsLastWeek = await Application.countDocuments({
      user: userId,
      createdAt: { $gte: startOfLastWeek, $lt: startOfThisWeek }
    });

    // ─── Send everything in one response ─────────────────────
    res.json({
      overview: {
        totalSolved,
        totalProblems,
        totalApplications,
        totalInterviews,
        totalOffers,
        totalRejected,
        successRate
      },
      charts: {
        problemsByTopic: problemsByTopic.map((t) => ({
          topic: t._id,
          count: t.count
        })),
        problemsByDifficulty: problemsByDifficulty.map((d) => ({
          difficulty: d._id,
          count: d.count
        })),
        applicationsByStatus: applicationsByStatus.map((a) => ({
          status: a._id,
          count: a.count
        }))
      },
      recentActivity: {
        recentProblems,
        recentApplications
      },
      weeklyProgress: {
        problemsThisWeek,
        problemsLastWeek,
        applicationsThisWeek,
        applicationsLastWeek
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};