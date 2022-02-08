// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');


Reader.hasOne(LibraryCard, {
  foreignKey: 'reader_id',
  onDelete: 'CASCADE',
});

LibraryCard.belongsTo(Reader, {
  foreignKey: 'reader_id',
});


LibraryCard.hasMany(Books, {
  foreignKey: '_id',
});

Books.belongsTo(Reader, {
  foreignKey: 'reader_id',
});



// Products belongsTo Category

// Categories have many Products

// Products belongToMany Tags (through ProductTag)

// Tags belongToMany Products (through ProductTag)

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
