const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags including their associated Product data
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id` and product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: ProductTag,
        attributes: ['product_id', 'tag_id']
      }
    ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message: 'No tags with this id were found'});
      return;
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.updated(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData[0]) {
      res.status(404).json({message: 'No tag with this id was found'});
      return;
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({message: 'No tag found with this id'});
      return;
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;