define(['Backbone', 'jQuery', 'models/settingsItem'], function(Backbone, $, settingsItem) {
    return Backbone.View.extend({
        events: {
            'change select': 'changeHandler'
        },
        model: settingsItem,
        initialize: function() {
            this.setElement( $('#settings-page') );
            this.model.on('change', this.render, this);

            this.render();
        },
        render: function() {
            if (this._dont_render) return;

            this.$('#base_layer_url').val( this.model.get('base_layer_url') );
        },
        changeHandler: function(event) {
            var el = event.target;

            this._dont_render = true;

            this.model.set( el.id, $(el).val() );

            delete this._dont_render;
        }
    });
});
