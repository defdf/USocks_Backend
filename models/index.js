const models = {
    User: require('./user'),
    Order: require('./order'),
    Item: require('./item'),
    Size: require('./size'),
    Category: require('./category'),
    Item_Size: require('./item_size'),
    Order_Item: require('./order_item')
};

Object.keys(models).forEach(function (modelName) {
    if ("associate" in models[modelName]) {
        models[modelName].associate(models);
    }
});

module.exports = models;