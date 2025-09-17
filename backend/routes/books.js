const express = require('express');
const router = express.Router();
const Books = require('../models/Books');
const { auth } = require('../middleware/auth');
const { adminOnly } = require('../middleware/role');
const { Op } = require('sequelize');

// Get all books with pagination
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';
    const offset = (page - 1) * limit;

    let whereCondition = {};
    if (search) {
      whereCondition = {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { author: { [Op.like]: `%${search}%` } },
          { publisher: { [Op.like]: `%${search}%` } },
          { genre: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const { count, rows: books } = await Books.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      books,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: count,
        itemsPerPage: limit,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get all books (доступно всем авторизованным)
router.get('/', auth, async (req, res) => {
  try {
    const books = await Books.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get book by ID (доступно всем авторизованным)
router.get('/:id', auth, async (req, res) => {
  try {
    const book = await Books.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create book (только админ)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const book = await Books.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update book (только админ)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const book = await Books.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }
    await book.update(req.body);
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete book (только админ)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const book = await Books.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Книга не найдена' });
    }
    await book.destroy();
    res.json({ message: 'Книга удалена' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;