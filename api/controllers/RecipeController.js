/**
 * RecipeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://8777fe0fb1e24e9db7da38c8dfc07d48@sentry.io/1439651' });

module.exports = {
  test: function(req, res) {
    Sentry.captureException('yolo')
    res.ok('ok');
  },

  createRecipe: async function (req, res) {
    console.log('req.body: ', req.body)
    try {
      const steps = req.param('steps');

      const subCategory = await SubCategory.findOne({
        id: req.param('ownerId')
      })

      const uploadPromise = new Promise((resolve, reject) => {
        req.file('photo').upload({
          adapter: require('skipper-better-s3'),
          key: process.env.KEY,
          secret: process.env.SECRET,
          bucket: process.env.BUCKET,
          s3params: { ACL: 'public-read'}
        },function (err, filesUploaded) {
          if (err) {
            console.log('error in upload: ', err)
            reject(err)
          }
          resolve(filesUploaded[0])
        })
      })

      const result = await uploadPromise

      const recipe = await Recipe.create({
        name: req.param('name'),
        description: req.param('description'),
        ingredients: req.param('ingredients'),
        photo: result.extra.Location,
        tag: req.param('tag'),
        owner: subCategory.id
      }).fetch()

      const stepArray = steps.map((step) => {
        return {
          recipeStep: step,
          recipeOwner: recipe.id
        }
      })

      const createdSteps = await Steps.createEach(stepArray).fetch();

      res.send({ recipe, createdSteps })

    } catch (err) {
      Sentry.captureException(err)
      res.send(err);
    }
  }
};

