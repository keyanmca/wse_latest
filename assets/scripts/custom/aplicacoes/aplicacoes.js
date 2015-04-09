var clip = new ZeroClipboard( document.getElementsByClassName( "copy" ), {
    moviePath: getUrl() + "assets/plugins/zeroclipboard/ZeroClipboard.swf"
} );
clip.on( 'complete', function ( client, args ) {
    $( '.copy' ).text( 'Copiado' );
} );

$( document ).ready( function () {

    // Habilitar e Desabilitar Rede Social para Startpage
    $( '.startpage_status_rede_social' ).on( 'click', function () {

        if ( this.checked === true ) {
            $( this ).parent().parent().parent().parent().find( '.input_rede_social' ).removeAttr( 'readonly' );
        } else {
            $( this ).parent().parent().parent().parent().find( '.input_rede_social' ).attr( 'readonly', 'true' ).val( '' );
        }

    } );

    /**
     * Carregar Calendário TV Station
     */
    $( '#tab_acessar_playlist' ).on( 'shown.bs.tab', function ( e ) {
        Calendar.init();
    } );
    $( '#tab_playlist_calendario' ).on( 'shown.bs.tab', function ( e ) {
        Calendar.init();
    } );

    // Esconder todas as Mensagens de Retornos após 2 segundos
    $( '.note.result' ).delay( 10000 ).fadeOut( 400 );

    var AvailableItemsHeigth = $( '.AvailableItems' ).height();
    $( '.DragDrop' ).height( AvailableItemsHeigth );
    $( '.btn_script_player' ).on( 'click', function () {
        var tipo_aplicacao = $( '#tipo_aplicacao' ).val();
        $.ajax( {
            type: 'POST',
            url: getUrl() + tipo_aplicacao + "/ajax",
            data: $( '#PlayerForm' ).serialize(),
            dataType: 'json',
            beforeSend: function () {
                $( '.copy' ).text( 'Copiar Código' );
            },
            success: function ( data ) {
                $( '#MostrarPlayer' ).html( data.player );
                $( '#codigo_player' ).html( data.codigo_player );
                var portlet = $( this ).parents( '.portlet' );
                $( portlet ).find( '.tools a' ).each( function () {
                    var tools_a = $( this );
                    tools_a.removeClass( 'collapse' );
                    tools_a.addClass( 'expand' );
                } );
                $( '#PlayerDemo' ).slideUp( 'slow' );
                $( '#script_player' ).show();
            }
        } );
    } );
    $( 'body' ).delegate( '.expand', 'click', function () {
        $( '#script_player' ).hide();
    } );
    $( 'body' ).delegate( '.row-details', 'click', function () {
        var TD = $( this ).attr( 'class' );
        if ( TD.trim() == 'row-details row-details-close' ) {
            $( this ).parents( 'tr' ).next( 'tr' ).slideDown( 'fast' );
            $( this ).removeClass( 'row-details-close' ).addClass( 'row-details-open' );
        } else {
            $( this ).parents( 'tr' ).next( 'tr' ).slideUp( 'fast' );
            $( this ).removeClass( 'row-details-open' ).addClass( 'row-details-close' );
        }
    } );
    $( 'body' ).delegate( '.DragDrop .WMediaItem', 'mouseover', function () {
        $( this ).find( '.Actions' ).each( function () {
            $( this ).removeClass( 'hidden' );
        } );
    } );
    $( 'body' ).delegate( '.DragDrop .WMediaItem', 'mouseout', function () {
        $( this ).find( '.Actions' ).each( function () {
            $( this ).addClass( 'hidden' );
        } );
    } );
} );

/**
 * Função para Iniciar Aplicações
 * @param {type} aplicacao
 * @returns {undefined}
 */
function iniciar_aplicacao( aplicacao ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            aplicacao: aplicacao,
            acao: "iniciar_aplicacao"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#acoes_' + aplicacao ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
        },
        success: function ( data ) {
            $.each( data.result, function ( chave, valor ) {
                if ( valor.TIPO == 'success' ) {
                    $( '.msg_js' ).html( "" );
                    $( '#acoes_' + aplicacao ).html( valor.ACOES );
                    $( '#status_' + aplicacao ).html( valor.STATUS );
                    toastr.success( valor.MSG );
                    $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
                } else {
                    toastr.warning( traducoes[idioma].erro_iniciar_aplicacoes );
                }
            } );
        }
    } );
}

