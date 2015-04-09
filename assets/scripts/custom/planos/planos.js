function qtd_servidores( valor ) {
    if ( valor === 'usuario' ) {
        $( '.qtd_servidores' ).fadeOut();
        $( '#plano_qtd_servidores' ).hide().delay( 2000 ).val( '1' );
        $( '#aplicacoes_qtd_servidores' ).hide().delay( 2000 ).val( '1' );
    } else if ( valor === 'revenda' ) {
        $( '.qtd_servidores' ).fadeIn( 'slow' );
        $( '#plano_qtd_servidores' ).show().val( "" ).removeAttr( 'disabled' );
        $( '#aplicacoes_qtd_servidores' ).show().val( "" ).removeAttr( 'disabled' );
    }
}
/**
 * Formulário de Planos
 * Selecionar Tipo de Plano ( Usuário / Revenda )
 * Usuário = Somente 1 Plugin
 * Revenda = Um ou mais Plugins
 * @param value
 */
function select_plugins( value ) {


    $( '#plano_id_servidor option[value=""]' ).attr( 'selected', 'selected' );

    // Retona o Obejeto do Select do Plaugin
    var nome_id = $( 'select.plano_id_plugin' );

    if ( value == 'revenda' ) {

        nome_id.html( "" );
        nome_id.removeAttr( 'id' );
        nome_id.attr( 'id', 'select2_sample_modal_2' );
        nome_id.attr( 'multiple', 'multiple' );
        nome_id.removeClass( 'select2me' );
        nome_id.addClass( 'select2' );

        $( '#select2_sample_modal_2' ).select2( {
            placeholder: traducoes[idioma].selecione_servidor,
            allowClear: true
        } );

    } else if ( value == 'usuario' ) {

        nome_id.removeAttr( 'id' );
        nome_id.attr( 'id', 'id_plugin' );
        nome_id.removeAttr( 'multiple' );
        nome_id.removeClass( 'select2' );
        nome_id.addClass( 'select2me' );
        nome_id.html( '<option value="">' + traducoes[idioma].selecione + '...</option>' );

        $( "#id_plugin" ).select2( {
            placeholder: traducoes[idioma].selecione + "...",
            allowClear: true
        } );
    }

    // Resetar o select do Servidor
    $( '#plano_id_servidor' ).select2( {
        placeholder: traducoes[idioma].selecione + "...",
        allowClear: true
    } );

    // Limpar a Tabela de Plugins
    var dataTable = $( '#tabela_plugins_plano' ).dataTable();
    dataTable.fnClearTable();
    // Desabilitar o Botão que adiciona os Recursos
    $( '#btn_add_recurso' ).addClass( 'disabled' );
    $( 'input[name=plano_plugins_selecionados]' ).val( "" );

}

function plano_search( valor ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            valor: valor,
            acao: "search"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            if ( data ) {
                $( '#msg' ).html( "" );
                $( '#TablePlanos' ).html( data );
                $( '.tablesorter' ).tablesorter();
                $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
            } else {
                $( '#PlanosTable tbody' ).html( "" );
                $( '#msg' ).html( '<div class="note note-info">' + traducoes[idioma].pesquisa_sem_resultados + '</div>' );
            }

        }
    } );
}


/**
 * Deletar Plano
 * @param {type} id
 * @returns {undefined}
 */
function deletar_plano( id, obj ) {

    // Recupera a linha da tabela
    var linha = obj.parents( 'tr' );
    // recupera o Id do Plano
    var IdPlano = $.trim( linha.children( "td:nth-child(1)" ).text() );
    // Recupera o Nome do Plano
    var NomePlano = $.trim( linha.children( "td:nth-child(2)" ).text() );

    bootbox.confirm( traducoes[idioma].confirmacao_remover_plano + ' ' + IdPlano + ' - ' + NomePlano, function ( result ) {

        if ( result === true ) {
            $.ajax( {
                type: 'POST',
                url: getUrl() + "planos/ajax",
                data: {
                    id: IdPlano,
                    acao: "deletar_plano"
                },
                error: function ( error ) {
                    console.log( error );
                },
                success: function ( data ) {
                    if ( data == 'true' ) {
                        toastr.success( 'Plano deletado com Sucesso!' );
                        linha.remove();
                    } else if ( data = 'em_uso' ) {
                        toastr.warning( traducoes[idioma].plano_nao_pode_ser_deletado );
                    } else {
                        toastr.warning( traducoes[idioma].erro_deletar_plano );
                    }
                }
            } );
        }
    } );

}

$( document ).ready( function () {

    var url = window.location.pathname;
    var retorno = url.split( "/" );

    if ( retorno[1] == 'planos' && retorno[2] == 'cadastro' ) {
        dataTablePlanos( '#tabela_plugins_plano' );
        dataTablePlanos( '#tabela_plugins_recursos' );
    }

} );

