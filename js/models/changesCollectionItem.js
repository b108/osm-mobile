define(['models/changesCollection'], function(ChangesCollection) {
    var collection = new ChangesCollection();

    collection.fetch();

    collection.on('all', collection.save, collection);

    //delete localStorage.changes;

    return collection;
});
