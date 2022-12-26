'use strict';

const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      // field: 'post_id',
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      references: { model: 'BlogPosts', key: 'id' },
      type: DataTypes.INTEGER
    },
    categoryId: {
      // field: 'category_id',
      allowNull: false,
      primaryKey: true,
      foreignKey: true,
      references: { model: 'Categories', key: 'id' },
      type: DataTypes.INTEGER,
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories',
  })
  PostCategory.associate = (models) => {
    // models.BlogPost.belongsToMany(models.Category, {
      models.Category.belongsToMany(models.BlogPost,
    {
      foreignKey: 'postId', //
      as: 'blogposts',//
      otherKey: 'categoryId',//
      through: PostCategory,
    })
    models.BlogPost.belongsToMany(models.Category,{
      foreignKey: 'categoryId',
      as: 'categories',
      otherKey: 'postId',
      through: PostCategory,
    })
  }
  return PostCategory;
};

module.exports = PostCategory;

// Será validado que o modelo em 'PostCategory.js', 
// através do(s) modelos(s) de nome(s) 'Category; BlogPost', 
// define a associação 'belongsToMany' 
// respectivamente, com o(s) modelo(s) de nome(s) 'BlogPost, Category' (38 ms)