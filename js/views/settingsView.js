define(['Backbone', 'jQuery', 'models/settingsItem', 'models/changesCollectionItem'], function(Backbone, $, settingsItem, changesCollection) {
    return Backbone.View.extend({
        events: {
            'change #base_layer_url': 'changeHandler',
            'change #auto_close_feature_page': 'booleanSelectChangeHandler',
            'click #goSaveToServer': 'saveToServerClickHandler'
        },
        model: settingsItem,
        initialize: function() {
            this.setElement( $('#settings-page') );
            this.model.on('change', this.render, this);
            changesCollection.on('all', this.render, this);

            /*
            0 && changesCollection.on('savedSimple', function() {
            }, this);
            */

            this.render();
        },
        render: function() {
            if (this._dont_render) return;

            this.$('#base_layer_url').val( this.model.get('base_layer_url') );
            this.$('#auto_close_feature_page').val( this.model.get('auto_close_feature_page') ? 'true' : 'false' );

            if (changesCollection.length) {
                this.$('#saveBlock').show().find('p > em').html( changesCollection.length );
            } else {
                this.$('#saveBlock').hide();
            }
        },
        changeHandler: function(event) {
            var el = event.target;

            this._dont_render = true;

            this.model.set( el.id, $(el).val() );

            delete this._dont_render;
        },
        booleanSelectChangeHandler: function(event) {
            var el = event.target;

            this._dont_render = true;

            var value = $(el).val();

            this.model.set( el.id, value === 'true' );

            delete this._dont_render;
        },
        saveToServerClickHandler: function() {
            changesCollection.saveSimple(
                this.$('#osm_login').val(),
                this.$('#osm_password').val()
            );
        }
    });
});
