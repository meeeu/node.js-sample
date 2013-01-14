
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'PresElec.com your World Presidential Election Labatory.' });
};