/**
 * Função ao escolher o Servidor no Form de Planos
 * @param val
 */
function idServidor( val ) {
    $.ajax( {
        type: "POST",
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            val: val,
            acao: "getPluginServidor"
        },
        error: function( error ) {
            console.log( error );
        },
        success: function( data ) {
            var html = "";
            if ( data ) {
                html += '<option value="">' + traducoes[idioma].selecione + '...</option>';
                $.each( data.PLUGINS, function( chave, valor ) {
                    if ( data.PLUGINS.length == 1 && valor.PLUGIN_ID == 4 ) {
                        shoutcast_function( valor.PLUGIN_ID );
                    }
                    html += '<option value="' + valor.PLUGIN_ID + '">' + valor.PLUGIN_NOME + '</option>';
                } );
            } else {
                html += '<option value="">' + traducoes[idioma].selecione + '...</option>';
            }
            $( '.plugins' ).html( "" ).html( html ).show();
            $( "#id_plugin" ).select2( {
                placeholder: traducoes[idioma].selecione + "...",
                allowClear: true
            } );
            $( '#aplicacoes_id_plugin' ).select2( {
                placeholder: traducoes[idioma].selecione + "...",
                allowClear: true
            } );
            $( '#select2_sample_modal_2' ).select2( {
                placeholder: traducoes[idioma].selecione_servidor + "...",
                allowClear: true
            } );
        }
    } );
}