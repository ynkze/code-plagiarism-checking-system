import mongoose from 'mongoose';
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  number: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  sample: String,
  week: {
    type: Number,
    required: true
  },
  test_case: Array<any>,
  expected_output: Array<string>
  },
  {
    collection: 'questions'
  });

const QuestionModel = mongoose.model('questions', QuestionSchema);

export default QuestionModel;