// models/workflowSequence.js
const mongoose = require('mongoose');

const workflowSequenceSchema = new mongoose.Schema({
  modules: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WorkflowSequence', workflowSequenceSchema);
