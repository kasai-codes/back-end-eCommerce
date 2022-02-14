const router = require("express").Router();
// use object destructuring to import our two models by name
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// find all categories
router.get("/", async (req, res) => {
  try {
		const categories = await Category.findAll({
			include: [{ model: Product }],
		});
		res.status(200).json(categories);
	} catch (error) {
		res.status(500).json(error);
	}
});

// Find category by id
router.get("/:id", async (req, res) => {
  try {
		const category = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!category) {
			res.status(404).json({ message: 'No category found with that id!' });
			return;
		}
		res.status(200).json(category);
	} catch (error) {
		res.status(500).json(error);
	}
});

// create a new category
router.post("/", async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (error) {
    req.status(400).json(error);
  }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No category with this id!" });
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: "No category found with that id!" });
      return;
    }

    res.status(200).json(categoryData);
  } catch (error) {
    res.st;
  }
});

module.exports = router;
