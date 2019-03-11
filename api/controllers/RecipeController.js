/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// module.exports = {
//   createRecipe: (req, res) => {
//     console.log(req.body);
//     // Find the user that's adding a tutorial
//     Category.findOne({
//         id: req.session.subCategoryId
//     }).exec((err, foundCategory) => {
//       if (err) return res.negotiate;
//       if (!foundCategory) return res.notFound();

//       Recipe.create({
//         name: req.param('name'),
//         description: req.param('description'),
//         ingredients: req.param('ingredients'),
//             owner: foundCategory.id,
//       })
//       .exec((err, createdRecipe) => {
//         if (err) return res.negotiate(err);

//         return res.json({id: createdRecipe.id});
//       });
//     });
//   },

// };

module.exports = {
  createRecipe: (req, res) => {
    console.log('body');
    console.log(req.body);
    // Find the user that's adding a tutorial
    SubCategory.findOne({
        id: req.param('ownerId')
    })
    .exec((err, foundSubCategory) => {
      console.log('subCat');
      console.log(foundSubCategory);
      if (err) return res.negotiate;
      if (!foundSubCategory) return res.notFound();
      Recipe.create({
        name: req.param('name'),
        description: req.param('description'),
        ingredients: req.param('ingredients'),
        steps: req.param('steps'),
        photo: req.param('photo'),
        tag: req.param('tag'),
        owner: foundSubCategory.id,
      })
      .exec((err, createdRecipe) => {
        console.log('createdRecipe')
        console.log(createdRecipe);
        if (err) return (err);
        return res.json({id: createdRecipe.id});
      });
    });
  },

};

