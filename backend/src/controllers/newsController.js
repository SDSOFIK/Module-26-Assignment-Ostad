const News = require('../models/News');

const getAllNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate('author', 'name photo')
      .sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopNews = async (req, res) => {
  try {
    const news = await News.find()
      .populate('author', 'name photo')
      .sort({ createdAt: -1 })
      .limit(6);
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id).populate(
      'author',
      'name photo'
    );
    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyNews = async (req, res) => {
  try {
    const news = await News.find({ author: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createNews = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const news = await News.create({
      title,
      description,
      image,
      category,
      author: req.user._id,
    });

    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updated = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      return res.status(404).json({ message: 'News not found' });
    }

    if (news.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await news.deleteOne();
    res.json({ message: 'News deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllNews,
  getTopNews,
  getNewsById,
  getMyNews,
  createNews,
  updateNews,
  deleteNews,
};