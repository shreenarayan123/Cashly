const express = require('express');
const {Transaction}  = require('../db');
const Account = require('../db');
const { authMiddleware } = require('../middleware');

const router = express.Router();
// Create a new transaction
router.post('/', async (req, res) => {
  try {
    const { senderId, receiverId, amount } = req.body;

    // Create transaction
    const transaction = new Transaction({
      senderId,
      receiverId,
      amount
    });


    await Promise.all([
      transaction.save(),
    ]);

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get transaction history for an account
router.get('/:accountId',authMiddleware, async (req, res) => {
  try {
    const { accountId } = req.params;
    const transactions = await Transaction.find({
      $or: [{ senderId: accountId }, { receiverId: accountId }]
    }).sort({ timestamp: -1 });  // Sort by most recent first

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;