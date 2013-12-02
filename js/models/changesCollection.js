define(['Backbone', 'models/change', 'jQuery'], function(Backbone, ChangeModel, $) {
    return Backbone.Collection.extend({
        model: ChangeModel,
        initialize: function() {
        },
        osm_server: 'http://www.openstreetmap.org',
        osm_read_server: 'http://www.openstreetmap.org',
        saveSimple: function(osmLogin, osmPassword) {
            if (!this.length) return false;

            var ths = this;
            this.trigger('saveStart');

            $.ajax({
                beforeSend: function(xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa(osmLogin + ':' + osmPassword));
                },
                url: ths.osm_server + '/api/0.6/changeset/create',
                type: 'PUT',
                success: function(changeset_id) {
                    //console.log('Success! ', arguments);

                    var index = 0;

                    var successCount = 0;

                    var saveNext = function() {
                        setTimeout(function() {
                            var change = ths.at(index);

                            if (!change) {
                                if (successCount) this.trigger('savedSimple');
                                return;
                            }

                            $.ajax({
                                url: ths.osm_read_server + '/api/0.6/' + change.getOsmType() + '/' + change.getOsmIdInt(),
                                success: function(osm_xml) {
                                    var $element_xml = $(osm_xml).children();

                                    $element_xml.children().attr('changeset', changeset_id);
                                    $element_xml.children().removeAttr('user');
                                    $element_xml.children().removeAttr('uid');
                                    //$element_xml.children().removeAttr('timestamp');

                                    var element_xml_saved_html = $element_xml.html();

                                    _.chain( change.attributes ).keys().each(function(tagName) {
                                        if (tagName == 'id') return;

                                        var value = change.attributes[ tagName ];

                                        if (value === null) {
                                            $element_xml.find('tag[k="' + tagName + '"]').remove();
                                        } else {
                                            var $tagElement = $element_xml.find('tag[k="' + tagName + '"]');
                                            if ($tagElement.length) {
                                                $tagElement.attr('v', value);
                                            } else {
                                                //$tagElement = $('<tag k="' + tagName + '" v="' + value + '" />');
                                                //$tagElement.appendTo( $element_xml );
                                                var html = $element_xml.html();

                                                html = html.replace(/<\/way>/m, ('<tag k="' + tagName + '" v="' + value + '" />') + '</way>');

                                                $element_xml.html( html );
                                            }
                                        }
                                    });

                                    if ($element_xml.html() != element_xml_saved_html) {
                                        $.ajax({
                                            url: ths.osm_server + '/api/0.6/changeset/' + changeset_id + '/upload',
                                            beforeSend: function(xhr) {
                                                xhr.setRequestHeader("Authorization", "Basic " + btoa(osmLogin + ':' + osmPassword));
                                            },
                                            type: 'POST',
                                            data: '<osmChange version="0.3" generator="Osmosis">' + '<modify>' + $element_xml.html() + '</modify>' + '</osmChange>',
                                            success: function() {
                                                ths.remove( change );
                                                successCount++;
                                                saveNext();
                                            },
                                            error: function() {
                                                index++;
                                                saveNext();
                                            }
                                        });
                                    } else {
                                        ths.remove( change );
                                        saveNext();
                                    }
                                },
                                error: function() {
                                    index++;
                                    saveNext();
                                }
                            });
                        }, 10);
                    };

                    saveNext();
                },
                error: function(error) {
                    alert('OSM Server: ' + (error.responseText || error));
                },
                data: '<osm><changeset>' + '<tag k="created_by" v="OSM Mobile" />' + '<tag k="comment" v="building changes" />' + '</changeset></osm>'
            });
        },
        save: function() {
            (window.localStorage || {}).changes = JSON.stringify( this.toJSON() );
        },
        fetch: function() {
            var changes = (window.localStorage || {}).changes;
            if (changes) {
                this.add( JSON.parse(changes) );
            }
        }
    });
});