function iniciar_aplicacao_all() {
    var obj;
    $( "#AplicacoesTable tbody" ).find( "input[type=checkbox]" ).each( function () {
        if ( this.checked === true ) {
            obj = true;
        }
    } );
    if ( obj === true ) {
        var todos = new Array();
        $( "input[type=checkbox][name='aplicacoes_id[]']:checked" ).each( function () {
            todos.push( $( this ).val() );
        } );
        $.each( todos, function ( chave, valor ) {
            $( '#acoes_' + valor ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
        } );
        $.ajax( {
            type: 'POST',
            url: getUrl() + "aplicacoes/ajax",
            dataType: 'json',
            data: {
                aplicacao: todos,
                acao: "iniciar_aplicacao"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#acoes_all' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
            },
            success: function ( data ) {
                $.each( data.result, function ( chave, valor ) {
                    if ( valor.TIPO == 'success' ) {
                        toastr.success( valor.MSG );
                        $( '#acoes_' + valor.APLICACAO_ID ).html( valor.ACOES );
                        $( '#status_' + valor.APLICACAO_ID ).html( valor.STATUS );
                        $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
                        $( '.tablesorter_aplicacoes' ).find( "input[type=checkbox]" ).each( function () {
                            $( this ).removeAttr( 'checked' );
                            $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
                        } );
                    } else {
                        toastr.warning( traducoes[idioma].erro_iniciar_aplicacoes );
                    }
                } );
                $( '#acoes_all' ).html( data.acoes_all );
            }
        } );
    }
}

function reiniciarAplicacao( tipo, aplicacao, obj ) {

    var DadosColuna = obj.parent().html();
    var Coluna = obj.parent();
    $.ajax( {
        type: 'POST',
        url: getUrl() + tipo + "/ajax",
        dataType: 'json',
        data: {
            aplicacao: aplicacao,
            acao: "reiniciar_aplicacao"
        },
        beforeSend: function () {
            obj.parent().html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            if ( data.tipo == 'success' ) {
                Coluna.html( DadosColuna );
                Coluna.parent().removeClass( 'warning' );
                Coluna.parent().find( '.status div' ).each( function () {
                    $( this ).remove();
                } );
                Coluna.find( 'i' ).each( function () {
                    $( this ).next( 'div' ).remove();
                    $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
                } );
            } else {
                Coluna.html( DadosColuna );
                Coluna.find( 'i' ).each( function () {
                    $( this ).next( 'div' ).remove();
                    $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
                } );
            }
            toastr.success( data.msg );
        }
    } );
}

function reiniciar_aplicacao_all() {

    var obj;
    $( "#AplicacoesTable tbody" ).find( "input[type=checkbox]" ).each( function () {
        if ( this.checked === true ) {
            obj = true;
        }
    } );
    if ( obj === true ) {
        var todos = new Array();
        $( "input[type=checkbox][name='aplicacoes_id[]']:checked" ).each( function () {
            todos.push( $( this ).val() );
        } );
        $.each( todos, function ( chave, valor ) {
            $( '#acoes_' + valor ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
        } );
        $.ajax( {
            type: 'POST',
            url: getUrl() + "aplicacoes/ajax",
            dataType: 'json',
            data: {
                aplicacao: todos,
                acao: "reiniciar_aplicacao_all"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#acoes_all' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
            },
            success: function ( data ) {
                $.each( data.result, function ( chave, valor ) {
                    if ( valor.tipo == 'success' ) {
                        toastr.success( valor.msg );
                        $( '#acoes_' + valor.id ).html( valor.acoes );
                        $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
                        $( '.tablesorter_aplicacoes' ).find( "input[type=checkbox]" ).each( function () {
                            $( this ).removeAttr( 'checked' );
                            $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
                        } );
                    } else {
                        toastr.warning( traducoes[idioma].erro_iniciar_aplicacoes );
                    }
                } );
                $( '#acoes_all' ).html( data.acoes_all );
            }
        } );
    }
}

function pararAplicacao( aplicacao, reload ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            aplicacao: aplicacao,
            acao: "parar_aplicacao"
        },
        error: function ( error ) {
            $( '.msg_console' ).html( error.responseText );
        },
        beforeSend: function () {
            $( '#acoes_' + aplicacao ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
            $( '#acoes_all' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="150px" />' );
        },
        success: function ( data ) {
            if ( reload == true ) {
                location.reload();
            } else {
                $.each( data.result, function ( chave, valor ) {
                    if ( valor.TIPO == 'success' ) {
                        toastr.success( valor.MSG );
                        $( '#acoes_' + valor.ID ).html( valor.ACOES );
                        $( '#status_' + valor.ID ).html( valor.STATUS );
                        $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
                        $( '.tablesorter_aplicacoes' ).find( "input[type=checkbox]" ).each( function () {
                            $( this ).removeAttr( 'checked' );
                            $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
                        } );
                    } else {
                        toastr.warning( traducoes[idioma].erro_iniciar_aplicacoes );
                    }
                } );
                $( '#acoes_all' ).html( data.acoes_all );
            }
        }
    } );
}

function parar_aplicacao_all() {

    var obj;
    $( "#AplicacoesTable tbody" ).find( "input[type=checkbox]" ).each( function () {
        if ( this.checked === true ) {
            obj = true;
        }
    } );
    if ( obj === true ) {
        var todos = new Array();
        $( "input[type=checkbox][name='aplicacoes_id[]']:checked" ).each( function () {
            todos.push( $( this ).val() );
        } );
        $.each( todos, function ( chave, valor ) {
            $( '#acoes_' + valor ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
        } );
        $.ajax( {
            type: 'POST',
            url: getUrl() + "aplicacoes/ajax",
            dataType: 'json',
            data: {
                aplicacao: todos,
                acao: "parar_aplicacao"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#acoes_all' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
            },
            success: function ( data ) {
                $.each( data.result, function ( chave, valor ) {
                    if ( valor.TIPO == 'success' ) {
                        toastr.success( valor.MSG );
                        $( '#acoes_' + valor.ID ).html( valor.ACOES );
                        $( '#status_' + valor.ID ).html( valor.STATUS );
                        $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
                        $( '.tablesorter_aplicacoes' ).find( "input[type=checkbox]" ).each( function () {
                            $( this ).removeAttr( 'checked' );
                            $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
                        } );
                    } else {
                        toastr.warning( traducoes[idioma].erro_iniciar_aplicacoes );
                    }
                } );
                $( '#acoes_all' ).html( data.acoes_all );
            }
        } );
    }
}

/**
 * Modal de Confirmação para Suspender as Aplicações
 * @param id
 * @param nome
 */
function confirm_suspender_aplicacao( id, nome ) {
    $( 'input[value=' + id + ']' ).attr( 'checked', 'checked' );
    $( '#modal-confirm-title' ).html( 'Confirmação' );
    $( '#modal-confirm-body' ).html( 'Tem certeza que deseja Suspender a Aplicação <strong>' + nome + '</strong>?' );
    $( '#modal-confirm-button' ).attr( 'onclick', 'suspender_aplicacao()' );
}


function suspender_aplicacao() {

    var obj;
    $( "#AplicacoesTable tbody" ).find( "input[type=checkbox]" ).each( function () {
        if ( this.checked === true ) {
            obj = true;
        }
    } );
    if ( obj === true ) {
        var todos = new Array();
        $( "input[type=checkbox][name='aplicacoes_id[]']:checked" ).each( function () {
            todos.push( $( this ).val() );
        } );

        $.each( todos, function ( chave, valor ) {
            $( '#acoes_' + valor ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
        } );
        $.ajax( {
            type: 'POST',
            url: getUrl() + "aplicacoes/ajax",
            dataType: 'json',
            data: {
                aplicacao: todos,
                acao: "suspender_aplicacao"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#acoes_all' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
            },
            success: function ( data ) {
                $.each( data.result, function ( chave, valor ) {
                    if ( valor.TIPO == 'success' ) {
                        toastr.success( valor.MSG );
                        $( '#acoes_' + valor.ID ).html( valor.ACOES );
                        $( '#status_' + valor.ID ).html( valor.STATUS );
                        $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
                        $( '.tablesorter_aplicacoes' ).find( "input[type=checkbox]" ).each( function () {
                            $( this ).removeAttr( 'checked' );
                            $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
                        } );
                    } else {
                        toastr.warning( traducoes[idioma].erro_iniciar_aplicacoes );
                    }
                } );
                $( '#acoes_all' ).html( data.acoes_all );
            }
        } );
    }
}

function deletar_aplicacao( id ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            aplicacao: id,
            acao: "deletar_aplicacao"
        },
        error: function ( error ) {
            $( '.msg_console' ).html( error.responseText );
        },
        success: function ( data ) {
            $.each( data.result, function ( chave, valor ) {
                if ( valor.tipo == 'success' ) {
                    toastr.success( valor.msg );
                    $( '#linha_' + valor.id ).remove();
                    $( '.tablesorter_aplicacoes' ).find( "input[type=checkbox]" ).each( function () {
                        $( this ).removeAttr( 'checked' );
                        $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
                    } );
                } else {
                    toastr.warning( traducoes[idioma].erro_deletar_aplicacoes );
                }
            } );
            $( '#acoes_all' ).html( data.acoes_all );
        }
    } );
}

