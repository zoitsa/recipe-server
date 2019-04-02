/**
 * SubCategoryController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 
module.exports = {
    getSubCategoryDetails: function (req, res) {
        // Find the recipes for the subcategory with the ownerId
        Recipe.find({
            owner: req.param('ownerId')
        })
        //
        .populate('steps')
        .exec((err, foundRecipes) => {
            if (err) return res.negotiate;
            if (!foundRecipes) return res.notFound();

            return res.json(foundRecipes);
        })
      }
    
    

};

