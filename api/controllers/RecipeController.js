/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createRecipe: (req, res) => {

    // Find the user that's adding a tutorial
    SubCategory.findOne({
        id: req.param('ownerId')
    })
    .exec((err, foundSubCategory) => {
      if (err) return res.negotiate;
      if (!foundSubCategory) return res.notFound();
      Recipe.create({
        name: req.param('name'),
        description: req.param('description'),
        ingredients: req.param('ingredients'),
        owner: foundSubCategory.id,
      })
      .exec((err, createdRecipe) => {
        if (err) return (err);
        return res.json(createdRecipe);
      });
    });
  },

};