function deletar_aplicacao_all() {
    var obj;
    $( "#AplicacoesTable tbody" ).find( "input[type=checkbox]" ).each( function () {
        if ( this.checked === true ) {
            obj = true;
        }
    } );
    if ( obj === true ) {
        var todos = new Array();
        $( "input[type=checkbox][name='aplicacoes_id[]']:checked" ).each( function () {
            todos.push( $( this ).val() );
        } );

        $.each( todos, function ( chave, valor ) {
            $( '#acoes_' + valor ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
        } );
        $.ajax( {
            type: 'POST',
            url: getUrl() + "aplicacoes/ajax",
            dataType: 'json',
            data: {
                aplicacao: todos,
                acao: "deletar_aplicacao"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#acoes_all' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" width="240px" />' );
            },
            success: function ( data ) {
                $.each( data.result, function ( chave, valor ) {
                    if ( valor.tipo == 'success' ) {
                        toastr.success( valor.msg );
                        $( '#linha_' + valor.id ).remove();
                        $( '.tablesorter_aplicacoes' ).find( "input[type=checkbox]" ).each( function () {
                            $( this ).removeAttr( 'checked' );
                            $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
                        } );
                    } else {
                        toastr.warning( traducoes[idioma].erro_deletar_aplicacoes );
                    }
                } );
                $( '#acoes_all' ).html( data.acoes_all );
            }
        } );
    }
}

/**
 *
 * @param aplicacao
 * @param obj
 * @param reload
 */
function reload_videos( aplicacao, obj, reload ) {


    obj.find( 'i' ).each( function () {
        $( this ).css( 'display', 'none' );
    } );
    obj.find( 'img' ).each( function () {
        $( this ).css( 'display', 'inline' );
    } );

    // Passo 1: Renomear os Diretórios
    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            aplicacao: aplicacao,
            acao: "renomear_arquivos_diretorios"
        },
        error: function ( error ) {
            console.log( error.responseText );
        },
        beforeSend: function () {
            $( '#reload_videos_status' ).html( '' ).append( '<div class="alert alert-info" id="msg_ren_dir"> ' + traducoes[idioma].renomeando_diretorios + '...</div>' ).show();
        },
        success: function ( data ) {
            $( '#msg_ren_dir' ).removeClass( 'alert-info' ).addClass( 'alert-success' ).html( '<i class="fa fa-check"></i> ' + traducoes[idioma].renomeando_diretorios + '.' ).show();

            //Passo 2 Gravar Nome dos Arquivo no Banco de Dados
            $.ajax( {
                type: 'POST',
                url: getUrl() + "aplicacoes/ajax",
                dataType: 'json',
                data: {
                    aplicacao: aplicacao,
                    acao: "gravar_nome_banco"
                },
                error: function ( error ) {
                    console.log( error.responseText );
                },
                beforeSend: function () {
                    $( '#reload_videos_status' ).append( '<div class="alert alert-info" id="msg_rec_file"> ' + traducoes[idioma].recuperando_arquivos_diretorio + '...</div>' ).show();
                },
                success: function ( data ) {

                    $( '#msg_rec_file' ).removeClass( 'alert-info' ).addClass( 'alert-success' ).html( '<i class="fa fa-check"></i> ' + traducoes[idioma].recuperando_arquivos_diretorio + '.' ).show();
                    $( '#reload_videos_status' ).append( '<div id="bar" class="progress progress-striped" role="progressbar">' +
                    '<div class="progress-bar progress-bar-success m_video_progresso"></div>' +
                    '</div>' ).show();
                    $( '#reload_videos_status' ).append( '<div class="alert alert-info" id="msg_restant">' + traducoes[idioma].tempo_restante_aproximado + ': <span id="timeout">' + data.TEMPO_TOTAL + '</span></div>' ).show();

                    var Relogio = new Date();

                    var Hours = Relogio.getHours();
                    var Minutes = Relogio.getMinutes();
                    var Seconds = Relogio.getSeconds();
                    var TotalSeconds = (Hours * 60 * 60) + (Minutes * 60) + Seconds + data.TOTAL;

                    $( ".ccounter" ).ccountdown( data.ANO, data.MES, data.DIA, formatTime( TotalSeconds ) );
                    //contagemRegressiva( data.SEGUNDOS );
                    $( '#DisplayMidias' ).html( data.TABLE );

                    // Passo 3 Verificar os vídeos que não possuem dados
                    var current = 0;
                    VerificarVideos = setInterval( function () {
                        current++;
                        getDadosVideos( aplicacao, obj, current, data.TOTAL );
                    }, 1000 );
                }
            } );
        }
    } );
}

function formatTime( secs ) {
    var times = new Array( 3600, 60, 1 );
    var time = '';
    var tmp;
    for ( var i = 0; i < times.length; i++ ) {
        tmp = Math.floor( secs / times[i] );
        if ( tmp < 1 ) {
            tmp = '00';
        }
        else if ( tmp < 10 ) {
            tmp = '0' + tmp;
        }
        time += tmp;
        if ( i < 2 ) {
            time += ':';
        }
        secs = secs % times[i];
    }
    return time;
}

function getDadosVideos( aplicacao, obj, current, total ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            aplicacao: aplicacao,
            acao: "reload_videos"
        },
        error: function ( error ) {
            console.log( error.responseText );
        },
        beforeSend: function () {
        },
        success: function ( data ) {

            if ( data ) {

                var $percent = ( current / total ) * 100;

                $( '#reload_videos_status' ).find( '.m_video_progresso' ).css( {
                    width: $percent + '%'
                } );


                var Linha = $( '#video_' + data.VIDEO.VIDEO_ID );

                if ( data.VIDEO.RESTRICAO.STATUS ) {
                    Linha.addClass( data.VIDEO.RESTRICAO.CLASS ).attr( data.VIDEO.RESTRICAO.ATTR, data.VIDEO.RESTRICAO.TITLE );
                }

                Linha.find( 'td:eq(1)' ).html( data.VIDEO.FORMATO );
                Linha.find( 'td:eq(2)' ).html( data.VIDEO.BITRATE );
                Linha.find( 'td:eq(3)' ).html( data.VIDEO.DURACAO );
                Linha.find( 'td:eq(4)' ).html( data.VIDEO.IMAGEM );
                Linha.find( 'td:eq(5)' ).html( data.VIDEO.ACOES );

                $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();

            } else {
                clearInterval( VerificarVideos );
                clearInterval( Ccountdown );
                obj.find( 'i' ).each( function () {
                    $( this ).css( 'display', 'inline' );
                } );
                obj.find( 'img' ).each( function () {
                    $( this ).css( 'display', 'none' );
                } );
                $( '#reload_videos_status' ).html( '<div class="alert alert-success">' + traducoes[idioma].video_atualizado_sucesso + '</div>' ).delay( 5000 ).fadeOut( 'fast' );

                $.ajax( {
                    type: 'POST',
                    url: getUrl() + "aplicacoes/ajax",
                    dataType: 'json',
                    data: {
                        aplicacao: aplicacao,
                        acao: "ajustar_proftp"
                    },
                    error: function ( error ) {
                        console.log( error.responseText );
                    }
                } );

            }
        }
    } );

}

// Pesquisa Vídeos tabVídeosOndemand
function search_midias_ondemand( val, table, aplicacao ) {

    if ( table ) {

        $.ajax( {
            type: 'POST',
            url: getUrl() + "aplicacoes/ajax",
            dataType: 'json',
            data: {
                aplicacao: aplicacao,
                video: val,
                acao: "search_midias_ondemand"
            },
            error: function ( error ) {
                console.log( error );
            },
            success: function ( data ) {
                $( '#DisplayMidias' ).html( data );
                $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
            }
        } );

    } else {
        $( '.mix-grid' ).mixitup( 'filter', val );
    }
}

function shoutcast_function( data ) {

    if ( data == 4 || data == 6 ) {
        var html = '<div class="col-md-3">';
        html += '    <div class="form-group">';
        html += '        <label class="control-label">Streaming Host<span class="required">*</span></label>';
        html += '        <input type="text" name="aplicacoes_shoutcast_host" class="form-control">';
        html += '        <span class="help-block"></span>';
        html += '    </div>';
        html += '</div>';
        $( '#shoutcast_host' ).html( html );
    } else {
        $( '#shoutcast_host' ).html( '' );
    }


    if ( data == 1 || data == 2 || data == 6 ) {

        var div = '<div class="col-md-3">';
        div += '<div class="form-group">';
        div += '   <label class="control-label">' + decodeURIComponent( escape( traducoes[idioma].aplicacoes_autenticacao ) );
        div += '       <span class="required">*</span></label>';
        div += '       <select name="aplicacoes_live_authentication" class="form-control select2me" id="aplicacoes_live_authentication">';
        div += '           <option value="true">' + traducoes[idioma].ativo + '</option>';
        div += '           <option value="false">' + traducoes[idioma].inativo + '</option>';
        div += '       </select>';
        div += '   </div>';
        div += '</div>';
        $( '#div_authentication' ).html( div );
        $( '#aplicacoes_live_authentication' ).select2();
    } else {
        $( '#div_authentication' ).html( '' );
    }
}

function mostrar_video_modal( aplicacao, arquivo ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "ondemand/ajax",
        data: {
            aplicacao: aplicacao,
            arquivo: arquivo,
            acao: "mostrar_video_modal"
        },
        error: function ( error ) {
        },
        beforeSend: function () {
            $( '#visualizar_video_modal .modal-body' ).html( "" );
        },
        success: function ( data ) {
            $( '#visualizar_video_modal .modal-body' ).html( data );
        }
    } );
}

function preview_modal( aplicacao, arquivo ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        data: {
            aplicacao: aplicacao,
            arquivo: arquivo,
            acao: "preview_modal"
        },
        error: function ( error ) {
        },
        success: function ( data ) {
            $( '#visualizar_video_modal .modal-body' ).html( data );
        }
    } );
}

function getAplicacaoPlano( id_user ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            id_user: id_user,
            acao: "getAplicacaoPlano"
        },
        error: function ( error ) {
        },
        success: function ( data ) {
            var plug = '<option value="">' + traducoes[idioma].selecione + '...</option>';
            $.each( data.PLANOS, function ( chave, valor ) {
                plug += '<option value="' + valor.plano_id + '">' + valor.plano_nome + '</option>';
            } );
            $( '.planos' ).html( plug );
            $( '#aplicacoes_plano_id' ).select2();
        }
    } );
}

function aplicacoes_search( valor ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            valor: valor,
            acao: "search"
        },
        error: function ( error ) {
            console.log( error.responseText );
        },
        success: function ( data ) {
            if ( data ) {
                $( '#msg' ).html( "" );
                $( '#TabelaAplicacoes' ).html( data );
                $( '.tablesorter_aplicacoes' ).tablesorter( {
                    cssChildRow: "tablesorter-childRow",
                    headers: { 0: { sorter: false }, 1: { sorter: false }, 8: { sorter: false } }
                } );
                $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
            } else {
                $( '#AplicacoesTable tbody' ).html( "" );
                $( '#msg' ).html( '<div class="note note-info">' + traducoes[idioma].pesquisa_sem_resultados + '</div>' );
            }
            var test = $( "input[type=checkbox]:not(.toggle, .make-switch), input[type=radio]:not(.toggle, .star, .make-switch)" );
            if ( test.size() > 0 ) {
                test.each( function () {
                    if ( $( this ).parents( ".checker" ).size() == 0 ) {
                        $( this ).show();
                        $( this ).uniform();
                    }
                } );
            }
        }
    } );
}

function visualizar_aplicacao( id ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            id: id,
            acao: "visualizar_aplicacao"
        },
        error: function ( error ) {
        },
        success: function ( data ) {
            $( '.aplicacao_usuario' ).text( data.APLICACOES_USUARIO );
            $( '.aplicacacao_plano' ).text( data.APLICACOES_PLANO );
            $( '.aplicacao_acessos' ).text( data.APLICACOES_ACESSOS );
            $( '.aplicacao_bitrate' ).text( data.APLICACOES_BITRATE );
            $( '.aplicacao_trafego' ).text( data.APLICACOES_TRAFEGO );
            $( '.aplicacao_espaco_disco' ).text( data.APLICACOES_ESPACO_DISCO );
            $( '.aplicacao_servidor' ).text( data.APLICACOES_SERVIDOR );
            $( '.aplicacao_plugin' ).text( data.APLICACOES_PLUGIN );
            $( '.aplicacao_status' ).text( data.APLICACOES_STATUS );
            $( '.aplicacao_tipo' ).text( data.APLICACOES_TIPO );
            $( '.aplicacao_qtd_servidores' ).text( data.APLICACOES_QTD_SERVIDOR );
            $( '.aplicacao_proprietario' ).text( data.APLICACAO_PROPRIETARIO );
        }
    } );
}

function deletar_playlist( id ) {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            id: id,
            acao: "deletar_playlist"
        },
        error: function ( error ) {
        },
        success: function ( data ) {
            $( '.id_playlist' ).val( data.playlist_id );
            $( '.id_aplicacao' ).val( data.aplicacao_id );
        }
    } );
}

function retirarAcento( objResp ) {
    var varString = new String( objResp.value );
    var stringAcentos = new String( 'àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ /,.;:?°´`[{ª]}º-_=+§\\|\'"!@#$%&*¨¨()' );
    var stringSemAcento = new String( 'aaeouaoaeioucuAAEOUAOAEIOUCU' );

    var i = new Number();
    var j = new Number();
    var cString = new String();
    var varRes = '';

    for ( i = 0; i < varString.length; i++ ) {
        cString = varString.substring( i, i + 1 );
        for ( j = 0; j < stringAcentos.length; j++ ) {
            if ( stringAcentos.substring( j, j + 1 ) == cString ) {
                cString = stringSemAcento.substring( j, j + 1 );
            }
        }
        varRes += cString;
    }
    objResp.value = varRes;
}

function corrigir_video( local_arquivo ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        data: {
            local_arquivo: local_arquivo,
            acao: "corrigir_video"
        },
        error: function ( error ) {
        },
        success: function ( data ) {
            if ( data ) {
                location.reload();
            }
        }
    } );
}

$( document ).ready( function () {

    var url = window.location.pathname;
    var retorno = url.split( "/" );

    if ( retorno[1] == 'tvstation' || retorno[1] == 'ondemand' || retorno[1] == 'live' || retorno[1] == 'shoutcastrelay' || retorno[1] == 'cameraip' ) {

        //console.log( retorno[1] + ' - ' + retorno[3] );
        mostrarAcessos( retorno[3], retorno[1] );
        mostrarConexoes( retorno[3] );
        setInterval( function () {
            mostrarConexoes( retorno[3] );
            mostrarAcessos( retorno[3], retorno[1] );
        }, 10000 );
    } else if ( retorno[2] == 'cadastro' || retorno[2] == 'editar' ) {
        dataTableAplicacoes( '#table_recursos_aplicacao' );
    }

} );


function mostrarConexoes( aplicacao ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        data: {
            aplicacao: aplicacao,
            acao: "mostrarConexoes"
        },
        error: function ( error ) {
        },
        success: function ( data ) {
            $( '.n_conexoes' ).html( data );
        }
    } );
}

function mostrarAcessos( aplicacao, tipo ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + tipo + "/ajax",
        data: {
            aplicacao: aplicacao,
            acao: "mostrarAcessos"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            if ( tipo == 'live' ) {
                $( '#AcessosLive' ).html( data );
            }
            if ( tipo == 'tvstation' ) {
                $( '#AcessosTvstation' ).html( data );
            }

            if ( tipo == 'ondemand' ) {
                $( '#AcessosOndemand' ).html( data );
            }

            if ( tipo == 'shoutcastrelay' ) {
                $( '#AcessosShoutcastrelay' ).html( data );
            }
            if ( tipo == 'cameraip' ) {
                $( '#AcessosCameraIp' ).html( data );
            }

//
        }
    } );

}

function dataTableAplicacoes( local ) {

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
 * Adicionar Recurso a Aplicação Clicando no Menu
 * @param recurso_id
 */
function addRecursoAplicacao( recurso_id ) {

    var Id = getRecursosIdTabela().concat( recurso_id );
    var PlanoId = $( '#aplicacoes_plano_id' ).val();
    var PluginId = $( '#aplicacoes_id_plugin' ).val();

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            idNotIn: Id,
            recurso_id: recurso_id,
            plugin: PluginId,
            plano: PlanoId,
            acao: "addRecursoAplicacao"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#menu_add_recurso' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
        },
        success: function ( data ) {

            var TableData = $( '#table_recursos_aplicacao' ).dataTable();
            TableData.fnAddData( [data.table[0], data.table[1], data.table[2], data.table[3], data.table[4]] );
            checkAll( 'recurso_aplicacao_all', '#table_recursos_aplicacao' );
            getMenuRecursos( PluginId, PlanoId, null );
            $( 'select.aplicacao_recurso_status' ).select2();
        }
    } );


}

function confirm_deletar_recurso_plugin_aplicacao( aplicacao_recurso_id, obj ) {

    var Linha = obj.parents( 'tr' );
    var RecursoNome = Linha.find( 'td:eq(1)' ).text();
    var PluginNome = Linha.find( 'td:eq(2)' ).text();
    $( '#modal-confirm-title' ).html( 'Confirmação' );
    $( '#modal-confirm-button' ).attr( 'onclick', 'deletar_recurso_aplicacao(' + aplicacao_recurso_id + ', "aplicacao_recurso_id_' + aplicacao_recurso_id + '")' );
    $( '#modal-confirm-body' ).html( 'Tem certeza que deseja deletar o recurso <strong>' + RecursoNome + '</strong> do Plugin <strong>' + PluginNome + '</strong>?' );
}
/**
 * Remover o Recurso do Plugin
 * @param aplicacao_recurso_id
 * @param linha_deletar
 */
