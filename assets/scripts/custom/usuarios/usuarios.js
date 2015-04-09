$( document ).ready( function () {
    $( '.ver_senha' ).on( 'click', function () {
        var icon = $( this ).html();
        var Grupo = $( this ).parent().parent();
        if ( icon.trim() == '<i class="fa fa-eye"></i>' ) {
            $( Grupo ).find( 'input' ).each( function () {
                $( this ).removeAttr( 'type' ).attr( 'type', 'text' );
            } );
            $( this ).html( '<i class="fa fa-eye-slash"></i>' );
        } else if ( icon.trim() == '<i class="fa fa-eye-slash"></i>' ) {
            $( Grupo ).find( 'input' ).each( function () {
                $( this ).removeAttr( 'type' ).attr( 'type', 'password' );
            } );
            $( this ).html( '<i class="fa fa-eye"></i>' );
        }
    } );
} );

/**
 * Função serve apenas para coletar dados em postar no Modal
 * @param {type} id
 * @returns {undefined}
 */
function deletar_usuario( id ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "usuarios/ajax",
        dataType: 'json',
        data: {
            id: id,
            acao: "deletar_usuario"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            $( '#id_usuario' ).val( data.usuario_id );
            $( '#remover_usuario .modal-body' ).html( data.confirmacao );
            if ( data.btn_tranferir == 'show' ) {
                $( '.link_tranferir_dados' ).attr( 'href', getUrl() + "transferencia_dados/home/" + id + '/del' ).show();
            } else {
                $( '.link_tranferir_dados' ).attr( 'href', "" ).hide();
            }


            //$( '#id_usuario' ).val( data.usuarios_id );
            //$( '.usuario_name' ).text( data.usuarios_primeiro_nome + ' ' + data.usuarios_sobrenome );
        }
    } );
}

function excluir_usuario( usuario ) {

    //console.log( usuario );
    $.ajax( {
        type: 'POST',
        url: getUrl() + "usuarios/ajax",
        dataType: 'json',
        data: {
            usuario: usuario,
            acao: "excluir_usuario"
        },
        error: function ( error ) {
            $( '.msg_console' ).html( error.responseText );
        },
        beforeSend: function () {
            $( '#acoes_' + usuario ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="150px" />' );
        },
        success: function ( data ) {
            //console.log( data );
            if ( data.TIPO == 'success' ) {
                toastr.success( data.MSG );
                $( '#linha_' + usuario ).remove();
            } else {
                toastr.warning( data.MSG );
            }
            $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
        }
    } );
}

function PlanosCadUserNivel( nivel ) {
    // Se o  nível do Usuário for Revenda mostra o Select com os Planos Criados
    if ( nivel === '3' ) {
        $( '.PlanosCadUser' ).slideDown( 'slow' );
    } else {
        $( '.PlanosCadUser' ).slideUp( 'slow' );
    }
}

function getSupAdmin( usuario ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "sup_admin/ajax",
        dataType: 'json',
        data: {
            usuario: usuario,
            acao: "getSupAdmin"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            if ( data ) {
                $( '#msg' ).html( "" );
                var html = "";
                $.each( data, function ( chave, valor ) {
                    html += '<tr>';
                    html += '<td>' + valor.USUARIOS_ID + '</td>';
                    html += '<td>' + valor.USUARIOS_NOME + '</td>';
                    html += '<td>' + valor.USUARIOS_EMAIL + '</td>';
                    html += '<td>' + valor.USUARIOS_NIVEL + '</td>';
                    html += '<td>' + valor.USUARIOS_STATUS + '</td>';
                    html += '<td>' + valor.USUARIOS_ACAO + '</td>';
                    html += '</tr>';
                } );
                $( '#UsuariosTable tbody' ).html( html );
                $( '.tablesorter' ).tablesorter();
                $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
            } else {
                $( '#UsuariosTable tbody' ).html( "" );
                $( '#msg' ).html( '<div class="note note-info">' + traducoes[idioma].pesquisa_sem_resultados + '</div>' );
            }
        }
    } );
}

function getAdmin( usuario ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "admin/ajax",
        dataType: 'json',
        data: {
            usuario: usuario,
            acao: "getAdmin"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            if ( data ) {
                $( '#msg' ).html( "" );
                var html = "";
                $.each( data, function ( chave, valor ) {
                    html += '<tr>';
                    html += '<td>' + valor.USUARIOS_ID + '</td>';
                    html += '<td>' + valor.USUARIOS_NOME + '</td>';
                    html += '<td>' + valor.USUARIOS_EMAIL + '</td>';
                    html += '<td>' + valor.USUARIOS_PROPRIETARIO + '</td>';
                    html += '<td>' + valor.USUARIOS_NIVEL + '</td>';
                    html += '<td>' + valor.USUARIOS_STATUS + '</td>';
                    html += '<td>' + valor.USUARIOS_ACAO + '</td>';
                    html += '</tr>';
                } );
                $( '#UsuariosTable tbody' ).html( html );
                $( '.tablesorter' ).tablesorter();
                $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
            } else {
                $( '#UsuariosTable tbody' ).html( "" );
                $( '#msg' ).html( '<div class="note note-info">' + traducoes[idioma].pesquisa_sem_resultados + '</div>' );
            }

        }
    } );
}

function getRevenda( usuario ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "revenda/ajax",
        dataType: 'json',
        data: {
            usuario: usuario,
            acao: "getRevenda"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            if ( data ) {
                $( '#msg' ).html( "" );
                $( '#TableUsersRevenda' ).html( data );
                $( '.tablesorter' ).tablesorter();
                $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
            } else {
                $( '.UsuariosTable tbody' ).html( "" );
                $( '#msg' ).html( '<div class="note note-info">' + traducoes[idioma].pesquisa_sem_resultados + '</div>' );
            }
        }
    } );
}

function getUsuarios( usuario ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "usuarios/ajax",
        dataType: 'json',
        data: {
            usuario: usuario,
            acao: "getUsuarios"
        },
        error: function ( error ) {
            //$( '#msg' ).html( error );
        },
        success: function ( data ) {
            if ( data ) {
                $( '#msg' ).html( "" );
                $( '#TableUsersUsuarios' ).html( data );
                $( '.tablesorter' ).tablesorter();
                $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
            } else {
                $( '#UsuariosTable tbody' ).html( "" );
                $( '#msg' ).html( '<div class="note note-info">' + traducoes[idioma].pesquisa_sem_resultados + '</div>' );
            }
        }
    } );
}