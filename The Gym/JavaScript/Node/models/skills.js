const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  title: {
    type: 'string',
    required: true
  },
  link: {
    type: 'string',
    required: false
  },
  icon: {
    type: 'string',
    required: false
  }
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill;