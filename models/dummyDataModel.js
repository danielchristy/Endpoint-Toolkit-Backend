const mongoose = require('mongoose')

const dummySchema = mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobCode: { type: String, required: true },
  description: { type: String, required: true },
  wageInformation: {
    hourly: { type: Number, required: true },
    salary: { type: Number, required: true }
},
  location: { type: String, required: true },
  skills: { type: [String], required: true },
  educationOptions: { type: [String], required: true },
  trainingPrograms: { type: [String], required: true },
  toolsAndTechnology: { type: [String], required: true }
});

module.exports = mongoose.model('DummyData', dummySchema);