function deletar_recurso_aplicacao( aplicacao_recurso_id, linha_deletar ) {

    var PlanoId = $( 'select[name=aplicacoes_plano_id]' ).val();
    var AplicacaoId = $( '#aplicacoes_id' ).val();


    // VERIFICAÇÃO SE HÁ APLICAÇÃO E PLANOS CADASTRADOS
    if ( AplicacaoId != '' ) {
        $.ajax( {
            type: 'POST',
            url: getUrl() + "aplicacoes/ajax",
            dataType: 'json',
            data: {
                aplicacao_id: AplicacaoId,
                plano_id: PlanoId,
                aplicacao_recurso_id: aplicacao_recurso_id,
                acao: "deletar_recurso_aplicacao"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#menu_add_recurso' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
            },
            success: function ( data ) {
            }
        } );

    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SE NÃO HOUVER APLICAÇÃO NEM PLANOS CADASTRADOS
    // SOMENTE REMOVER A LINHA E BUSCAR ATRAVÉS DO AJAX ATUALIZAR O MENU DE RECURSOS
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // DELETAR A LINHA DA TABELA HTML
    // Recuperar a Instância do dataTable
    var TableData = $( '#table_recursos_aplicacao' ).dataTable();
    // Recupera a Linha a ser deletada
    var nRow = $( '#' + linha_deletar ).parents( 'tr' )[0];
    // remove a linha da tabla
    TableData.fnDeleteRow( nRow );

    getMenuRecursos( $( '#aplicacoes_id_plugin' ).val(), PlanoId, AplicacaoId );

}

function getMenuRecursos( plugin_id, plano_id, aplicacao_id ) {
    // Recuperar o(s) ID(s) dos na tabela HTML de recursos
    var Id = getRecursosIdTabela();
    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            plugin_id: plugin_id,
            plano_id: plano_id,
            aplicacao_id: aplicacao_id,
            recursos_not_in: Id,
            acao: "getDadosMenu"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#menu_add_recurso' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
        },
        success: function ( data ) {
            $( '#menu_add_recurso' ).html( data.menu_recursos );
        }
    } );
}

function getRecursosIdTabela() {

    var todos = new Array();
    $( "input[type=checkbox][name='aplicacoes_recurso_id[]']" ).each( function () {
        todos.push( $( this ).val() );
    } );
    return todos;
}

/**
 * Recuperar os Dados do Plano
 * @param {type} id
 * @returns {undefined}
 */
function getDadosPlano( id ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "planos/ajax",
        dataType: 'json',
        data: {
            id: id,
            acao: "getDadosPlano"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            if ( data ) {

                $( '#aplicacoes_acessos' ).val( data.PLANO_ACESSOS );
                $( '#aplicacoes_bitrate' ).val( data.PLANO_BITRATE );
                $( '#aplicacoes_trafego' ).val( data.PLANO_TRAFEGO );
                $( '#aplicacoes_espaco_disco' ).val( data.PLANO_ESPACO_DISCO );
                $( '#aplicacoes_id_servidor option[value=' + data.PLANO_SERVIDOR + ']' ).attr( 'selected', 'selected' );
                shoutcast_function( data.PLANO_PLUGIN );

                var plug = "";
                var PluginId = '';
                $.each( data.PLUGINS, function ( chave, valor ) {
                    var selected;
                    if ( chave === data.PLANO_PLUGIN ) {
                        selected = 'selected="selected"';
                    } else {
                        selected = '';
                    }
                    plug += '<option value="' + chave + '" ' + selected + '>' + valor + '</option>';


                    if ( chave != '' ) {
                        PluginId = chave;
                    }

                } );
                getMenuRecursos( PluginId, data.PLANO_ID, null );
                $( '.plugins' ).html( plug );

            } else {
                $( '#AplicacoesForm' ).find( '.dado_plano' ).each( function () {
                    $( this ).val( "" );
                } );
                $( '#aplicacoes_bitrate' ).val( "" );
                $( '#aplicacoes_id_servidor option[value=""]' ).attr( 'selected', 'selected' );
                $( '#aplicacoes_id_plugin' ).html( '<option value="">' + traducoes[idioma].selecione_servidor + '</option>' );
            }
            $( "#aplicacoes_id_servidor" ).select2();
            $( '#aplicacoes_id_plugin' ).select2();


        }
    } );
}
/**
 * Função para alterar o status do recurso na Aplicação
 * Função chamada no change do formulário
 * @param status
 * @param recurso_id
 */
function alterarStatusRecurso( status, recurso_id ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            status: status,
            recurso_id: recurso_id,
            acao: "alterarStatusRecurso"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            if ( data.tipo == 'error' )
                toastr.warning( data.msg );
        }
    } );
}


// Remover Arquivos de Vídeos
function deletar_video( video_id, video_nome ) {

    bootbox.confirm( traducoes[idioma].confirmacao_remover_video + ' ' + video_nome, function ( result ) {
        if ( result === true ) {
            $.ajax( {
                type: 'POST',
                url: getUrl() + "aplicacoes/ajax",
                dataType: 'json',
                data: {
                    video_id: video_id,
                    acao: "deletar_video"
                },
                error: function ( error ) {
                    console.log( error );
                },
                success: function ( data ) {

                    console.log( data );

                    $( '#DisplayMidias' ).html( data.TABLE );
                    $( '.mix-filter' ).html( data.CategoriaVideo );
                    $( '.mix-grid' ).mixitup( 'remix', 'all', true );

                    $( '.filter' ).bind( 'click', function () {

                        $( '.mix-grid' ).mixitup( 'filter', $( this ).context.innerHTML );
                    } );

                    $( '#SearchDisplayMidias' ).html( data.SearchDisplayMidias );
                    $( '#SearchDisplayMidias' ).select2( {
                        placeholder: traducoes[idioma].selecione + "...",
                        allowClear: true
                    } );
                }
            } );
        }
    } );

}

