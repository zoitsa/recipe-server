/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createRecipe: (req, res) => {
    // Find the user that's adding a tutorial
    Category.findOne({
        id: req.session.categoryId
    }).exec((err, foundCategory) => {
      if (err) return res.negotiate;
      if (!foundCategory) return res.notFound();

      Recipe.create({
        name: req.param('name'),
        description: req.param('description'),
        ingredients: req.param('ingredients'),
            owner: foundCategory.id,
      })
      .exec((err, createdRecipe) => {
        if (err) return res.negotiate(err);

        return res.json({id: createdRecipe.id});
      });
    });
  },

};

