const express = require('express');
const router = express.Router();
const Music = require('../models/Music');
const { auth } = require('../middleware/auth');
const { adminOnly } = require('../middleware/role');
const { Op } = require('sequelize');

// Get all music with pagination
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
          { artist: { [Op.like]: `%${search}%` } },
          { album: { [Op.like]: `%${search}%` } },
          { genre: { [Op.like]: `%${search}%` } }
        ]
      };
    }

    const { count, rows: music } = await Music.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [['createdAt', 'DESC']]
    });

    const totalPages = Math.ceil(count / limit);

    res.json({
      music,
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
// Get all music (доступно всем авторизованным)
router.get('/', auth, async (req, res) => {
  try {
    const music = await Music.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(music);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get music by ID (доступно всем авторизованным)
router.get('/:id', auth, async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (!music) {
      return res.status(404).json({ message: 'Музыка не найдена' });
    }
    res.json(music);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create music (только админ)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const music = await Music.create(req.body);
    res.status(201).json(music);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update music (только админ)
router.put('/:id', auth, adminOnly, async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (!music) {
      return res.status(404).json({ message: 'Музыка не найдена' });
    }
    await music.update(req.body);
    res.json(music);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete music (только админ)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (!music) {
      return res.status(404).json({ message: 'Музыка не найдена' });
    }
    await music.destroy();
    res.json({ message: 'Музыка удалена' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;