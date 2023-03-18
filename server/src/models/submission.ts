import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  title:  String,
  week: {
    type: Number,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  }
}, {
  collection: 'submissions'
});

const SubmissionModel = mongoose.model('submissions', SubmissionSchema);

export default SubmissionModel;