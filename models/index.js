const models = {
    User: require('./user'),
    Order: require('./order'),
    Item: require('./item'),
    Order_Item: require('./order_item')
};

Object.keys(models).forEach(function (modelName) {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
});

module.exports = models;