function dataTablePlanos( local ) {

    $( local ).dataTable( {
        "aLengthMenu": [
            [5, 15, 20, -1],
            [5, 15, 20, "All"] // change per page values here
        ],
        // set the initial value
        "iDisplayLength": 5,
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_",
            "oPaginate": {
                "sPrevious": "Prev",
                "sNext": "Next"
            }
        },
        "fnDrawCallback": function ( oSettings ) {
            $( '.checkbox' ).uniform();
        },
        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [0] },
            { "bSearchable": false, "aTargets": [0] }
        ],
        "bRetrieve": true
    } ).fnDraw();

    jQuery( local + ' .group-checkable' ).change( function () {
        var set = jQuery( this ).attr( "data-set" );
        var checked = jQuery( this ).is( ":checked" );
        jQuery( set ).each( function () {
            if ( checked ) {
                $( this ).attr( "checked", true );
            } else {
                $( this ).attr( "checked", false );
            }
        } );
        jQuery.uniform.update( set );
    } );

    jQuery( local + '_wrapper .dataTables_filter input' ).addClass( "form-control" ); // modify table search input
    jQuery( local + '_wrapper .dataTables_length select' ).addClass( "form-control input-xsmall" ); // modify table per page dropdown
    jQuery( local + '_wrapper .dataTables_length select' ).select2(); // initialize select2 dropdown

}

/**
 * Função selecionar plugin para adicionar ao plano
 * @param servidor
 */
function addPluginPlano( plugin ) {

    // Verificar Se há Plugins selecionados
    var Id = getPluginsIdTabela().concat( plugin ).concat( 5 );
    $( 'input[name=plano_plugins_selecionados]' ).val( Id );

    $.ajax( {
        type: 'POST',
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            idNotIn: Id,
            plugin: plugin,
            acao: "addPluginPlano"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#menu_add_plugin' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
        },
        success: function ( data ) {

            // Tipo de Plano ( Plano Usuário ou Plano Revenda )
            var TipoPlano = $( 'input[name=plano_tipo]:checked' ).val();
            if ( TipoPlano == 'usuario' ) {
                $( '#menu_add_plugin' ).html( "" );
            } else if ( TipoPlano == 'revenda' ) {
                $( '#menu_add_plugin' ).html( data.plugins );
            }


            var TableData = $( '#tabela_plugins_plano' ).dataTable();
            TableData.fnAddData( [data.table[0], data.table[1], data.table[2]] );
            checkAll( 'id_plugin_all', '#tabela_plugins_plano' );

            // Habilitar Botão que Adiciona Recursos
            $( '#btn_add_recurso' ).removeClass( 'disabled' );
        }
    } );
}

function buscar_plugins( servidor ) {

    // Verificar Se há Plugins selecionados
    var Id = getPluginsIdTabela().concat( 5 );

    // Tipo de Plano ( Plano Usuário ou Plano Revenda )
    var TipoPlano = $( 'input[name=plano_tipo]:checked' ).val();
    if ( TipoPlano == 'usuario' && Id.length > 1 ) {
        $( '#menu_add_plugin' ).html( "" );
    } else {
        $.ajax( {
            type: 'POST',
            url: getUrl() + "planos/ajax",
            dataType: 'json',
            data: {
                idNotIn: Id,
                servidor: servidor,
                acao: "buscar_plugins"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#menu_add_plugin' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
            },
            success: function ( data ) {
                $( '#menu_add_plugin' ).html( data.plugins );
            }
        } );
    }


}

/**
 * Função para Checar e Deschecar os Checkbox de uma tabela
 * @param {type} name
 * @param {type} local
 * @returns {undefined}
 */
function checkAll( name, local ) {
    //SELECIONAR TODOS OS CHECKBOX EMPRESA
    $( "input[name=" + name + "]" ).click( function () {
        if ( this.checked === true ) {
            $( local ).find( "input[type=checkbox]" ).each( function () {
                $( this ).attr( 'checked', 'checked' );
                $( this ).parent( 'span' ).attr( 'class', 'checked' );
            } );
        } else {
            $( local ).find( "input[type=checkbox]" ).each( function () {
                $( this ).removeAttr( 'checked' );
                $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
            } );
        }
    } );
    //SE ALGUM CHECKBOX EMPRESA FOR DESELECIONADO O CHECKBOX QUE SELECIONA TODOS SERÃ DESCELECIONADO
    $( local ).delegate( "[type=checkbox]", "click", function () {
        if ( this.checked === false ) {
            $( "input[name=" + name + "]" ).each( function () {
                $( this ).removeAttr( 'checked' );
                $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
            } );
        }
    } );
}

