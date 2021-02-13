const express = require('express');
const router = express.Router();

const Memes = require('../models/Memes');

//get all memes
router.get('/', async (req, res) => {
  try {
    const memes = await Memes.find({}).sort({ created_at: 'desc' }).limit(100);
    res.send(memes);
    // console.log(memes);
    if (!memes) res.status(404).send('No memes are here...');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//Post request for a meme
router.post('/', async (req, res) => {
  try {
    const cap = req.body.caption;
    const mUrl = req.body.url;

    const dupMeme = await Memes.findOne({ caption: cap, url: mUrl });
    if (dupMeme) {
      res.status(409).send('This Meme is already posted');
    } else {
      const newMeme = await Memes.create(req.body);

      const resId = {
        id: newMeme._id,
      };
      res.send(resId);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
    //process.exit(1);
  }
});

//get request for any specific meme
router.get('/:id', async (req, res) => {
  try {
    const meme = await Memes.findOne({
      _id: req.params.id,
    });

    if (!meme) {
      res.status(404).send('Meme Not Found');
    } else {
      res.send(meme);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//patch request to update any meme
router.patch('/:id', async (req, res) => {
  try {
    let meme = await Memes.findById(req.params.id);

    if (!meme) res.status(404).send('This Meme does not exist');
    else {
      meme = await Memes.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      //  console.log(meme);
      res.status(204).send('Meme Posted');
      //console.log(res);
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