function confirm_renomear_video( video_id, video_nome ) {

    $( '#modal-confirm-title' ).html( traducoes[idioma].confirmacao );

    var NomeVideo = video_nome.split( "." );

    html = '<div class="row">';
    html += '   <div class="col-md-12">';
    html += '       <div class="form-group">';
    html += '           <label class="control-label">' + traducoes[idioma].informe_novo_nome + '</label>';
    html += '           <input id="novo_nome_video" class="form-control" value="' + NomeVideo[0] + '" onblur="corrigir_nome( this )" required="true">';
    html += '       </div>';
    html += '   </div>';
    html += '</div>';

    $( '#modal-confirm-body' ).html( html );
    $( '#modal-confirm-button' ).attr( 'onclick', 'renomear_video(' + video_id + ');' );
    $( '#modal-confirm-button' ).removeAttr( 'data-dismiss' );
}

function corrigir_nome( objResp ) {
    var varString = new String( objResp.value );
    var stringAcentos = new String( 'àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ /,.;:?°´`[{ª]}º-=+§\\|\'"!@#$%&*¨¨()' );
    var stringSemAcento = new String( 'aaeouaoaeioucuAAEOUAOAEIOUCU_' );

    var i = new Number();
    var j = new Number();
    var cString = new String();
    var varRes = '';

    for ( i = 0; i < varString.length; i++ ) {
        cString = varString.substring( i, i + 1 );
        for ( j = 0; j < stringAcentos.length; j++ ) {
            if ( stringAcentos.substring( j, j + 1 ) == cString ) {
                cString = stringSemAcento.substring( j, j + 1 );
            }
        }
        varRes += cString;
    }
    objResp.value = varRes.toLowerCase();
}

function renomear_video( video_id ) {


    var url = window.location.pathname;
    var retorno = url.split( "/" );

    var Colunas = 3;
    if ( retorno[2] == 'playlist' ) {
        Colunas = 4;
    }

    var NovoNome = $( '#novo_nome_video' ).val();
    $( '#modal_confirmacao' ).modal( 'hide' );

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            colunas: Colunas,
            novo_nome: NovoNome,
            video_id: video_id,
            acao: "renomear_video"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {

            if ( data.erro ) {
                toastr.warning( data.erro );
            } else {
                $( '#DisplayMidias' ).html( data.TABLE );
                $( '.mix-filter' ).html( data.CategoriaVideo );
                $( '.mix-grid' ).mixitup( 'remix', 'all', true );

                $( '.filter' ).bind( 'click', function () {
                    $( '.mix-grid' ).mixitup( 'filter', $( this ).context.innerHTML );
                } );

                $( '#SearchDisplayMidias' ).html( data.SearchDisplayMidias );
                $( '#SearchDisplayMidias' ).select2( {
                    placeholder: traducoes[idioma].selecione + "...",
                    allowClear: true
                } );
            }

        }
    } );
}

function atualizar_logs_aplicacao( aplicacao_id, obj ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            aplicacao_id: aplicacao_id,
            acao: "atualizar_logs_aplicacao"
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
            obj.find( 'i' ).each( function () {
                $( this ).css( 'display', 'inline' );
            } );
            obj.find( 'img' ).each( function () {
                $( this ).css( 'display', 'none' );
            } );

            $( '.logs_wowza_aplicacao' ).html( data.table );

            App.init();

            //$( '.scroller' ).each( function() {
            //    var height;
            //    if ( $( this ).attr( "data-height" ) ) {
            //        height = $( this ).attr( "data-height" );
            //    } else {
            //        height = $( this ).css( 'height' );
            //    }
            //    $( this ).slimScroll( {
            //        allowPageScroll: true, // allow page scroll when the element scroll is ended
            //        size: '7px',
            //        color: ( $( this ).attr( "data-handle-color" ) ? $( this ).attr( "data-handle-color" ) : '#bbb' ),
            //        railColor: ( $( this ).attr( "data-rail-color" ) ? $( this ).attr( "data-rail-color" ) : '#eaeaea' ),
            //        //position: isRTL ? 'left' : 'right',
            //        height: height,
            //        alwaysVisible: ( $( this ).attr( "data-always-visible" ) == "1" ? true : false ),
            //        railVisible: ( $( this ).attr( "data-rail-visible" ) == "1" ? true : false ),
            //        disableFadeOut: true
            //    } );
            //} );
        }
    } );
}

/**
 * Função para Habilitar e Desabilitar os Templates
 */
function transcode_encode_smil( obj ) {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "aplicacoes/ajax",
        dataType: 'json',
        data: {
            status: (obj.is( ':checked' )) ? '1' : '0',
            name: obj.val(),
            aplicacao_id: $( '#aplicacoes_id' ).val(),
            bitrate: obj.parents( 'tr' ).find( 'td:eq(3)' ).text(),
            acao: "transcode_encode_smil"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            console.log( data );
        }
    } );
}