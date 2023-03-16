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
});

const SubmissionModel = mongoose.model('Submission', SubmissionSchema);

export default SubmissionModel;