function getPluginsIdTabela() {

    var todos = new Array();
    $( "input[type=checkbox][name='plano_id_plugin[]']" ).each( function () {
        todos.push( $( this ).val() );
    } );
    return todos;
}

function getRecursosPluginsIdTabela() {

    var todos = new Array();
    $( "input[type=checkbox].recurso_plugin_id:checked" ).each( function () {
        todos.push( $( this ).val() );
    } );
    return todos;
}

/**
 * Confirmação remover plugin do plano
 * @param plugin
 * @param plano
 */
function confirm_deletar_plugin_plano( plugin, plano, obj ) {

    // Recuperar o Id da Linha que está no Checkbox
    var recurso_id = null;
    if ( obj ) {
        recurso_id = obj.parents( 'tr' ).find( 'input[type=checkbox]' ).val();
    }

    $( '#modal-confirm-title' ).html( traducoes[idioma].confirmacao );
    $( '#modal-confirm-button' ).attr( 'onclick', 'deletar_plugin_plano(' + plugin + ', ' + plano + ')' );


    $.ajax( {
        type: 'POST',
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            plugin: plugin,
            plano: plano,
            recurso_id: recurso_id,
            acao: "get_plugin_by_id"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#modal-confirm-body' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
        },
        success: function ( data ) {
            $( '#modal-confirm-body' ).html( data );
        }
    } );

}

/**
 * Remover a Linha da Tabela e se for para Editar o Plano remover do Banco de Dados
 * @param plugin
 * @param plano
 */
function deletar_plugin_plano( plugin, plano ) {




    // Se não houver plano remover somente a linha da Tabela
    if ( plano == 0 ) {

        // Recuperar a Instância do dataTable
        var TableData = $( '#tabela_plugins_plano' ).dataTable();
        // Recupera a Linha a ser deletada
        var nRow = $( '#plugin_id_' + plugin ).parents( 'tr' )[0];
        // remove a linha da tabla
        TableData.fnDeleteRow( nRow );

        menu_add_plugins_cadastro_plano();

        if ( getPluginsIdTabela() == "" ) {
            $( '#btn_add_recurso' ).addClass( 'disabled' );
        }
    } else {

        $.ajax( {
            type: 'POST',
            url: getUrl() + "planos/ajax",
            dataType: 'json',
            data: {
                plugin: plugin,
                plano: plano,
                acao: "deletar_plugin_plano"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#menu_add_plugin' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
            },
            success: function ( data ) {


                if ( data.delete ) {
                    // Recuperar a Instância do dataTable
                    var TableData = $( '#tabela_plugins_plano' ).dataTable();
                    // Recupera a Linha a ser deletada
                    var nRow = $( '#plugin_id_' + plugin ).parents( 'tr' )[0];
                    // remove a linha da tabla
                    TableData.fnDeleteRow( nRow );

                    menu_add_plugins_cadastro_plano();

                    if ( getPluginsIdTabela() == "" ) {
                        $( '#btn_add_recurso' ).addClass( 'disabled' );
                    }

                    // Recuperar a Instância do dataTable
                    var TableRecursosData = $( '#tabela_plugins_recursos' ).dataTable();
                    // Recupera a Linha a ser deletada
                    $( ".plano_plugin_id_" + plugin ).parents( 'tr' ).each( function () {
                        TableRecursosData.fnDeleteRow( $( this )[0] );
                    } );


                } else {
                    toastr.warning( 'Erro ao Remover o Plugin para este Plano. Tente Novamente.' )
                }
            }
        } );
    }
}

/**
 * Função para administrar o menu de adicionar Plugins
 */
function menu_add_plugins_cadastro_plano() {

    var Id = getPluginsIdTabela().concat( 5 );
    $.ajax( {
        type: 'POST',
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            idNotIn: Id,
            acao: "getPluginNotIn"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#menu_add_plugin' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
        },
        success: function ( data ) {
            $( '#menu_add_plugin' ).html( data.plugins );
        }
    } );
}


/**
 * Confirmação remover recurso do plano
 * @param plugin
 * @param plano
 */
function confirm_deletar_recurso_plugin_plano( plugin, plano, obj ) {

    // Recuperar o Id da Linha que está no Checkbox
    var recurso_id = null;
    if ( obj ) {
        recurso_id = obj.parents( 'tr' ).find( 'input[type=checkbox]' ).val();
    }

    $( '#modal-confirm-title' ).html( traducoes[idioma].confirmacao );
    $( '#modal-confirm-button' ).attr( 'onclick', 'deletar_recurso_plano(' + plugin + ', ' + plano + ', ' + recurso_id + ')' );

    $.ajax( {
        type: 'POST',
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            plugin: plugin,
            plano: plano,
            recurso_id: recurso_id,
            acao: "get_recurso_by_id"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#modal-confirm-body' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
        },
        success: function ( data ) {
            $( '#modal-confirm-body' ).html( data );
        }
    } );
}

