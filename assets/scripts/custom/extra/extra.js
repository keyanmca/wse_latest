$( document ).ready( function() {
    $( '.visualizar_arquivo' ).click( function() {
        $.ajax( {
            type: 'POST',
            url: getUrl() + "extra/ajax",
            data: {
                local: $( '#local' ).val()
            },
            success: function( data ) {
                $( '#content_file' ).html( '<textarea disabled="" class="form-control input-block-level" style="height: 400px" >' + data + '</textarea>' );
            }
        } )
    } );

    $( '.tree_1' ).jstree( {
        "core": {
            "themes": {
                "responsive": false
            }
        },
        "types": {
            "default": {
                "icon": "fa fa-folder icon-warning icon-lg"
            },
            "file": {
                "icon": "fa fa-file icon-success icon-lg"
            }
        },
        "plugins": ["types"]
    } );

    $( '.tree_1' ).on( 'changed.jstree', function( e, data ) {
        var Aterior = $( '#local' ).val();
        var i, j, r = [];
        for ( i = 0, j = data.selected.length; i < j; i++ ) {
            r.push( data.instance.get_node( data.selected[i] ).text );
        }
        $( '#local' ).val( ( Aterior ) ? Aterior + '/' + trim( r.join( ', ' ) ) : trim( r.join( ', ' ) ) );
    } ).jstree();

    function trim( str ) {
        return str.replace( /^\s+|\s+$/g, "" );
    }

} );

