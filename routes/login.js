/*
* GET home page.
*/


exports.index = function(req, res){
    var message = '';
    console.log(req.method);
    console.log(req.body);
    if(req.body){
      console.log(req.body);
    }
  res.render('index',{message: message});
};
