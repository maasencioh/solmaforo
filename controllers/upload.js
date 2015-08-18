exports.index = function(req, res) {
    res.render('upload');
};

exports.upload = function(req, res) {
    console.log(req);
    res.show('<p>in</p>');
};