import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Categories = mongoose.model("Categories", categorySchema);

export default Categories;
