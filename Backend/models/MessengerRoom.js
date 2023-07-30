const mongoose = require('mongoose');

const roomsSchema = new mongoose.Schema(
    {
        members: {
          type: Array,
        },
      },
      { timestamps: true }
);

module.exports = mongoose.model('Room', roomsSchema);