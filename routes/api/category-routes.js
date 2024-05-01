const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories with their associated Products
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET one category by its `id` value with its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product, attributes: ['id', 'product_name', 'price', 'stock', 'category_id'] }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT to update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    });

    if (!updatedCategory[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Category updated successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json({ message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;