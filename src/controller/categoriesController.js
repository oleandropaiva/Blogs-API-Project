const categoriesService = require('../services/categoriesService');

const addCategories = async (req, res) => {
  try {
  const name = req.body;
  const dataCategories = await categoriesService.addCategories(name);
  if (dataCategories.message) {
    return res.status(400).json(dataCategories);
  }
  return res.status(201).json(dataCategories);
} catch (error) {
  console.log(error);
  return res.status(500).json('Server error');
  } 
};

module.exports = { addCategories };
