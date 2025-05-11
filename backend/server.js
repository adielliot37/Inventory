const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  vendorName: String,
  vendorNumber: String,
  date: { type: Date, default: Date.now },
}, { versionKey: false });

ProductSchema.index({ name: 1, vendorName: 1 }, { unique: true });

const Product = mongoose.model('Product', ProductSchema);

app.post('/add', async (req, res) => {
  try {
    const existing = await Product.findOne({
      name: req.body.name,
      vendorName: req.body.vendorName,
    });
    if (existing) return res.status(400).json({ message: 'This vendor has already added this product.' });

    const product = new Product(req.body);
    await product.save();
    res.send(product);
  } catch (err) {
    res.status(500).json({ message: 'Error saving product.', error: err });
  }
});

app.get('/search', async (req, res) => {
  const q = req.query.q;
  const regex = new RegExp(q, 'i');
  const products = await Product.find({
    $or: [{ name: regex }, { vendorName: regex }],
  });
  res.send(products);
});


app.get('/suggestions/:term', async (req, res) => {
  const term = req.params.term;
  const nameRegex = new RegExp(term, 'i');
  const vendorRegex = new RegExp('^' + term, 'i');
  const names = await Product.find({ name: nameRegex }).distinct('name');
  const vendors = await Product.find({ vendorName: vendorRegex }).distinct('vendorName');
  res.send({ names, vendors });
});

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.put('/update/:id', async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, { price: req.body.price }, { new: true });
    res.send(updated);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(4000, () => console.log('Server on http://localhost:4000'));