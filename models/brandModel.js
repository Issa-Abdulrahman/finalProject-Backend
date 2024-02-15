import mongoose from "mongoose";
import slugify from "slugify";

const categoryModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    slug: {
        type: String,
        unique: true,
      },
  },
  { timestamps: true }
);

categoryModelSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const CategorySchema = mongoose.model("CategorySchema", categoryModelSchema);

export default CategorySchema;
