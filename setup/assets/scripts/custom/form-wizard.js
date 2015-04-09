var FormWizard = function () {
    return {
        init: function () {
            if ( !jQuery().bootstrapWizard ) {
                return;
            }
            function format( state ) {
                if ( !state.id )
                    return state.text; // optgroup
                return "<img class='flag' src='assets/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }

            $( "#country_list" ).select2( {
                placeholder: "Select",
                allowClear: true,
                formatResult: format,
                formatSelection: format,
                escapeMarkup: function ( m ) {
                    return m;
                }
            } );
            var form = $( '#submit_form' );
            var error = $( '.alert-danger', form );
            var success = $( '.alert-success', form );
            jQuery.validator.addMethod( "verifcarPasta", function ( diretorio, element ) {
                var teste;
                $.ajax( {
                    type: 'POST',
                    url: "php/functions_setup.php",
                    async: false,
                    data: {
                        diretorio: diretorio,
                        acao: "verifcarPasta"
                    },
                    success: function ( data ) {
                        teste = data;
                    }
                } );
                if ( teste ) {
                    return true;
                } else {
                    return false;
                }

            }, "Pasta não Encontrada" ); // Mensagem padrão

            jQuery.validator.addMethod( "verifcarLoginWowza", function ( login ) {
                var teste;
                $.ajax( {
                    type: 'POST',
                    url: "php/functions_setup.php",
                    async: false,
                    data: {
                        dir_instalacao_wowza: $( 'input[name=dir_instalacao_wowza]' ).val(),
                        login: login,
                        acao: "verifcarLoginWowza"
                    },
                    success: function ( data ) {
                        teste = data;
                    }
                } );
                if ( teste ) {
                    return true;
                } else {
                    return false;
                }

            }, "Login informado está Incorreto" ); // Mensagem padrão

            jQuery.validator.addMethod( "verifcarSenhaWowza", function ( senha ) {
                var teste;
                $.ajax( {
                    type: 'POST',
                    url: "php/functions_setup.php",
                    async: false,
                    data: {
                        dir_instalacao_wowza: $( 'input[name=dir_instalacao_wowza]' ).val(),
                        senha: senha,
                        acao: "verifcarSenhaWowza"
                    },
                    success: function ( data ) {
                        teste = data;
                    }
                } );
                if ( teste ) {
                    return true;
                } else {
                    return false;
                }

            }, "Senha informada está Incorreta" ); // Mensagem padrão

            jQuery.validator.addMethod( "verifcarConexao", function ( senha ) {
                var teste;
                $.ajax( {
                    type: 'POST',
                    url: "php/functions_setup.php",
                    async: false,
                    dataType: 'json',
                    data: {
                        hostname: $( 'input[name=hostname]' ).val(),
                        database: $( 'input[name=database]' ).val(),
                        db_username: $( 'input[name=db_username]' ).val(),
                        db_password: $( 'input[name=db_password]' ).val(),
                        acao: "verifcarConexao"
                    },
                    success: function ( data ) {
                        console.log(data);
                        teste = data;
                    }
                } );
                if ( teste ) {
                    return true;
                } else {
                    return false;
                }

            }, "Não Foi Possível Conexão com o Banco de Dados" ); // Mensagem padrão

            form.validate( {
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    hostname: { required: true },
                    database: { required: true },
                    db_username: { required: true },
                    db_password: { required: true, verifcarConexao: true },
                    nome_empresa: { required: true },
                    wse_licenca: { required: true },
                    idioma: { required: true },
                    fuso_horario: { required: true },
                    wse_url: { required: true, url: true },
                    url_path: { required: true },
                    wse_usuario_admin: { required: true, email: true },
                    wse_senha_admin: { required: true, minlength: 5 },
                    email_alerta: { email: true },
                    email_resposta: { email: true },
                    smtp_usuario: {},
                    smtp_senha: {},
                    smtp_host: {},
                    smtp_port: { number: true },
                    smtp_status: {},
                    dir_instalacao_wowza: { required: true },
                    versao_wowza: { required: true },
                    admin_wowza: { required: true },
                    senha_wowza: { required: true },
                    licenca_wowza: { required: true },
                    porta_rtmp_wowza: { required: true, minlength: 4, number: true },
                    porta_admin_wowza: { required: true, minlength: 4, number: true },
                    dir_vod: { required: true, verifcarPasta: true },
                    ftp_dominio: {
                        required: function () {
                            return $( '#configuracao_ftp' ).val() === 'cPanel';
                        }
                    },
                    ftp_porta: {
                        required: function () {
                            return $( '#configuracao_ftp' ).val() !== '0';
                        },
                        minlength: function () {
                            return $( '#configuracao_ftp' ).val() !== '0';
                        },
                        number: function () {
                            return $( '#configuracao_ftp' ).val() !== '0';
                        }
                    },
                    ftp_usuario: {
                        required: function () {
                            return $( '#configuracao_ftp' ).val() === 'cPanel';
                        }
                    },
                    ftp_senha: {
                        required: function () {
                            return $( '#configuracao_ftp' ).val() === 'cPanel';
                        }
                    }
                },
                messages: { // custom messages for radio buttons and checkboxes
                    hostname: { required: "Campo Obrigatório" },
                    database: { required: "Campo Obrigatório" },
                    db_username: { required: "Campo Obrigatório" },
                    db_password: {
                        required: "Campo Obrigatório",
                        verifcarConexao: "Erro ao Conctar com o Banco de Dados"
                    },
                    nome_empresa: { required: "Campo Obrigatório" },
                    wse_licenca: { required: "Campo Obrigatório" },
                    idioma: { required: "Campo Obrigatório" },
                    fuso_horario: { required: "Campo Obrigatório" },
                    wse_url: { required: "Campo Obrigatório", url: "Informe a Url do Sistema" },
                    url_path: { required: "Campo Obrigatório" },
                    wse_usuario_admin: { required: "Campo Obrigatório", email: "Informe um E-mail Válido" },
                    wse_senha_admin: { required: "Campo Obrigatório", minlength: "Mínimo 5 digitos" },
                    email_alerta: { required: "Campo Obrigatório", email: "Informe um E-mail Válido" },
                    email_resposta: { required: "Campo Obrigatório", email: "Informe um E-mail Válido" },
                    smtp_usuario: { required: "Campo Obrigatório" },
                    smtp_senha: { required: "Campo Obrigatório" },
                    smtp_host: { required: "Campo Obrigatório" },
                    smtp_port: { required: "Campo Obrigatório", number: "Informe Somente Números" },
                    smtp_status: { required: "Campo Obrigatório" },
                    dir_instalacao_wowza: { required: "Campo Obrigatório" },
                    versao_wowza: { required: "Campo Obrigatório" },
                    admin_wowza: { required: "Campo Obrigatório" },
                    senha_wowza: { required: "Campo Obrigatório" },
                    licenca_wowza: { required: "Campo Obrigatório" },
                    porta_rtmp_wowza: {
                        required: "Campo Obrigatório",
                        minlength: "Mínimo 4 digitos",
                        number: "Informe Somente Números"
                    },
                    porta_admin_wowza: {
                        required: "Campo Obrigatório",
                        minlength: "Mínimo 4 digitos",
                        number: "Informe Somente Números"
                    },
                    dir_vod: { required: "Campo Obrigatório" },
                    ftp_dominio: { required: "Campo Obrigatório" },
                    ftp_porta: {
                        required: "Campo Obrigatório",
                        minlength: "Mínimo 4 digitos",
                        number: "Informe Somente Números"
                    },
                    ftp_usuario: { required: "Campo Obrigatório" },
                    ftp_senha: { required: "Campo Obrigatório" }
                },
                errorPlacement: function ( error, element ) { // render error placement for each input type
                    var icon = $( element ).parent( '.input-icon' ).children( 'i' );
                    icon.removeClass( 'fa-check' ).addClass( "fa-warning" );
                    icon.attr( "data-original-title", error.text() ).tooltip( { 'container': 'body' } );
                    error.insertAfter( element );
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
                success: function ( label, element ) {
                    var icon = $( element ).parent( '.input-icon' ).children( 'i' );
                    $( element ).closest( '.form-group' ).removeClass( 'has-error' ).addClass( 'has-success' ); // set success class to the control group
                    icon.removeClass( "fa-warning" ).addClass( "fa-check" );
                },
                submitHandler: function ( form ) {
                    success.show();
                    error.hide();
                }
            } );
            var displayConfirm = function () {
                $( '#tab7 .form-control-static', form ).each( function () {
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
                    } else if ( $( this ).attr( "data-display" ) === 'payment' ) {
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
                $( '.step-title', $( '#form_wizard_1' ) ).text( 'Step ' + ( index + 1 ) + ' of ' + total );
                // set done steps
                jQuery( 'li', $( '#form_wizard_1' ) ).removeClass( "done" );
                var li_list = navigation.find( 'li' );
                for ( var i = 0; i < index; i++ ) {
                    jQuery( li_list[i] ).addClass( "done" );
                }

                if ( current === 1 ) {
                    $( '#form_wizard_1' ).find( '.button-previous' ).hide();
                } else {
                    $( '#form_wizard_1' ).find( '.button-previous' ).show();
                }

                if ( current >= total ) {
                    $( '#form_wizard_1' ).find( '.button-next' ).hide();
                    $( '#form_wizard_1' ).find( '.button-submit' ).show();
                    displayConfirm();
                } else {
                    $( '#form_wizard_1' ).find( '.button-next' ).show();
                    $( '#form_wizard_1' ).find( '.button-submit' ).hide();
                }
                App.scrollTo( $( '.page-title' ) );
            };

// default form wizard
            $( '#form_wizard_1' ).bootstrapWizard( {
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function ( tab, navigation, index, clickedIndex ) {
                    success.hide();
                    error.hide();
                    if ( form.valid() === false ) {
                        return false;
                    }
                    handleTitle( tab, navigation, clickedIndex );
                },
                onNext: function ( tab, navigation, index ) {
                    success.hide();
                    error.hide();
                    if ( form.valid() === false ) {
                        return false;
                    }
                    if ( $( "td" ).hasClass( "error" ) ) {
                        error.html( 'Alguns erros foram encontrados, por favor verifique os Campos Abaixo!' ).show();
                        return false;
                    }
                    handleTitle( tab, navigation, index );
                },
                onPrevious: function ( tab, navigation, index ) {
                    success.hide();
                    error.hide();
                    handleTitle( tab, navigation, index );
                },
                onTabShow: function ( tab, navigation, index ) {
                    var total = navigation.find( 'li' ).length;
                    var current = index + 1;
                    var $percent = ( current / total ) * 100;
                    $( '#form_wizard_1' ).find( '.progress-bar' ).css( {
                        width: $percent + '%'
                    } );
                }
            } );
            $( '#form_wizard_1' ).find( '.button-previous' ).hide();
            $( '#form_wizard_1 .button-submit' ).click( function () {

                $.ajax( {
                    type: 'POST',
                    url: "php/functions_setup.php",
                    data: form.serialize(),
                    error: function ( erro ) {
                        var error = $( '.alert-danger' );
                        error.text( erro.responseText ).show();
                        console.log( erro );
                    },
                    beforeSend: function () {
                        $( '.button-submit' ).html( '<img src="assets/img/gif-windows8.gif" /> Salvando...' );
                    },
                    success: function ( data ) {
                        console.log( data );
                        $( '.button-submit' ).remove();
                        App.scrollTo( $( '.page-title' ) );
                        if ( data ) {
                            $( '.alert-success' ).html( data ).show();
                            App.scrollTo( $( '.page-title' ) );
                        }
                    }
                } );
            } ).hide();
        }
    };
}();