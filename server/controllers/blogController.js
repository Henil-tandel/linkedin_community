const Blog = require('../models/Blog');

exports.saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    const blog = id
      ? await Blog.findByIdAndUpdate(id, { title, content, tags, status: 'draft', updated_at: new Date() }, { new: true })
      : await Blog.create({ user: req.user._id, title, content, tags, status: 'draft' });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.publishBlog = async (req, res) => {
  const { id, title, content, tags } = req.body;
  try {
    const blog = id
      ? await Blog.findByIdAndUpdate(id, { title, content, tags, status: 'published', updated_at: new Date() }, { new: true })
      : await Blog.create({ user: req.user._id, title, content, tags, status: 'published' });

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user._id }).sort({ updated_at: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBlog = async (req, res) => {
  const { title, content, tags, status } = req.body;
  try {
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, status, updated_at: new Date() },
      { new: true }
    );
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
