/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createRecipe: (req, res) => {
    console.log(req.body);
    // variable for steps posted in body of recipe
    const steps = req.param('steps');


    // Find the subCategory the recipe is associated with
    SubCategory.findOne({
      id: req.param('ownerId')
    })
      .exec((err, foundSubCategory) => {

        if (err) return res.negotiate;
        if (!foundSubCategory) return res.notFound();

        try {

          // upload photo to Amazon Bucket 
          req.file('photo').upload({
            adapter: require('skipper-better-s3'),
            key: process.env.KEY,
            secret: process.env.SECRET,
            bucket: process.env.BUCKET,
            s3params: {
              ACL: 'public-read'
            }}, function(err, filesUploaded) { 
             
              // create the recipe (without steps)
              Recipe.create({
                name: req.param('name'),
                description: req.param('description'),
                ingredients: req.param('ingredients'),
                photo: filesUploaded[0].extra.Location,
                tag: req.param('tag'),
                owner: foundSubCategory.id,
              })
                .fetch()
  
                // take the created recipe and add a steps object using the steps params
                .exec((err, createdRecipe) => {
                  if (err) return (err);
  
                  // Create a steps array with each step from the params and its recipe owner
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
                  return res.status(201).send(createdRecipe);
                });
          }) // upload
        } catch (error) {
          throw error
        }
 
      });
  }, // end

};