/**
 * Remover a Linha da Tabela e se for para Editar o Plano remover do Banco de Dados
 * @param plugin
 * @param plano
 */
function deletar_recurso_plano( plugin, plano, recurso_id ) {

    //console.log( plugin + ' -  ' + plano + ' -  ' + recurso_id );
    //return false;

    // Se não houver plano remover somente a linha da Tabela
    if ( plano == 0 || plano == undefined ) {
        // Recuperar a Instância do dataTable
        var TableData = $( '#tabela_plugins_recursos' ).dataTable();
        // Recupera a Linha a ser deletada
        var nRow = $( '#recurso_plugin_id_' + plugin ).parents( 'tr' )[0];
        // remove a linha da tabla
        TableData.fnDeleteRow( nRow );

    } else {
        $.ajax( {
            type: 'POST',
            url: getUrl() + "planos/ajax",
            dataType: 'json',
            data: {
                plugin: plugin,
                plano: plano,
                recurso_id: recurso_id,
                acao: "deletar_recurso_plano"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                //$( '#menu_add_plugin' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
            },
            success: function ( data ) {
                if ( data ) {
                    // Recuperar a Instância do dataTable
                    var TableData = $( '#tabela_plugins_recursos' ).dataTable();
                    // Recupera a Linha a ser deletada
                    var nRow = $( '#recurso_plugin_id_' + recurso_id ).parents( 'tr' )[0];
                    // remove a linha da tabla
                    TableData.fnDeleteRow( nRow );
                } else {
                    toastr.warning( 'Erro ao Deletar o Recurso. Tente Novamente.' );
                }
            }
        } );
    }
}

/**
 * Função ao abrir modal para selecionar o Plugin e adicionar o Recurso
 */
function add_recursos_plano( plano_id ) {

    // Preencher o Título do Modal
    $( '#modal-confirm-title' ).html( traducoes[idioma].adicionar_recurso );
    // Preencher a função para o Botão confirmar
    $( '#modal-confirm-button' ).attr( 'onclick', 'btn_add_recursos_plano(' + plano_id + ')' );

    // Preencher o Select com os Plugins que estão na Tabela de Plugins
    var PluginsId = getPluginsIdTabela();


    $.ajax( {
        type: 'POST',
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            PluginsId: PluginsId,
            acao: "getPluginParaSelect"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#modal-confirm-body' ).css( 'text-align', 'center' ).html( '<p>Carregando...</p><img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
        },
        success: function ( data ) {
            $( '#modal-confirm-body' ).css( 'text-align', 'left' ).html( data.table );
            $( 'select[name=recurso_plugin_plugin_id]' ).select2();
        }
    } );

}

/**
 * Função que ao clicar no botão para confirmar a adição dos recurso
 */
function btn_add_recursos_plano() {

    var todos = new Array();
    $( "input[type=checkbox][name='recurso_id[]']:checked" ).each( function () {
        todos.push( $( this ).val() );
    } );

    var PluginSeleciondo = $( 'select[name=recurso_plugin_plugin_id]' ).val();

    console.log( 'plugin Selecionado ' + PluginSeleciondo );
    $.ajax( {
        type: 'POST',
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            Plugin: PluginSeleciondo,
            Recursos: todos,
            acao: "get_recursos_plugin"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
        },
        success: function ( data ) {

            var TableData = $( '#tabela_plugins_recursos' ).dataTable();
            if ( data.table != null ) {
                $.each( data.table, function ( chave, valor ) {
                    TableData.fnAddData( [valor[0], valor[1], valor[2], valor[3]] );
                } );
            }
            checkAll( 'recurso_plugin_all', '#tabela_plugins_recursos' );
        }
    } );

}

/**
 * Função chamada no CHANGE do select do formulário que está no modal
 * @param plugin
 */
function get_recursos( plugin ) {


    var IdRecursosPlugin = getRecursosPluginsIdTabela();

    $.ajax( {
        type: 'POST',
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            NotIn: IdRecursosPlugin,
            PluginId: plugin,
            acao: "get_recursos"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#row-table-add-recursos' ).slideUp( 'slow' );
        },
        success: function ( data ) {

            dataTablePlanos( '#tabela_add_recursos' );
            var TableData = $( '#tabela_add_recursos' ).dataTable();
            TableData.fnClearTable();
            if ( data.table != null ) {
                $.each( data.table, function ( chave, valor ) {
                    TableData.fnAddData( [valor[0], valor[1]] );
                } );
            }
            checkAll( 'id_recurso_all', '#tabela_add_recursos' );
            $( '#row-table-add-recursos' ).slideDown( 'slow' );
        }
    } );
}