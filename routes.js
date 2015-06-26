module.exports = function(app){
    //Homepage
    app.get('/', require('./views/index').init);
    //Submission Page
    app.get('/submit', require('./views/submit/index').init);

    app.get('/wallet', require('./views/wallet/index').init);

    app.get('/info', require('./views/info/index').init);
    //Submission Page
    app.get('/interval', require('./views/interval/index').init);

    app.get('/trigger', require('./views/trigger/index').init);
}
