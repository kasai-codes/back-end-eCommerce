const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock", "category_id"],
    },
  })
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
		const tagData = await Tag.findAll({
			include: [{ model: Product, through: ProductTag, as: 'products_with_tag' }],
		});
		res.status(200).json(tagData);
	} catch (error) {
		res.status(500).json(err);
	}
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`

	try {
		const tagData = await Tag.findByPk(req.params.id, {
			include: [{ model: Product, through: ProductTag, as: 'products_with_tag' }],
		});
		if (!tagData) {
			res.status(404).json({ message: 'No tag found with that id!' });
			return;
		}
		res.status(200).json(tagData);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.post("/", (req, res) => {
  // create a new tag
  try {
		const tagData = await Tag.create(req.body);
		res.status(200).json(tagData);
	} catch (error) {
		res.status(400).json(error);
	}
});


router.put("/:id", (req, res) => {
	try {
		const tagData = await Tag.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		if (!tagData) {
			res.status(404).json({ message: 'No tag found with that id!' });
			return;
		}
		res.status(200).json(tagData);
	} catch (error) {
		res.status(500).json(error);
	}
});

router.delete("/:id", (req, res) => {
  try {
		const tagData = await Tag.destroy({
			where: {
				id: req.params.id,
			},
		});

		if (!tagData) {
			res.status(404).json({ message: 'No tags found with that id!' });
			return;
		}
		res.status(200).json(tagData);
	} catch (error) {
		res.status(500).json(error);
	}

	res.status(200).json(tagData);
});

module.exports = router;
