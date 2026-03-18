const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const auth = require('../middleware/auth');

// @route  GET /api/students
// @desc   Get all students
router.get('/', auth, async (req, res) => {
  try {
    const students = await Student.find({ createdBy: req.user.userId });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  POST /api/students
// @desc   Add a student
router.post('/', auth, async (req, res) => {
  try {
    const { name, email, phone, course, year, cgpa } = req.body;

    const student = new Student({
      name,
      email,
      phone,
      course,
      year,
      cgpa,
      createdBy: req.user.userId,
    });

    await student.save();
    res.status(201).json(student);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  GET /api/students/:id
// @desc   Get single student
router.get('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  PUT /api/students/:id
// @desc   Update a student
router.put('/:id', auth, async (req, res) => {
  try {
    const { name, email, phone, course, year, cgpa } = req.body;

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, course, year, cgpa },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route  DELETE /api/students/:id
// @desc   Delete a student
router.delete('/:id', auth, async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;