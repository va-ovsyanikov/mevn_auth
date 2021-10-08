module.exports = mainRoutes = function(app) {
    app.use(require('./login'));
    app.use(require('./register'));
    app.use(require('./record'));
  }