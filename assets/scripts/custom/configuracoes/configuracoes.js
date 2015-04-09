jQuery( document ).ready( function () {
    if ( !jQuery().bootstrapSwitch ) {
        return;
    }
    $( '.make-switch' ).bootstrapSwitch();
    $( '.checkbox-personallizado' ).bootstrapSwitch();
    //ComponentsFormTools.init();

    $( '.make-switch' ).on( 'switch-change', function ( event, state ) {

        $.ajax( {
            type: 'POST',
            url: getUrl() + "configuracoes/ajax",
            dataType: 'json',
            data: {
                recurso: this.value,
                value: state.value,
                acao: "recurso_status"
            },
            error: function ( error ) {
                console.log( error );
            },
            success: function ( data ) {
                if ( data.tipo == 'success' )
                    toastr.success( data.msg );
                else
                    toastr.warning( data.msg );
            }
        } );
    } );

    //$('.make-switch').on('switchChange.bootstrapSwitch', function(event, state) {
    //    console.log(this); // DOM element
    //    console.log(event); // jQuery event
    //    console.log(state); // true | false
    //});
} );

function configuracaoFTP( ftp ) {

    if ( ftp == '0' ) {
        $( '#dados_ftp' ).slideUp();
        $( '#dados_ftp_porta' ).slideUp();
        $( '#config_ftp_dominio' ).val( "" );
        $( '#config_ftp_usuario' ).val( "" );
        $( '#config_ftp_senha' ).val( "" );
        $( '#config_ftp_porta' ).val( "" );
        $( '#config_notificacao_ftp' ).slideUp();
    } else if ( ftp == 'ProFTPd' ) {
        $( '#dados_ftp' ).slideUp();
        $( '#dados_ftp_porta' ).slideDown();
        $( '#config_notificacao_ftp' ).slideDown();
        $( '#config_ftp_dominio' ).val( "" );
        $( '#config_ftp_usuario' ).val( "" );
        $( '#config_ftp_senha' ).val( "" );
    } else if ( ftp == 'cPanel' ) {
        $( '#config_notificacao_ftp' ).slideUp();
        $( '#dados_ftp' ).slideDown();
        $( '#dados_ftp_porta' ).slideDown();
    }
}

function retirarBarraFinal( obj ) {

    console.log( obj.length );
    console.log( obj.substr( obj.length, 1 ) );
}

function sincronizar_cotas( obj ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "configuracoes/ajax",
        data: {
            acao: "sincronizar_cotas"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            obj.find( 'i' ).each( function () {
                $( this ).css( 'display', 'none' );
            } );
            obj.find( 'img' ).each( function () {
                $( this ).css( 'display', 'inline' );
            } );
        },
        success: function ( data ) {
            //console.log( data );
            obj.find( 'i' ).each( function () {
                $( this ).css( 'display', 'inline' );
            } );
            obj.find( 'img' ).each( function () {
                $( this ).css( 'display', 'none' );
            } );
        }
    } );
}

function recurso_status( recurso, obj ) {

    console.log( recurso );
    console.log( obj );
}