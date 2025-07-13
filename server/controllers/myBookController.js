const MyBook = require('../models/MyBook');

exports.getMyBooks = async (req, res) => {
  try {
    const myBooks = await MyBook.find({ userId: req.user.id }).populate('bookId');
    res.status(200).json(myBooks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user books' });
  }
};

exports.addBookToUser = async (req, res) => {
  const { bookId } = req.params;
  try {
    const exists = await MyBook.findOne({ userId: req.user.id, bookId });
    if (exists) return res.status(400).json({ error: 'Book already in list' });

    const myBook = await MyBook.create({ userId: req.user.id, bookId });
    res.status(201).json(myBook);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add book' });
  }
};

exports.updateStatus = async (req, res) => {
  const { bookId } = req.params;
  const { status } = req.body;
  try {
    const updated = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { status },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

exports.updateRating = async (req, res) => {
  const { bookId } = req.params;
  const { rating } = req.body;
  try {
    const updated = await MyBook.findOneAndUpdate(
      { userId: req.user.id, bookId },
      { rating },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update rating' });
  }
};
