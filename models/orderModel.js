import mongoose from 'mongoose';
import slugify from 'slugify';

const orderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed'],
    default: 'pending'
  },
  total_amount: {
    type: Number,
    required: true
  },
  order_number: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    unique: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // This refers to the User model
  },
  order_details: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product' // This refers to the Product model
    },
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }]
}, { timestamps: true });

// Create slug before saving
orderSchema.pre('save', function (next) {
  this.slug = slugify(this.order_number, { lower: true });
  next();
});

// Create model for order
const Order = mongoose.model('Order', orderSchema);

export default Order;
