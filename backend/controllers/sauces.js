const Sauce = require('../models/sauces');

exports.getAllSauces = (req, res, next) => {
  Sauce.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({error: error});
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({
    _id: req.params.id
  })
  .then((sauce) => {
      res.status(200).json(sauce);
    })
  .catch((error) => {
      res.status(404).json({error: error});
    });
};

exports.addSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersliked: [],
    usersDisliked: []
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce ajoutée !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.updateSauce = (req, res, next) => {
  const sauceObject = req.file ?
  {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  } : { ...req.body };
Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.likeManagement = (req, res, next) => {
  const sauceLike = req.body.likes;
  const sauceDislike = req.body.dislikes;
  const likers = req.body.usersliked;
  const dislikers = req.body.usersDisliked;
  const user = req.body.userId;

  Sauce.findOne({_id: req.params.id})
  .then(Sauce => {
    if(sauceLike > 0){
      sauceLike += 1;
      likers.push(user)
    }
    else if(sauceDislike > 0){
      sauceDislike += 1;
      dislikers.push(user);
    }
    else{
      sauceLike = 0;
      sauceDislike = 0;
    }
  })
  .then(() => {
    res.status(200).json({message : 'Vote pris en compte'})
  })
  .catch(
    (error) => {
      res.status(400).json({error: error});
  });
};