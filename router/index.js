const items = require('./routers/items');

module.exports = function(app) {
    app.use('/items', items);
}