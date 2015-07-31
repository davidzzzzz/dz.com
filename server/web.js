var express = require('express');
var path = require('path');
var distFolder =  path.resolve(__dirname, '../dist');
var app = express();
app.set('port', (process.env.PORT || 3000));
try {
    app.use(express.static(distFolder, {extensions : ['html'], maxAge: '120 minutes'}));
    app.use(function(err, req, res, next){
        res.redirect('/index');
    });
    app.listen(app.get('port'));
} catch(e) {
}