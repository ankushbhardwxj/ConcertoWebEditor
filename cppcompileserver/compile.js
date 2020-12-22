const express = require('express');
const router = express.Router();
const execFile = require('child_process').execFile;
const {cpp} = require('compile-run');
router.post('/:user', async (req, res, next) => {
  const {input, lang, source} = req.body;
  // convert base64 to ascii
  let code = new Buffer(source, 'base64');
  code = code.toString('ascii');
  // compile this code and get outputs
  const compiler = 'g++';
  const out = '-o'
  const inputs = input;
  const outfile = 'code.out';
  try {
    let result = await cpp.runSource(code, {stdin: inputs});
    res.send(result)
  }
  catch(e){
    console.log('error in compilation' + e);
  }
  // send the outputs
  //res.send(code);
})
module.exports = router;
