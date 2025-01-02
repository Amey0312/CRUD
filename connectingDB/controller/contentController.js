const express = require('express');
const service = require('../services/contentService.js');

const router = express.Router();

router.get('/',async  (req, res) => {       //'/' is use to get all the content
  const [response] = await service.getAllContent();
  res.send(response);
});

router.get('/:id',async  (req, res) => {   // ':id'  is use to get a prticular content with id
  const id = req.params.id;
  const [response] = await service.getContentById(id);
  if (response.length === 0) {
    res.status(404).send('Sorry cant find that!');
  } else {
    res.send(response);
  }
});

//create new content
router.post('/',async  (req, res) => {       // create the content
  await service.createContent(req.body);
  res.send("created sucessfully");
});

// update the content record
router.put('/:id', async (req,res) =>{
  const response = await service.updateContent(req.body, req.params.id);
  res.send(response);
})

router.delete('/:id',async  (req, res) => {     // this is use to delete a particular item from the content with the id
  const id = req.params.id;
  const row = await service.deleteContentById(id);
  if (row) {
    res.status(404).send('Sorry cant find that!');
  } else {
    res.send('Content deleted successfully');
  }
});


module.exports = router;