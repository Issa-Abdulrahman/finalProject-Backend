import mongoose from "mongoose";
import slugify from "slugify";

const categoryModelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
          },
          slug: {
            type: String,
            unique: true,
          },
    },
    { timestamps: true }
)

categoryModelSchema.pre("save", function (next){
    this.slug = slugify(this.name, {lower: true});
    next();
})

const Category = mongoose.model('Category', categoryModelSchema);

export default Category;