exports.signup = function (req, res) {
   message = '';
   if (req.method == "POST") {
      var post = req.body;
      var username = post.username;
      var password = post.password;
      var fname = post.first_name;
      var lname = post.last_name;
      var mobile = post.mobile;
      var img = post.img;

      if (username && password && fname && lname && mobile) {
         var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mobile`,`username`, `password`,`img`) VALUES ('" + fname + "','" + lname + "','" + mobile + "','" + username + "','" + password + "','" + img + "')";


         var query = db.query(sql, function (err, result) {
            message = "Succesfully! Your account has been created";
            if (err) { console.log(err); } else console.log("Данные добавлены");
            res.render('signup.ejs', { message: message });
         });
      }else{
         res.render('signup.ejs', { message: "заполнить все данные"});
      }
   } else {
      res.render('signup');
   }
};



exports.login = function (req, res) {
   var message = '';
   var sess = req.session;

   if (req.method == "POST") {
      var post = req.body;
      if(post.username&&post.password){
         var password = post.password;
         var username = post.username;
   
         var sql = "SELECT id, first_name, last_name, username FROM `users` WHERE `username`='" + username + "' and password = '" + password + "'";
         db.query(sql, function (err, results) {
            if (results.length) {
               req.session.userId = results[0].id;
               req.session.user = results[0];
               req.session.img = results[0];
               console.log(results[0].id);
               res.redirect('/home/dashboard');
            }
            else {
               message = 'You have entered invalid username or password.';
               res.render('index.ejs', { message: message });
            }
   
         });
      }else{
         message = 'You have entered invalid username or password.';
         res.render('index.ejs', { message: message });
      }
      
   } else {
      res.render('index.ejs', { message: "заполнить все поля" });
   }

};


exports.dashboard = function (req, res, next) {

   var user = req.session.user,
      userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";

   db.query(sql, function (err, results) {
      res.render('dashboard.ejs', { data: results });
   });
};

exports.profile = function (req, res) {

   var userId = req.session.userId;
   if (userId == null) {
      res.redirect("/login");
      return;
   }

   var sql = "SELECT * FROM `users` WHERE `id`='" + userId + "'";
   db.query(sql, function (err, result) {
      res.render('profile.ejs', { data: result });
   });
};

exports.logout = function (req, res) {
   req.session.destroy(function (err) {
      res.redirect("/login");
   })
};