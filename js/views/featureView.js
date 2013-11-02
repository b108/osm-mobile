define(['Backbone', 'jQuery', 'EventBroker', 'models/change', 'models/changesCollectionItem', 'tpl!templates/buildingDescription.html', 'Underscore'], function(Backbone, $, EventBroker, ChangeModel, changesCollection, buildingDescription, _) {
    return Backbone.View.extend({
        interests: {
            'map:featureSelect': 'mapSelectFeatureSignalHandler'
        },
        my_feature: null,
        collection: changesCollection,
        events: {
            'change #buildingLevels': 'buildingLevelsChangeHandler',
            'change #buildingType': 'buildingTypeChangeHandler',
            'change #houseNumber': 'houseNumberChangeHandler'
        },
        initialize: function() {
            EventBroker.register(this);
        },
        render: function() {
            this._rendering = true;

            this.$('.buildingDescription').html( buildingDescription({
                feature: this.my_feature,
                _: _
            }) );

            this.$('#buildingLevels').val( this.getProperty('building:levels') || '' ).change();
            this.$('#buildingType').val( this.getProperty('building') || '' ).change();

            this.$('#houseNumber').val( this.getProperty('addr:housenumber') ).change();

            delete this._rendering;
        },
        getProperty: function(property) {
            var feature = this.my_feature;

            var value = feature.properties[ property ];

            var id = this.getFeatureId(feature);

            var change = this.collection.get(id);

            if (change) {
                var changedValue = change.getProperty( property );

                if (changedValue) value = changedValue;
            }

            return value;
        },
        getFeatureId: function(feature) {
            if (!feature) feature = this.my_feature;

            return feature.properties['osm:id'];
        },
        mapSelectFeatureSignalHandler: function(feature) {
            this.my_feature = feature;

            this.setElement('#feature-page-content');
            this.render();

            $.mobile.changePage('#feature-page', {transition: 'slide'});
        },
        setChange: function(tagName, value) {
            var changeId = this.getFeatureId();
            var isNewChange = false;

            var change = this.collection.get( changeId ) || (function() {
                    var newChange = new ChangeModel()
                    newChange.set({id: changeId});

                    isNewChange = true;

                    return newChange;
            })();

            change.setProperty(tagName, value == "" ? null : value);

            if (isNewChange) {
                this.collection.add( change );
            }
        },
        selectChangeHandler: function(e, tagName) {
            if (this._rendering) return;

            var value = $(e.target).val();
            this.setChange(tagName, value);
        },
        buildingLevelsChangeHandler: function(e) {
            this.selectChangeHandler(e, 'building:levels');
        },
        buildingTypeChangeHandler: function(e) {
            this.selectChangeHandler(e, 'building');
        },
        houseNumberChangeHandler: function(e) {
            if (this._rendering) return;

            var value = $(e.target).val();
            this.setChange('addr:housenumber', value);
        }
    });
});

