import mongoose from 'mongoose';
const { Schema } = mongoose;

const CodeSchema = new Schema({
  title:  String,
  author: String,
  code:   String,
});

const CodeModel = mongoose.model('Code', CodeSchema);

export default CodeModel;