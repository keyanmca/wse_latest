function getOverlays( id ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "wowza_transcoder/ajax",
        dataType: 'json',
        data: {
            overlay_id: id,
            acao: "get_overlay"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            console.log( data );
            $( 'input[name=id][type=hidden]' ).val( data.id );
            $( '#name' ).attr( 'readonly', true ).val( data.name );

            $( '#location_width' ).val( data.location_width );
        }
    } );
}

function delete_overlay( id, obj ) {

    // Recupera a linha da tabela
    var linha = obj.parents( 'tr' );
    // recupera o Id do Overlay
    var IdOverlay = id;
    // Recupera o Nome do Plano
    var NomeOverlay = $.trim( linha.children( "td:nth-child(2)" ).text() );

    bootbox.confirm( traducoes[idioma].confirmacao_remover_overlay + ' ' + NomeOverlay, function ( result ) {

        if ( result === true ) {
            $.ajax( {
                type: 'POST',
                url: getUrl() + "wowza_transcoder/ajax",
                data: {
                    id: IdOverlay,
                    acao: "deletar_overlay"
                },
                error: function ( error ) {
                    console.log( error );
                },
                success: function ( data ) {
                    console.log( data );
                    if ( data ) {
                        toastr.success( 'Overlay deletado com Sucesso!' );
                        linha.remove();
                    } else {
                        toastr.warning( traducoes[idioma].erro_deletar_overlay );
                    }
                }
            } );
        }
    } );
}
