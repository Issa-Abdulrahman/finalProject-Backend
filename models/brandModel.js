import mongoose from "mongoose";
import slugify from "slugify";

const brandModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    categoryID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: false,
    }],
    slug: {
        type: String,
        unique: true,
      },
  },
  { timestamps: true }
);

brandModelSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const BrandSchema = mongoose.model("BrandSchema", brandModelSchema);

export default BrandSchema;
