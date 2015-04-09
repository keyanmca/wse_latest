// verifica_check(this);selecionarVideo()
$( document ).ready( function () {

    var DataTableMidiasDisponiveis = function () {
        // begin second table
        $( '#TabelaVideoDisponiveis' ).dataTable( {
            "aLengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, traducoes[idioma].todos] // change per page values here
            ],
            // set the initial value
            "iDisplayLength": 5,
            "sPaginationType": "bootstrap",
            "oLanguage": {
                "sLengthMenu": "_MENU_ ",
                "oPaginate": {
                    "sPrevious": traducoes[idioma].anterior,
                    "sNext": traducoes[idioma].proximo
                },
                sEmptyTable: traducoes[idioma].tabela_vazia,
                sInfo: traducoes[idioma].info,
                sInfoEmpty: traducoes[idioma].InfoEmpty
            },
            "aoColumnDefs": [
                { 'bSortable': false, 'aTargets': [0] },
                { "bSearchable": false, "aTargets": [0] }
            ]
        } );

        jQuery( '#TabelaVideoDisponiveis .group-checkable' ).change( function () {
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

        jQuery( '#TabelaVideoDisponiveis_wrapper .dataTables_filter input' ).addClass( "form-control  input-inline" ); // modify table search input
        jQuery( '#TabelaVideoDisponiveis_wrapper .dataTables_length select' ).addClass( "form-control input-xsmall" ); // modify table per page dropdown
        jQuery( '#TabelaVideoDisponiveis_wrapper .dataTables_length select' ).select2(); // initialize select2 dropdown
    }

    DataTableMidiasDisponiveis();

    ComponentsNoUiSliders.init();
    //FormEditable.init();
    checkAll( "selectAll", "#TabelaVideoDisponiveis tbody" );

    /**
     * Form validade
     */
    var form = $( '#submit_form' );
    var error = $( '.alert-danger', form );
    var success = $( '.alert-success', form );

    form.validate( {
        doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
        errorElement: 'span', //default input error message container
        errorClass: 'help-block', // default input error message class
        focusInvalid: false, // do not focus the last invalid input
        rules: {
            m_video_bitrate_video: { required: true },
            m_video_bitrate_audio: { required: true },
            m_video_hertz_audio: { required: true },
            m_video_frames: { required: true }
        },
        messages: {
            m_video_bitrate_video: { required: traducoes[idioma].obrigatorio },
            m_video_bitrate_audio: { required: traducoes[idioma].obrigatorio },
            m_video_hertz_audio: { required: traducoes[idioma].obrigatorio },
            m_video_frames: { required: traducoes[idioma].obrigatorio }
        },
        errorPlacement: function ( error, element ) { // render error placement for each input type
            if ( element.attr( "name" ) == "m_video_bitrate_video" ) {
                error.insertAfter( $( 'input[name=m_video_bitrate_video]' ).parent( ".input-group" ) );
            } else {
                error.insertAfter( element ); // for other inputs, just perform default behavior
            }
        },
        invalidHandler: function ( event, validator ) { //display error alert on form submit
            success.hide();
            error.show();
            App.scrollTo( error, -200 );
        },
        highlight: function ( element ) { // hightlight error inputs
            $( element ).closest( '.form-group' ).removeClass( 'has-success' ).addClass( 'has-error' ); // set error class to the control group
        },
        unhighlight: function ( element ) { // revert the change done by hightlight
            $( element ).closest( '.form-group' ).removeClass( 'has-error' ); // set error class to the control group
        },
        success: function ( label ) {
            if ( label.attr( "for" ) == "gender" || label.attr( "for" ) == "payment[]" ) { // for checkboxes and radio buttons, no need to show OK icon
                label.closest( '.form-group' ).removeClass( 'has-error' ).addClass( 'has-success' );
                label.remove(); // remove error label here
            } else { // display success icon for other inputs
                label.addClass( 'valid' ).closest( '.form-group' ).removeClass( 'has-error' ).addClass( 'has-success' ); // set success class to the control group
            }
        },
        submitHandler: function ( form ) {
            success.show();
            error.hide();
            //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
        }
    } );

    // default form wizard
    $( '#wizard_conversor' ).bootstrapWizard( {
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        onTabClick: function ( tab, navigation, index, clickedIndex ) {
            return false;
            success.hide();
            error.hide();
            if ( form.valid() == false ) {
                return false;
            }
            handleTitle( tab, navigation, clickedIndex );
        },
        onNext: function ( tab, navigation, index ) {
            success.hide();
            error.html( traducoes[idioma].erros_encontrados ).hide();
            if ( form.valid() == false ) {
                return false;
            }
            if ( index === 1 ) {

                // Verificar se algum vídeo foi selecionado
                if ( $( '#conversao_ativa' ).val() == "1" ) {
                    error.html( traducoes[idioma].videos_convertendo_agora ).show();
                    return false;
                }

                // Verificar se algum vídeo foi selecionado
                if ( $( '#m_videos_selecionados' ).val() == "" ) {
                    error.html( traducoes[idioma].nenhum_video_selecionado ).show();
                    return false;
                }
            }

            // Mostrar os Vídeos que serão ou não convertidos
            if ( index === 2 ) {
                // Retornar dados do Vídeo selecionado
                $.ajax( {
                    type: 'POST',
                    url: getUrl() + "manutencao_videos/ajax",
                    dataType: 'json',
                    data: form.serialize() + '&acao=verificarConversao',
                    beforeSend: function () {
                        $( '#carregando' ).show();
                    },
                    complete: function () {
                        $( '#carregando' ).fadeOut( 'fast' );
                    },
                    error: function ( error ) {
                        console.log( error );
                    },
                    success: function ( data ) {
                        //console.log( data );
                        // Informa as mensagens de Erro
                        if ( data.msg_error ) {
                            $( '.msg_error' ).html( data.msg_error ).show();
                        } else {
                            $( '.msg_error' ).html( "" ).hide();
                        }

                        // Mostra a Tabela com os Vídeos
                        $( '#TabelaConfirmacaoVideos' ).html( data.tabela );

                        var test = $( "input[type=checkbox]:not(.toggle, .make-switch), input[type=radio]:not(.toggle, .star, .make-switch)" );
                        if ( test.size() > 0 ) {
                            test.each( function () {
                                if ( $( this ).parents( ".checker" ).size() == 0 ) {
                                    $( this ).show();
                                    $( this ).uniform();
                                }
                            } );
                        }
                        checkAll( "selectAll", ".tabela_confirmacao_videos tbody" );

                        // Link que se transforma em input text
                        $( '.nome_video' ).editable( {
                            mode: "inline",
                            validate: function ( valor ) {
                                if ( valor == '' ) {
                                    return traducoes[idioma].obrigatorio;
                                } else {
                                    var NovoNome = retirarAcento( valor );
                                    $( this ).text( NovoNome );
                                }
                            },
                            display: function ( valor ) {
                                // modifica o Nome caso ele tenha espaços
                                // ou caracteres especiais
                                var NovoNome = retirarAcento( valor );
                                $( this ).text( NovoNome );
                            }
                        } );

                        // Slider para determinar o inicio e fim dos arquivos
                        $.each( data.slider, function ( chave, valor ) {
                            $( '.slider_videos_' + valor.video_id ).html( "" ).noUiSlider( {
                                range: [0, valor.segundos]
                                , start: [0, valor.segundos]
                                , handles: 2
                                , connect: true
                                , step: 1
                                , serialization: {
                                    to: [$( '.slider_inicio_' + valor.video_id ), $( '.slider_fim_' + valor.video_id )]
                                    , resolution: 1
                                }
                            } );
                        } );

                    }
                } );

            } else if ( index === 3 ) {

                var DadosTabela = [];
                // Retorna todas as Linhas que não contém restrições
                $( '.tabela_confirmacao_videos' ).find( '.aprovado' ).each( function () {
                    var par = $( this ); //tr
                    var id = $( this ).attr( 'id' );

                    DadosLinha = {
                        id_video: id.replace( 'video_', '' ),
                        nome_arquivo: $.trim( par.children( "td:nth-child(3)" ).text() ),
                        inicio_video: $( '.slider_inicio_' + id.replace( 'video_', '' ) ).val(),
                        fim_video: $( '.slider_fim_' + id.replace( 'video_', '' ) ).val()
                    }
                    DadosTabela.push( DadosLinha );
                } );

                $.ajax( {
                    type: 'POST',
                    async: false,
                    url: getUrl() + "manutencao_videos/ajax",
                    data: {
                        form: form.serialize(),
                        tabela_confirmacao: DadosTabela,
                        acao: "converterVideos"
                    },
                    beforeSend: function () {
                        $( '#carregando' ).show();
                    },
                    complete: function () {
                        $( '#carregando' ).fadeOut( 'fast' );
                    },
                    error: function ( error ) {
                        console.log( error );
                    },
                    success: function ( data ) {
                        $( '#TabelaStatusConversaoVideos' ).html( data );

                    }
                } );

            }
            handleTitle( tab, navigation, index );
        },
        onPrevious: function ( tab, navigation, index ) {
            success.hide();
            error.html( traducoes[idioma].erros_encontrados ).hide();

            if ( index === 1 ) {
                if ( confirm( traducoes[idioma].confirmacao_voltar ) ) {
                    return true;
                } else {
                    return false;
                }

            }

            handleTitle( tab, navigation, index );
        },
        onTabShow: function ( tab, navigation, index ) {

            /**
             * Passo 4, barra de progresso e status
             */
            if ( index == 3 ) {
                $( '#wizard_conversor' ).find( '.button-previous' ).hide();
                $( '#wizard_conversor' ).find( '.button-next' ).hide();
                $( '#wizard_conversor' ).find( '.button-submit' ).hide();

                $( '#msg_erro' ).html( traducoes[idioma].nao_feche_esta_janela ).show();


                progressoConversor();


            }
            var total = navigation.find( 'li' ).length;
            var current = index + 1;
            var $percent = ( current / total ) * 100;
            $( '#wizard_conversor' ).find( '.m_video_progresso' ).css( {
                width: $percent + '%'
            } );
        }
    } );

    $( '#wizard_conversor' ).find( '.button-previous' ).hide();
    $( '#wizard_conversor .button-submit' ).click( function () {
        alert( 'Finished! Hope you like it :)' );
    } ).hide();

    var displayConfirm = function () {
        $( '#tab4 .form-control-static', form ).each( function () {
            var input = $( '[name="' + $( this ).attr( "data-display" ) + '"]', form );
            if ( input.is( ":radio" ) ) {
                input = $( '[name="' + $( this ).attr( "data-display" ) + '"]:checked', form );
            }
            if ( input.is( ":text" ) || input.is( "textarea" ) ) {
                $( this ).html( input.val() );
            } else if ( input.is( "select" ) ) {
                $( this ).html( input.find( 'option:selected' ).text() );
            } else if ( input.is( ":radio" ) && input.is( ":checked" ) ) {
                $( this ).html( input.attr( "data-title" ) );
            } else if ( $( this ).attr( "data-display" ) == 'payment' ) {
                var payment = [];
                $( '[name="payment[]"]' ).each( function () {
                    payment.push( $( this ).attr( 'data-title' ) );
                } );
                $( this ).html( payment.join( "<br>" ) );
            }
        } );
    }

    var handleTitle = function ( tab, navigation, index ) {
        var total = navigation.find( 'li' ).length;
        var current = index + 1;
        // set wizard title
        $( '.step-title', $( '#wizard_conversor' ) ).text( traducoes[idioma].passos + ' ' + ( index + 1 ) + ' ' + traducoes[idioma].de + ' ' + total );
        // set done steps
        jQuery( 'li', $( '#wizard_conversor' ) ).removeClass( "done" );
        var li_list = navigation.find( 'li' );
        for ( var i = 0; i < index; i++ ) {
            jQuery( li_list[i] ).addClass( "done" );
        }

        if ( current == 1 ) {
            $( '#wizard_conversor' ).find( '.button-previous' ).hide();
        } else {
            $( '#wizard_conversor' ).find( '.button-previous' ).show();
        }

        if ( current >= total ) {
            $( '#wizard_conversor' ).find( '.button-next' ).hide();
            $( '#wizard_conversor' ).find( '.button-submit' ).show();
            displayConfirm();
        } else {
            $( '#wizard_conversor' ).find( '.button-next' ).show();
            $( '#wizard_conversor' ).find( '.button-submit' ).hide();
        }
        App.scrollTo( $( '.page-title' ) );
    }
} );

function verifica_check( obj ) {

    if ( $( obj ).is( ":checked" ) ) {
        $( obj ).attr( 'checked', true );
    } else {
        $( obj ).removeAttr( 'checked' );
    }
}

var tempo = new Number();
// Tempo em segundos
tempo = 10;
function startCountdown() {
    // Se o tempo não for zerado
    if ( ( tempo - 1 ) >= 0 ) {
        // Pega a parte inteira dos minutos
        var min = parseInt( tempo / 60 );
        // Calcula os segundos restantes
        var seg = tempo % 60;
        // Formata o número menor que dez, ex: 08, 07, ...
        if ( min < 10 ) {
            min = "0" + min;
            min = min.substr( 0, 2 );
        }
        if ( seg <= 9 ) {
            seg = "0" + seg;
        }
        // Cria a variável para formatar no estilo hora/cronômetro
        horaImprimivel = '00:' + min + ':' + seg;
        //JQuery pra setar o valor
        $( "#sessao" ).html( horaImprimivel );
        // Define que a função será executada novamente em 1000ms = 1 segundo
        setTimeout( 'startCountdown()', 1000 );
        // diminui o tempo
        tempo--;
        // Quando o contador chegar a zero faz esta ação
    } else {
        //console.log( getUrl() + 'manutencao_videos/videos/' + $( 'input[name=m_videos_aplicacao_id]' ).val() );
        window.open( getUrl() + 'manutencao_videos/videos/' + $( 'input[name=m_videos_aplicacao_id]' ).val(), '_self' );
    }
}
// Chama a função ao carregar a tela

function sleep( delay ) {
    var start = new Date().getTime();
    while ( new Date().getTime() < start + delay );
}
/**
 * Função para Mostrar o Progresso das conversões
 * @returns {undefined}
 */
function progressoConversor() {

    ProgressoSetInterval = setInterval( function () {
        $.ajax( {
            type: 'POST',
            url: getUrl() + "manutencao_videos/ajax",
            async: false,
            dataType: 'json',
            data: {
                aplicacao_id: $( 'input[name=m_videos_aplicacao_id]' ).val(),
                acao: "progressoConversor"
            },
            error: function ( error ) {
                alert( traducoes[idioma].ocorreu_um_erro_interno );
                console.log( error );
                return false;
            },
            success: function ( data ) {

                if ( data === 'end' ) {
                    $( '.alert-success' ).html( traducoes[idioma].convertido_sucesso ).show();
                    $.ajax( {
                        type: 'POST',
                        async: false,
                        url: getUrl() + "manutencao_videos/ajax",
                        data: {
                            aplicacao_id: $( 'input[name=m_videos_aplicacao_id]' ).val(),
                            acao: "AtualizarVideosBanco"
                        },
                        error: function ( error ) {
                            console.log( error );
                        },
                        success: function ( data ) {
                            clearInterval( ProgressoSetInterval );
                            startCountdown();
                        }
                    } );

                }
                if ( data ) {
                    $( '#progress_video_' + data.video_id ).css( 'width', data.tempo + '%' );
                    $( '#status_video_' + data.video_id ).html( data.tempo + '%' );
                    var ID_VIDEO = $( '#video_convertendo' ).val();
                    if ( ID_VIDEO !== "" ) {
                        if ( data.video_id != ID_VIDEO ) {
                            $( '#progress_video_' + ID_VIDEO ).css( 'width', '100%' );
                            $( '#status_video_' + ID_VIDEO ).html( '100%' );
                        } else {
                        }
                    }
                    $( '#video_convertendo' ).val( data.video_id );
                }
            }
        } );
    }, 1000 );
}

/**
 * Função para Ajustar o Nome do Arquivo
 * @param {type} objResp
 * @returns {String}
 */
function retirarAcento( objResp ) {
    var varString = new String( objResp );
    var stringAcentos = new String( 'àâêôûãõáéíóúçüÀÂÊÔÛÃÕÁÉÍÓÚÇÜ /,.;:?°´`[{ª]}º=+§\\|\'"!@#$%&*¨¨()' );
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
    return varRes;
}

function select_conversor_qualidade( valor ) {

    // Qualidade
    if ( valor == 'Baixa' ) {
        // Bitrate de Vídeo
        $( 'input[name=m_video_bitrate_video]' ).val( '400' );
        // Bitrate de Áudio
        $( 'select[name=m_video_bitrate_audio] option[value="64"]' ).attr( 'selected', 'selected' );
    } else if ( valor == 'Media' ) {
        // Bitrate de Vídeo
        $( 'input[name=m_video_bitrate_video]' ).val( '800' );
        // Bitrate de Áudio
        $( 'select[name=m_video_bitrate_audio] option[value="96"]' ).attr( 'selected', 'selected' );
    } else if ( valor == 'Alta' ) {
        // Bitrate de Vídeo
        $( 'input[name=m_video_bitrate_video]' ).val( '800' );
        // Bitrate de Áudio
        $( 'select[name=m_video_bitrate_audio] option[value="96"]' ).attr( 'selected', 'selected' );
    } else if ( valor == 'HD' ) {
        // Bitrate de Vídeo
        $( 'input[name=m_video_bitrate_video]' ).val( '1200' );
        // Bitrate de Áudio
        $( 'select[name=m_video_bitrate_audio] option[value="128"]' ).attr( 'selected', 'selected' );
    } else if ( valor == '' ) {
        // Bitrate de Vídeo
        $( 'input[name=m_video_bitrate_video]' ).val( '' );
        // Bitrate de Áudio
        $( 'input[name=m_video_bitrate_audio]' ).val( '' );
    }
    $( 'select[name=m_video_bitrate_audio]' ).select2();
}

function selecionarVideo() {


    $( 'body' ).find( '.arquivo_final' ).each( function () {
        $( this ).remove();
    } )
    var obj;
    $( "#TabelaVideoDisponiveis tbody" ).find( "input[type=checkbox]" ).each( function () {
        if ( this.checked === true ) {
            obj = true;
        }
    } );
    if ( obj === true ) {
        var todos = new Array();
        $( "input[type=checkbox][name='check_video[]']:checked" ).each( function () {
            todos.push( $( this ).val() );
        } );
        $( '#m_videos_selecionados' ).val( todos );
    } else {
        $( '#m_videos_selecionados' ).val( "" );
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
            selecionarVideo();
        } else {
            $( local ).find( "input[type=checkbox]" ).each( function () {
                $( this ).removeAttr( 'checked' );
                $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
            } );
            selecionarVideo();
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

/**
 * Remover Linha de Uma tabela espeecifica
 * @param Classe ou ID da Tabela
 * @returns {undefined}
 */
function remover_linha( local ) {
    $( local ).find( "input[type=checkbox]" ).each( function () {
        if ( this.checked === true ) {
            //DataTableMidiasDisponiveis.fnDeleteRow( $( this ).parents( 'tr' ) );
            $( this ).parents( 'tr' ).remove();

        }
    } );
}

function removerArquivo() {

    // localizar todos os Checkbox selecionados
    var obj;
    $( '#TabelaVideoDisponiveis tbody' ).find( "input[type=checkbox]" ).each( function () {
        if ( this.checked === true ) {
            obj = true;
        }
    } );
    if ( obj === true ) {
        var todos = new Array();
        $( "input[type=checkbox][name='check_video[]']:checked" ).each( function () {
            todos.push( $( this ).val() );
        } );
        bootbox.confirm( traducoes[idioma].confirmacao_remover + todos.toString().replace( /,/g, "<br />" ), function ( result ) {
            if ( result === true ) {
                $.ajax( {
                    type: 'POST',
                    url: getUrl() + "manutencao_videos/ajax",
                    dataType: 'json',
                    data: {
                        arquivos: todos,
                        aplicacao_id: $( 'input[name=m_videos_aplicacao_id]' ).val(),
                        acao: "removerArquivo"
                    },
                    error: function ( error ) {
                        console.log( error );
                    },
                    beforeSend: function () {
                        $( 'body' ).find( '.portlet-body-midias-disponiveis' ).each( function () {
                            $( this ).css( {
                                position: 'relative',
                                zoom: 1
                            } );
                            $( this ).append( '<div class="blockUI" style="display:none"></div>' +
                            '<div class="blockUI blockOverlay" style="z-index: 1000; border: none; margin: 0px; padding: 0px; width: 100%; height: 100%; top: 0px; left: 0px; opacity: 0.1; cursor: wait; position: absolute; background-color: rgb(0, 0, 0);"></div>' +
                            '<div class="blockUI blockMsg blockElement" style="z-index: 1011; position: absolute; padding: 0px; margin: 0px; width: 30%; top: 127px; left: 360px; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;"><div class="loading-message "><img style="" src="' + getUrl() + 'assets/img/loading-spinner-grey.gif" align=""></div></div>' );
                        } );
                    },
                    success: function ( data ) {
                        if ( data.sucess ) {
                            $( '.portlet-body-midias-disponiveis' ).html( data.NovaTabela );
                            atualizarDataTable();
                            toastr.success( data.sucess );

                        } else {
                            toastr.warning( data.error );
                        }

                        // limpar campo
                        $( 'input[name=m_videos_selecionados]' ).val( "" );

                        // remover carregando...
                        $( 'body' ).find( '.portlet-body' ).each( function () {
                            $( this ).removeAttr( 'style' );
                        } );
                        $( 'body' ).find( '.blockUI' ).each( function () {
                            $( this ).remove();
                        } );
                    }
                } );
            }
        } );
    }

}

function atualizarDataTable() {
    $( "#TabelaVideoDisponiveis" ).dataTable( {
        "aLengthMenu": [
            [5, 15, 20, -1],
            [5, 15, 20, traducoes[idioma].todos] // change per page values here
        ],
        // set the initial value
        "iDisplayLength": 5,
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ " + traducoes[idioma].registros,
            "oPaginate": {
                "sPrevious": traducoes[idioma].anterior,
                "sNext": traducoes[idioma].proximo
            },
            sEmptyTable: traducoes[idioma].tabela_vazia,
            sInfo: traducoes[idioma].info,
            sInfoEmpty: traducoes[idioma].InfoEmpty
        },
        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [0] },
            { "bSearchable": false, "aTargets": [0] }
        ]
    } ).fnDraw();

    jQuery( '#TabelaVideoDisponiveis .group-checkable' ).change( function () {
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

    jQuery( '#TabelaVideoDisponiveis_wrapper .dataTables_filter input' ).addClass( "form-control  input-inline" ); // modify table search input
    jQuery( '#TabelaVideoDisponiveis_wrapper .dataTables_length select' ).addClass( "form-control input-xsmall" ); // modify table per page dropdown
    jQuery( '#TabelaVideoDisponiveis_wrapper .dataTables_length select' ).select2(); // initialize select2 dropdown

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
