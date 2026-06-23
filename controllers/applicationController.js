import Application from '../models/Application.js';

// GET /api/applications
export const getApplications = async (req, res) => {
  try {
    const { status, search } = req.query;

    const filter = { user: req.user._id };

    if (status) filter.status = status;
    if (search) filter.company = { $regex: search, $options: 'i' };

    const applications = await Application.find(filter).sort({ appliedDate: -1 });

    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST /api/applications
export const createApplication = async (req, res) => {
  try {
    const { company, role, status, appliedDate } = req.body;

    if (!company || !role) {
      return res.status(400).json({ message: 'Company and role are required' });
    }

    const application = await Application.create({
      user: req.user._id,
      company,
      role,
      status,
      appliedDate
    });

    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT /api/applications/:id
export const updateApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to edit this application' });
    }

    const { company, role, status, appliedDate } = req.body;

    application.company = company ?? application.company;
    application.role = role ?? application.role;
    application.status = status ?? application.status;
    application.appliedDate = appliedDate ?? application.appliedDate;

    const updated = await application.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// DELETE /api/applications/:id
export const deleteApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not allowed to delete this application' });
    }

    await application.deleteOne();

    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};