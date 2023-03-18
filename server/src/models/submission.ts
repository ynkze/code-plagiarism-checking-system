import mongoose from 'mongoose';
const { Schema } = mongoose;

const SubmissionSchema = new Schema({
  title:  String,
  author: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
}, {
  collection: 'submissions'
});

const SubmissionModel = mongoose.model('submissions', SubmissionSchema);

export default SubmissionModel;