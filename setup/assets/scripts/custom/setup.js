function configuracaoFTP( ftp ) {

    if ( ftp == '0' ) {
        $( '.dados_ftp_porta' ).slideUp();
    } else {
        $( '.dados_ftp_porta' ).slideDown();
    }

    if ( ftp !== 'cPanel' ) {
        $( '.dados_ftp' ).slideUp();
    } else {
        $( '.dados_ftp' ).slideDown();
    }
}

function retirarBarraFinal( obj ) {

    var Valor = obj.value;

    if ( Valor.substr( ( Valor.length - 1 ), 1 ) == '/' ) {
        obj.value = Valor.substr( 0, ( Valor.length - 1 ) );
    }

}

$( document ).ready( function() {

    $.ajax( {
        type: 'POST',
        url: "php/functions_setup.php",
        dataType: 'json',
        data: {
            acao: "preenchimentoAutomatico"
        },
        success: function( data ) {
            $( 'input[name=database]' ).val( data.dbname );
            $( 'input[name=db_username]' ).val( data.username );
            $( 'input[name=db_password]' ).val( data.password );
            $( 'input[name=wse_url]' ).val( data.wse_url );
            $( 'input[name=url_path]' ).val( data.url_path );
            $( 'input[name=admin_wowza]' ).val( data.admin_wowza );
            $( 'input[name=senha_wowza]' ).val( data.senha_wowza );
            $( 'input[name=licenca_wowza]' ).val( data.licenca_wowza );
        }
    } );

} );
