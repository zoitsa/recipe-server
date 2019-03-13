/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createRecipe: (req, res) => {
    const steps = req.param('steps');
    console.log(steps)
    // console.log('body');
    // console.log(req.body);
    // Find the user that's adding a tutorial
    SubCategory.findOne({
        id: req.param('ownerId')
    })
    .exec((err, foundSubCategory) => {
      // console.log('subCat');
      // console.log(foundSubCategory);
      if (err) return res.negotiate;
      if (!foundSubCategory) return res.notFound();
      Recipe.create({
        name: req.param('name'),
        description: req.param('description'),
        ingredients: req.param('ingredients'),
        // steps: req.param('steps'),
        photo: req.param('photo'),
        tag: req.param('tag'),
        owner: foundSubCategory.id,
      })
      .fetch()
      .exec((err, createdRecipe) => {
        console.log('createdRecipe', createdRecipe);
        if (err) return (err);

        for (let i = 0; i < steps.length; i++) {
          Steps.create({
            recipeStep: steps[i],
            recipeOwner: createdRecipe.id
          })
          .fetch()
          .exec((err, step) => {
            if (err) return (err);
          })
        }
        return res.json(200);

      });
    });
  },

};

