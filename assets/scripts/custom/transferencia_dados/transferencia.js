$( document ).ready( function () {

    $( '.tree_arquivos_transferencia' ).jstree( {
        "core": {
            "themes": {
                "responsive": false
            },
            "check_callback": true
        },
        "types": {
            "users": {
                "icon": "fa fa-users icon-info icon-lg"
            },
            "user-super-admin": {
                "icon": "fa fa-user icon-default icon-lg"
            },
            "user-admin": {
                "icon": "fa fa-user icon-black icon-lg"
            },
            "user-revenda": {
                "icon": "fa fa-user icon-danger icon-lg"
            },
            "user-user": {
                "icon": "fa fa-user icon-info icon-lg"
            },
            "aplicacoes": {
                "icon": "fa fa-tasks icon-success icon-lg"
            },
            "aplicacao": {
                "icon": "fa fa-bars icon-success icon-lg"
            },
            "planos": {
                "icon": "fa fa-tags icon-danger icon-lg"
            },
            "plano": {
                "icon": "fa fa-tag icon-danger icon-lg"
            }

        },
        "plugins": ["types", "checkbox", "wholerow"]
    } );

    $( '#select_usuario_origem' ).select2();
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
            usuario_origem: { required: true },
            usuario_destino: { required: true }
        },
        messages: {
            usuario_origem: { required: "Campo Obrigatório" },
            usuario_destino: { required: "Campo Obrigatório" }
        },
        errorPlacement: function ( error, element ) { // render error placement for each input type
            if ( element.attr( "name" ) == "usuario_origem" ) {
                error.insertAfter( $( 'input[name=usuario_origem]' ).parent( ".input-group" ) );
            } else if ( element.attr( "name" ) == "usuario_destino" ) {
                error.insertAfter( $( 'input[name=usuario_destino]' ).parent( ".input-group" ) );
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
    $( '#form_transferencia_dados' ).bootstrapWizard( {
        'nextSelector': '.button-next',
        'previousSelector': '.button-previous',
        onTabClick: function ( tab, navigation, index, clickedIndex ) {
            return false;
        },
        onNext: function ( tab, navigation, index ) {
            success.hide();
            error.html( traducoes[idioma].erros_encontrados ).hide();
            if ( form.valid() == false ) {
                return false;
            }

            if ( index == 1 ) {
                var DadosSelecionados = get_selected();
                if ( DadosSelecionados == '' ) {
                    error.html( 'Selecione os Dados para Transferência.' ).show();
                    return false;
                }
            }

            handleTitle( tab, navigation, index );
        },
        onPrevious: function ( tab, navigation, index ) {
            success.hide();
            error.html( traducoes[idioma].erros_encontrados ).hide();
            handleTitle( tab, navigation, index );
        },
        onTabShow: function ( tab, navigation, index ) {
            if ( index == 1 ) {

                $.ajax( {
                    type: 'POST',
                    url: getUrl() + "transferencia_dados/ajax",
                    dataType: 'json',
                    data: {
                        usuario: $( '#usuario_id_origem' ).val(),
                        acao: "listar_usuarios_destino"
                    },
                    error: function ( error ) {
                        console.log( error );
                    },
                    beforeSend: function () {
                        $( '#usuario_destino' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
                    },
                    success: function ( data ) {
                        $( '#usuario_destino' ).html( data.usuario_destino );
                        $( 'select[name=usuario_destino]' ).select2();
                    }
                } );
            }
            if ( index == 2 ) {

                $.ajax( {
                    type: 'POST',
                    url: getUrl() + "transferencia_dados/ajax",
                    dataType: 'json',
                    data: {
                        usuario_origem: $( 'select[name=usuario_origem]' ).val(),
                        usuario_destino: $( 'select[name=usuario_destino]' ).val(),
                        dados: get_selected_text(),
                        acao: "confirmar_tranferencia"
                    },
                    error: function ( error ) {
                        console.log( error );
                    },
                    beforeSend: function () {

                        $( '#confirm_dados_tranferencia' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
                    },
                    success: function ( data ) {
                        $( '#confirm_usuario_origem' ).text( $( '#usuario_name_origem' ).text() );
                        $( '#confirm_dados_tranferencia' ).html( "" ).html( data.html );
                        $( '.confirm_dados_tranferencia' ).jstree( {
                            "core": {
                                "themes": {
                                    "responsive": false
                                },
                                "check_callback": true
                            },
                            "types": {
                                "users": {
                                    "icon": "fa fa-users icon-info icon-lg"
                                },
                                "user-super-admin": {
                                    "icon": "fa fa-user icon-default icon-lg"
                                },
                                "user-admin": {
                                    "icon": "fa fa-user icon-black icon-lg"
                                },
                                "user-revenda": {
                                    "icon": "fa fa-user icon-danger icon-lg"
                                },
                                "user-user": {
                                    "icon": "fa fa-user icon-info icon-lg"
                                },
                                "aplicacoes": {
                                    "icon": "fa fa-tasks icon-success icon-lg"
                                },
                                "aplicacao": {
                                    "icon": "fa fa-bars icon-success icon-lg"
                                },
                                "planos": {
                                    "icon": "fa fa-tags icon-danger icon-lg"
                                },
                                "plano": {
                                    "icon": "fa fa-tag icon-danger icon-lg"
                                }

                            },
                            "plugins": ["types", "wholerow"]
                        } );
                    }
                } );


                $( '#form_transferencia_dados' ).find( '.button-next' ).hide();
            }
            var total = navigation.find( 'li' ).length;
            var current = index + 1;
            var $percent = ( current / total ) * 100;
            $( '#form_transferencia_dados' ).find( '.progress-bar' ).css( {
                width: $percent + '%'
            } );
        }
    } );

    $( '#form_transferencia_dados' ).find( '.button-previous' ).hide();
    $( '#form_transferencia_dados .button-submit' ).click( function () {

        var url = window.location.pathname;
        var retorno = url.split( "/" );

        $.ajax( {
            type: 'POST',
            url: getUrl() + "transferencia_dados/ajax",
            dataType: 'json',
            data: {
                param: retorno[4],
                usuario_origem: $( '#usuario_id_origem' ).val(),
                usuario_destino: $( 'select[name=usuario_destino]' ).val(),
                dados: get_selected(),
                acao: "transferir_dados"
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {

            },
            success: function ( data ) {

                if ( data ) {
                    $( window.document.location ).attr( 'href', getUrl() + "transferencia_dados/home/" + $( 'select[name=usuario_destino]' ).val() );
                }
            }
        } );

    } ).
        hide();

    var displayConfirm = function () {
        $( '#tab3 .form-control-static', form ).each( function () {
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
        $( '.step-title', $( '#form_transferencia_dados' ) ).text( traducoes[idioma].passos + ' ' + ( index + 1 ) + ' ' + traducoes[idioma].de + ' ' + total );
        // set done steps
        jQuery( 'li', $( '#form_transferencia_dados' ) ).removeClass( "done" );
        var li_list = navigation.find( 'li' );
        for ( var i = 0; i < index; i++ ) {
            jQuery( li_list[i] ).addClass( "done" );
        }

        if ( current == 1 ) {
            $( '#form_transferencia_dados' ).find( '.button-previous' ).hide();
        } else {
            $( '#form_transferencia_dados' ).find( '.button-previous' ).show();
        }

        if ( current >= total ) {
            $( '#form_transferencia_dados' ).find( '.button-next' ).hide();
            $( '#form_transferencia_dados' ).find( '.button-submit' ).show();
            displayConfirm();
        } else {
            $( '#form_transferencia_dados' ).find( '.button-next' ).show();
            $( '#form_transferencia_dados' ).find( '.button-submit' ).hide();
        }
        App.scrollTo( $( '.page-title' ) );
    }
} )
;

function localizar_usuario() {

    var SelectUsuario = $( 'select[name=usuario_origem]' ).val();

    $.ajax( {
        type: 'POST',
        url: getUrl() + 'transferencia_dados/ajax',
        dataType: 'json',
        data: {
            usuario: SelectUsuario,
            acao: "localizar_usuario"
        },
        error: function ( error ) {
            console.log( error );
        },
        beforeSend: function () {
            $( '#dados_transferencia' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif">' );
        },
        success: function ( data ) {

            $( '#dados_transferencia' ).html( data.dados );
            $( '.label_usuario_origem' ).show();
            $( '#usuario_id_origem' ).val( $( 'select[name=usuario_origem]' ).val() );
            $( '#usuario_name_origem' ).text( data.usuario_origem );
            $( 'select[name=usuario_destino]' ).select2();
            $( '.tree_arquivos_transferencia' ).jstree( {
                "core": {
                    "themes": {
                        "responsive": false
                    },
                    "check_callback": true
                },
                "types": {
                    "users": {
                        "icon": "fa fa-users icon-info icon-lg"
                    },
                    "user-super-admin": {
                        "icon": "fa fa-user icon-default icon-lg"
                    },
                    "user-admin": {
                        "icon": "fa fa-user icon-black icon-lg"
                    },
                    "user-revenda": {
                        "icon": "fa fa-user icon-danger icon-lg"
                    },
                    "user-user": {
                        "icon": "fa fa-user icon-info icon-lg"
                    },
                    "aplicacoes": {
                        "icon": "fa fa-tasks icon-success icon-lg"
                    },
                    "aplicacao": {
                        "icon": "fa fa-bars icon-success icon-lg"
                    },
                    "planos": {
                        "icon": "fa fa-tags icon-danger icon-lg"
                    },
                    "plano": {
                        "icon": "fa fa-tag icon-danger icon-lg"
                    }

                },
                "plugins": ["types", "checkbox", "wholerow"]
            } );

            $( '#portlet_transferencia_dados' ).slideDown( 'fast' );
        }
    } );
}

function get_selected_text() {
    var selectedElmsIds = [];
    var selectedElms = $( '.tree_arquivos_transferencia' ).jstree( "get_selected", true );


    var SelectedArray = {};
    var ID;
    var Nome;

    $.each( selectedElms, function () {


        SelectedArray[this.id] = { text: this.text, type: this.type };
    } );
    return SelectedArray;
}

function get_selected() {
    var selectedElmsIds = [];
    var selectedElms = $( '.tree_arquivos_transferencia' ).jstree( "get_selected", true );
    $.each( selectedElms, function () {
        selectedElmsIds.push( this.id );
    } );
    return selectedElmsIds;
}