$( document ).ready( function () {

    $( '#optionsRadios5' ).on( 'click', function () {
        $( '#download_export_db' ).slideUp( 'fast' );
        $( '#config_metodo_export_db' ).slideDown( 'fast' );
    } );
    $( '#optionsRadios4' ).on( 'click', function () {
        $( '#download_export_db' ).slideUp( 'fast' );
        $( '#config_metodo_export_db' ).slideUp( 'fast' );
    } );

    $( '#btn_form_export_db' ).on( 'click', function () {

        $.ajax( {
            type: 'POST',
            url: getUrl() + "backup/ajax",
            dataType: 'json',
            data: 'acao=exportar&' + $( '#form_export_db' ).serialize(),
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#btn_value_export_db' ).text( 'Exportando' );
                $( '#img_export_db' ).show();
            },
            success: function ( data ) {
                //console.log( data );
                $( '#res_nome_arquivo' ).text( data.arquivo );
                $( '#res_link' ).attr( 'href', data.path_arquivo );
                $( '.tabela_ultimos_backps_db' ).html( data.ultimos_backups );
                $( '#tabela_import_db' ).html( data.backup_import );

                $( '#config_metodo_export_db' ).slideUp( 'fast' );
                $( '#download_export_db' ).slideDown( 'fast' );
                $( '#btn_value_export_db' ).text( 'Exportar' );
                $( '#img_export_db' ).hide();
            }
        } );
    } );

    $( '#import_bd_interno' ).on( 'click', function () {
        $( '#tabela_import_db' ).slideDown( 'fast' );
        $( '#config_input_import_db' ).slideUp( 'fast' );

    } );
    $( '#import_bd_externo' ).on( 'click', function () {
        $( '#tabela_import_db' ).slideUp( 'fast' );
        $( '#config_input_import_db' ).slideDown( 'fast' );
    } );

    $( '#form_import_db' ).submit( function () {

        $( this ).ajaxSubmit( {
            url: getUrl() + "backup/ajax",
            data: { acao: 'importar' },
            dataType: 'json',
            error: function ( error ) {
                console.log( error );
            },
            beforeSubmit: function () {
                $( '#btn_value_import_db' ).text( 'Importando' );
                $( '#img_import_db' ).show();
            },
            success: function ( data ) {
                //console.log( data );
                var tipo = data.tipo;
                if ( tipo == 'success' ) {
                    toastr.success( data.msg );
                } else {
                    toastr.warning( data.msg );
                }


                $( '#btn_value_import_db' ).text( 'Importar' );
                $( '#img_import_db' ).hide();
            }

        } );
        return false;
    } );


    // BACKUP ARQUIVOS WOWZA

    $( '#optionsExportWowzaPersonalizado' ).on( 'click', function () {
        $( '#download_export_wowza' ).slideUp( 'fast' );
        $( '#config_metodo_export_wowza' ).slideDown( 'fast' );
    } );
    $( '#optionsExportWowzaCompleto' ).on( 'click', function () {
        $( '#download_export_wowza' ).slideUp( 'fast' );
        $( '#config_metodo_export_wowza' ).slideUp( 'fast' );
    } );


    $( '.tree_2' ).jstree( {
        "core": {
            "themes": {
                "responsive": false
            },
            "check_callback": true
        },
        "types": {
            "default": {
                "icon": "fa fa-folder icon-warning icon-lg"
            },
            "file": {
                "icon": "fa fa-file icon-success icon-lg"
            }
        },
        "plugins": ["types", "checkbox", "wholerow"]
    } );


    $( '#btn_value_export_wowza' ).on( 'click', function () {

        $.ajax( {
            type: 'POST',
            url: getUrl() + "backup/ajax",
            dataType: 'json',
            data: {
                arquivos: jstree(),
                nome_arquivo: $( 'input[name=nome_arquivo_export_wowza]' ).val(),
                acao: "exportar_wowza"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#btn_value_export_wowza' ).text( 'Exportando' );
                $( '#img_export_wowza' ).show();
            },
            success: function ( data ) {

                var tipo = data.tipo;
                if ( tipo == 'success' ) {
                    toastr.success( data.msg );
                } else {
                    toastr.warning( data.msg );
                }

                $( '#res_nome_arquivo_export_wowza' ).text( data.arquivo );
                $( '#res_link_export_wowza' ).attr( 'href', data.path_arquivo );
                $( '.tabela_ultimos_backps_wowza' ).html( data.ultimos_backups );
                $( '#tabela_import_wowza' ).html( data.backup_import );

                $( '.tree_2' ).jstree( 'close_all' );
                $( '#download_export_wowza' ).slideDown( 'fast' );
                $( '#btn_value_export_wowza' ).text( 'Exportar' );
                $( '#img_export_wowza' ).hide();
            }
        } );

    } );

} );

function jstree() {
    var selectedElmsIds = [];
    var selectedElms = $( '.tree_2' ).jstree( "get_selected", true );
    $.each( selectedElms, function () {
        selectedElmsIds.push( this.id );
    } );
    return selectedElmsIds;
}