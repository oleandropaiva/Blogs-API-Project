'use strict';

const postCategoriesCreate = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      field: 'post_id',
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      references: { model: 'BlogPosts', key: 'id' },
      type: DataTypes.INTEGER
    },
    categoryId: {
      field: 'category_id',
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      references: { model: 'Categories', key: 'id' },
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    tableName: 'PostCategories',
  })
  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      as: 'categories',
      otherKey: 'categoryId',
      through: PostCategory,
    })
  }
  return PostCategory;
};

module.exports = postCategoriesCreate;