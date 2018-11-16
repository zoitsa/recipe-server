/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createRecipe: function(req, res) {
    // Find the user that's adding a tutorial
    Category.findOne({
        id: req.session.categoryId
    }).exec(function(err, foundCategory){
      if (err) return res.negotiate;
      if (!foundCategory) return res.notFound();

      Recipe.create({
        name: req.param('name'),
        description: req.param('description'),
        ingredients: req.param('ingredients'),
            owner: foundCategory.id,
      })
      .exec(function(err, createdRecipe){
        if (err) return res.negotiate(err);

        console.dir(res.json({id: createdRecipe.id}));
        return res.json({id: createdRecipe.id});
      });
    });
  },

};

