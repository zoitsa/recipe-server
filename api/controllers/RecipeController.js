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
    try {
      let steps = req.param('steps') ? req.param('steps') : null;
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

          if(filesUploaded.length === 0) {
            resolve(null)
          }
          resolve(filesUploaded[0])
        })
      })
  
      const result = await uploadPromise

      const recipe = await Recipe.create({
        name: req.param('name'),
        description: req.param('description'),
        ingredients: req.param('ingredients'),
        photo: result !== null ? JSON.stringify(new Array(result.extra.Location)) : '',
        tag: req.param('tag'),
        owner: subCategory.id
      }).fetch()

      if (steps) {
        if (typeof(steps) === 'string') {
          let temp = steps;
          steps = new Array;
          steps.push(temp)
        }
        const stepArray = steps.map((step) => {
          return {
            recipeStep: step,
            recipeOwner: recipe.id
          }
        })

        const createdSteps = stepArray.length === 1 ? await Steps.create(stepArray[0]).fetch() : await Steps.createEach(stepArray).fetch();

        return res.send({ recipe, createdSteps })
      }

      res.send(recipe)

    } catch (err) {
      Sentry.captureException(err)
      res.send(err);
    }
  },

  photo: async function (req, res) {
    var promiseArray = []

    for (let i=0; i<4; i++) {
      let uploadPromise = new Promise((resolve, reject) => {
        req.file('photo'+i).upload({
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
          if(filesUploaded.length === 0) {
            resolve()
          } else {
            resolve(filesUploaded[0].extra.Location)
          }
        })
      })
      promiseArray.push(uploadPromise)
    }

    try {

      let result = await Promise.all(promiseArray)

      const filterNull = result.filter(photo => photo !== undefined)

      let existing = await Recipe.find({ id: req.param('recipeId')})

      if(existing[0].photo !== '') {
        let existingPhoto = JSON.parse(existing[0].photo)
        existingPhoto.forEach(item => filterNull.push(item))
      }

      let recipeUpdated = await Recipe.update({
        id: req.param('recipeId')
      }).set({
        photo: JSON.stringify(filterNull)
      }).fetch()

      res.send(recipeUpdated)
    
    } catch(err) {
      console.log(err)
      res.send(err)
    }

  }
};

