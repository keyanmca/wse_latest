var FormValidation = function () {

    var FormularioUsuarios = function () {

        var UsuarioForm = $( '#UsuarioForm' );
        var error1 = $( '.alert-danger', UsuarioForm );
        var success1 = $( '.alert-success', UsuarioForm );

        jQuery.validator.addMethod( "testCname", function ( val ) {

            if ( val != '' ) {

                var teste;
                $.ajax( {
                    type: 'POST',
                    url: getUrl() + "usuarios/ajax",
                    async: false,
                    data: {
                        host: val,
                        acao: "test_cname"
                    },
                    success: function ( data ) {
                        console.log( data );
                        teste = data;
                    }
                } );
                if ( teste ) {
                    return true;
                } else {
                    return false;
                }

            }

            return true;

        }, "" ); // Mensagem padrão

        UsuarioForm.validate( {
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                usuario_nome: { minlength: 3, required: true },
                usuario_email: { required: true, email: true },
                usuario_senha: {
                    required: function () {
                        return $( '#usuario_id' ).val() == '';
                    }
                },
                usuario_nivel: { required: true },
                usuario_plano: {
                    required: function () {
                        return $( '#usuario_nivel' ).val() == 3;
                    }
                },
                usuario_whmcs: { number: true },
                usuarios_cname: { required: false, testCname: true }
            },
            messages: {
                usuario_nome: {
                    minlength: traducoes[idioma].usuario_nome_minlength,
                    required: traducoes[idioma].usuario_nome_required
                },
                usuario_email: {
                    email: traducoes[idioma].usuario_email_email,
                    required: traducoes[idioma].usuario_email_required
                },
                usuario_senha: { required: traducoes[idioma].usuario_senha_required },
                usuario_nivel: { required: traducoes[idioma].usuario_nivel_required },
                usuario_plano: { required: traducoes[idioma].usuario_plano_required },
                usuario_whmcs: { number: traducoes[idioma].usuario_whmcs_number },
                usuarios_cname: { testCname: "DNS invalid" }
            },
            errorPlacement: function ( error, element ) { // render error placement for each input type
                var icon = $( element ).parent( '.input-icon' ).children( 'i' );
                icon.removeClass( 'fa-check' ).addClass( "fa-warning" );
                icon.attr( "data-original-title", error.text() ).tooltip( { 'container': 'body' } );
                error.insertAfter( element );
            },
            invalidHandler: function ( event, validator ) { //display error alert on form submit
                success1.hide();
                error1.show();
                App.scrollTo( error1, -200 );
            },
            highlight: function ( element ) { // hightlight error inputs
                $( element )
                    .closest( '.form-group' ).addClass( 'has-error' ); // set error class to the control group
            },
            unhighlight: function ( element ) { // revert the change done by hightlight
                $( element )
                    .closest( '.form-group' ).removeClass( 'has-error' ); // set error class to the control group
            },
            success: function ( label, element ) {
                var icon = $( element ).parent( '.input-icon' ).children( 'i' );
                $( element ).closest( '.form-group' ).removeClass( 'has-error' ).addClass( 'has-success' ); // set success class to the control group
                icon.removeClass( "fa-warning" ).addClass( "fa-check" );
            },
            submitHandler: function ( form ) {
                success1.show();
                error1.hide();
                form.submit();
            }
        } );
    };

    var FormularioPerfil = function () {

        var PerfilForm = $( '#PerfilForms' );
        var error1 = $( '.alert-danger', PerfilForm );
        var success1 = $( '.alert-success', PerfilForm );

        PerfilForm.validate( {
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                usuarios_primeiro_nome: { minlength: 5, required: true },
                usuario_senha_atual: { required: true },
                usuario_nova_senha: { required: true },
                usuario_confirmar_nova_senha: { required: true }
            },
            messages: {
                usuarios_primeiro_nome: {
                    minlength: traducoes[idioma].usuarios_primeiro_nome_minlength,
                    required: traducoes[idioma].usuarios_primeiro_nome_required
                },
                usuario_senha_atual: { required: traducoes[idioma].usuario_senha_atual_required },
                usuario_nova_senha: { required: traducoes[idioma].usuario_nova_senha_required },
                usuario_confirmar_nova_senha: { required: traducoes[idioma].usuario_confirmar_nova_senha_required }
            },
            invalidHandler: function ( event, validator ) { //display error alert on form submit
                success1.hide();
                error1.show();
                App.scrollTo( error1, -200 );
            },
            highlight: function ( element ) { // hightlight error inputs
                $( element )
                    .closest( '.form-group' ).addClass( 'has-error' ); // set error class to the control group
            },
            unhighlight: function ( element ) { // revert the change done by hightlight
                $( element )
                    .closest( '.form-group' ).removeClass( 'has-error' ); // set error class to the control group
            },
            success: function ( label ) {
                label
                    .closest( '.form-group' ).removeClass( 'has-error' ); // set success class to the control group
            },
            submitHandler: function ( form ) {
                success1.show();
                error1.hide();
                form.submit();
            }
        } );
    };

    var FormularioConfiguracoes = function () {
        // for more info visit the official plugin documentation:
        // http://docs.jquery.com/Plugins/Validation

        var ConfiguracoesForm = $( '#ConfiguracoesForm' );
        var error2 = $( '.alert-danger', ConfiguracoesForm );
        var success2 = $( '.alert-success', ConfiguracoesForm );

        ConfiguracoesForm.validate( {
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                config_empresa: { minlength: 5, required: true },
                config_key: { required: true },
                config_idioma: { required: true },
                config_fuso_horario: { required: true },
                config_url: { required: true },
                config_path_instalacao: { required: true },
                config_email_alerta: {
                    required: function () {
                        return $( 'select[name=config_smtp_status]' ).val() == '1';
                    }, email: true
                },
                config_email_reposta: {
                    required: function () {
                        return $( 'select[name=config_smtp_status]' ).val() == '1';
                    }, email: true
                },
                config_smtp_username: {
                    required: function () {
                        return $( 'select[name=config_smtp_status]' ).val() == '1';
                    }
                },
                config_smtp_password: {
                    required: function () {
                        return $( 'select[name=config_smtp_status]' ).val() == '1';
                    }
                },
                config_smtp_host: {
                    required: function () {
                        return $( 'select[name=config_smtp_status]' ).val() == '1';
                    }
                },
                config_smtp_port: {
                    required: function () {
                        return $( 'select[name=config_smtp_status]' ).val() == '1';
                    }
                },
                config_path_java: { required: true },
                config_versao_wowza: { required: true },
                config_user_admin_wowza: { required: true },
                config_pass_admin_wowza: { required: true },
                config_wowza_key: { required: true },
                config_rtmp_port: { required: true },
                config_admin_port: { required: true },
                config_path_vod: { required: true },
                config_ftp_config: { required: true },
                config_ftp_dominio: {
                    required: function () {
                        return $( 'select[name=config_ftp_config]' ).val() == 'cPanel';
                    }
                },
                config_ftp_porta: {
                    required: function () {
                        return $( 'select[name=config_ftp_config]' ).val() != '0';
                    }
                },
                config_ftp_usuario: {
                    required: function () {
                        return $( 'select[name=config_ftp_config]' ).val() == 'cPanel';
                    }
                },
                config_ftp_senha: {
                    required: function () {
                        return $( 'select[name=config_ftp_config]' ).val() == 'cPanel';
                    }
                },
                config_path_wowza: { required: true }
            },
            messages: {
                config_empresa: {
                    minlength: traducoes[idioma].config_empresa_minlength,
                    required: traducoes[idioma].config_empresa_required
                },
                config_key: { required: traducoes[idioma].config_key_required },
                config_idioma: { required: traducoes[idioma].config_idioma_required },
                config_fuso_horario: { required: traducoes[idioma].config_fuso_horario_required },
                config_url: { required: traducoes[idioma].config_url_required },
                config_path_instalacao: { required: traducoes[idioma].config_path_instalacao_required },
                config_email_alerta: {
                    required: traducoes[idioma].config_email_alerta_required,
                    email: traducoes[idioma].config_email_alerta_email
                },
                config_email_reposta: {
                    required: traducoes[idioma].config_email_reposta_required,
                    email: traducoes[idioma].config_email_reposta_email
                },
                config_smtp_username: { required: traducoes[idioma].config_smtp_username_required },
                config_smtp_password: { required: traducoes[idioma].config_smtp_password_required },
                config_smtp_host: { required: traducoes[idioma].config_smtp_host_required },
                config_smtp_port: { required: traducoes[idioma].config_smtp_port_required },
                config_path_java: { required: traducoes[idioma].config_path_java_required },
                config_versao_wowza: { required: traducoes[idioma].config_versao_wowza_required },
                config_user_admin_wowza: { required: traducoes[idioma].config_user_admin_wowza_required },
                config_pass_admin_wowza: { required: traducoes[idioma].config_pass_admin_wowza_required },
                config_wowza_key: { required: traducoes[idioma].config_wowza_key_required },
                config_rtmp_port: { required: traducoes[idioma].config_rtmp_port_required },
                config_admin_port: { required: traducoes[idioma].config_admin_port_required },
                config_path_vod: { required: traducoes[idioma].config_path_vod_required },
                config_ftp_config: { required: traducoes[idioma].config_ftp_config_required },
                config_ftp_dominio: { required: traducoes[idioma].config_ftp_dominio_required },
                config_ftp_porta: { required: traducoes[idioma].config_ftp_porta_required },
                config_ftp_usuario: { required: traducoes[idioma].config_ftp_usuario_required },
                config_ftp_senha: { required: traducoes[idioma].config_ftp_senha_required },
                config_path_wowza: { required: traducoes[idioma].config_path_wowza_required }
            },
            invalidHandler: function ( event, validator ) { //display error alert on form submit
                success2.hide();
                error2.show();
                App.scrollTo( error2, -200 );
            },
            highlight: function ( element ) { // hightlight error inputs
                $( element ).closest( '.form-group' ).removeClass( 'has-success' ).addClass( 'has-error' ); // set error class to the control group
                var valor_tab = $( element ).parents( '.tab-pane' ).attr( 'id' );
                var valor_texto = $.trim( $( 'a[href=#' + valor_tab + ']' ).text() );
                $( 'a[href=#' + valor_tab + ']' ).html( $.trim( valor_texto ) + ' <span class="badge badge-warning" style="padding: 1px 5px 0;"><i class="fa fa-warning"></i></span>' );
            },
            unhighlight: function ( element ) { // revert the change done by hightlight
                $( element ).closest( '.form-group' ).removeClass( 'has-error' ); // set error class to the control group
            },
            success: function ( label ) {
                label.closest( '.form-group' ).removeClass( 'has-error' ).addClass( 'has-success' ); // set success class to the control group
            },
            submitHandler: function ( form ) {
                success2.show();
                error2.hide();
                form.submit();
            }
        } );
    };

    var FormularioConfiguracoesConversor = function () {

        var ConfiguracoesConversorForm = $( '#ConfiguracoesConversorForm' );
        var error3 = $( '.alert-danger', ConfiguracoesConversorForm );
        var success3 = $( '.alert-success', ConfiguracoesConversorForm );

        ConfiguracoesConversorForm.validate( {
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                config_path_ffmpeg: { required: true },
                config_conversor_qtd_video: { required: true }
            },
            messages: {
                config_path_ffmpeg: { required: traducoes[idioma].config_path_ffmpeg_required },
                config_conversor_qtd_video: { required: traducoes[idioma].config_conversor_qtd_video_required }
            },
            invalidHandler: function ( event, validator ) { //display error alert on form submit
                success3.hide();
                error3.show();
                App.scrollTo( error3, -200 );
            },
            highlight: function ( element ) { // hightlight error inputs
                $( element ).closest( '.form-group' ).removeClass( 'has-success' ).addClass( 'has-error' ); // set error class to the control group
            },
            unhighlight: function ( element ) { // revert the change done by hightlight
                $( element ).closest( '.form-group' ).removeClass( 'has-error' ); // set error class to the control group
            },
            success: function ( label ) {
                label.closest( '.form-group' ).removeClass( 'has-error' ).addClass( 'has-success' ); // set success class to the control group
            },
            submitHandler: function ( form ) {
                success3.show();
                error3.hide();
                form.submit();
            }
        } );
    };

    var FormularioPlanos = function () {

        var PlanosForm = $( '#PlanosForm' );
        var error3 = $( '.alert-danger', PlanosForm );
        var success3 = $( '.alert-success', PlanosForm );

        jQuery.validator.addMethod( "verifcarPlugins", function ( login ) {
            var todos = new Array();
            $( "input[type=checkbox][name='plano_id_plugin[]']" ).each( function () {
                todos.push( $( this ).val() );
            } );

            if ( todos.length > 0 ) {
                return true;
            } else {
                return false;
            }

        }, "Nenhum Plugin Selecionado" ); // Mensagem padrão

        PlanosForm.validate( {
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                plano_nome: { minlength: 5, required: true },
                plano_acessos: { required: true, number: true },
                plano_bitrate: { required: true, number: true },
                plano_trafego: { required: true },
                plano_espaco_disco: { required: true },
                plano_qtd_servidores: {
                    required: function () {
                        return $( 'input[type=checkbox]:checked' ).val() == 'revenda';
                    }
                },
                plano_id_servidor: { required: true },
                plano_plugins_selecionados: { required: true, verifcarPlugins: true }
            },
            messages: {
                plano_nome: {
                    minlength: traducoes[idioma].plano_nome_minlength,
                    required: traducoes[idioma].plano_nome_required
                },
                plano_acessos: {
                    required: traducoes[idioma].plano_acessos_required,
                    number: traducoes[idioma].plano_acessos_number
                },
                plano_bitrate: { required: traducoes[idioma].plano_bitrate_required },
                plano_trafego: { required: traducoes[idioma].plano_trafego_required },
                plano_espaco_disco: { required: traducoes[idioma].plano_espaco_disco_required },
                plano_qtd_servidores: {
                    number: traducoes[idioma].plano_qtd_servidores_number,
                    required: traducoes[idioma].plano_qtd_servidores_required
                },
                plano_id_servidor: { required: traducoes[idioma].plano_id_servidor_required },
                plano_plugins_selecionados: { required: traducoes[idioma].plano_id_plugin_required }
            },
            errorPlacement: function ( error, element ) { // render error placement for each input type
                if ( element.attr( "name" ) == "plano_bitrate" ) {
                    error.insertAfter( element.parent( ".input-group" ) );
                    //} else if ( element.attr( "name" ) == "plano_plugins_selecionados" ) { // for uniform radio buttons, insert the after the given container
                    //    toastr.warning( 'Nenhum Plugin Selecionado!' );
                } else {
                    error.insertAfter( element ); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function ( event, validator ) { //display error alert on form submit
                success3.hide();
                error3.show();
                App.scrollTo( error3, -200 );
            },
            highlight: function ( element ) { // hightlight error inputs
                $( element ).closest( '.form-group' ).removeClass( 'has-success' ).addClass( 'has-error' ); // set error class to the control group
            },
            unhighlight: function ( element ) { // revert the change done by hightlight
                $( element ).closest( '.form-group' ).removeClass( 'has-error' ); // set error class to the control group
            },
            success: function ( label ) {
                label.closest( '.form-group' ).removeClass( 'has-error' ).addClass( 'has-success' ); // set success class to the control group
            },
            submitHandler: function ( form ) {
                success3.show();
                error3.hide();
                form.submit();
            }
        } );
    };

    var FormularioAplicacoes = function () {
        var AplicacoesForm = $( '#AplicacoesForm' );
        var error3 = $( '.alert-danger', AplicacoesForm );
        var success3 = $( '.alert-success', AplicacoesForm );
        AplicacoesForm.validate( {
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                aplicacoes_user_id: { required: true },
                aplicacoes_acessos: { required: true, number: true },
                aplicacoes_bitrate: { required: true, number: true },
                aplicacoes_trafego: { required: true },
                aplicacoes_espaco_disco: { required: true },
                aplicacoes_id_servidor: { required: true },
                aplicacoes_id_plugin: { required: true },
                aplicacoes_nome: { required: true },
                aplicacoes_ftp_usuario: { required: true },
                aplicacoes_ftp_senha: { required: true },
                aplicacoes_ftp_porta: { required: true },
                aplicacoes_senha: { required: true, minlength: 5 },
                aplicacoes_shoutcast_host: {
                    required: function () {
                        if ( $( '#aplicacoes_id_plugin' ).val() == 4 ) {
                            return $( '#aplicacoes_id_plugin' ).val() == 4;
                        } else if ( $( '#aplicacoes_id_plugin' ).val() == 6 ) {
                            return $( '#aplicacoes_id_plugin' ).val() == 6;
                        }
                    }
                },
                aplicacoes_live_authentication: {
                    equalTo: function () {
                        if ( $( '#aplicacoes_hotlinks' ).val() != '' ) {
                            return $( 'select[name=aplicacoes_live_authentication]' ).val() == 'true';
                        }
                        return true;
                    }
                }
            },
            messages: {
                aplicacoes_user_id: { required: traducoes[idioma].aplicacoes_user_id_required },
                aplicacoes_acessos: {
                    required: traducoes[idioma].aplicacoes_acessos_required,
                    number: traducoes[idioma].aplicacoes_acessos_number
                },
                aplicacoes_bitrate: { required: traducoes[idioma].aplicacoes_bitrate_required },
                aplicacoes_trafego: { required: traducoes[idioma].aplicacoes_trafego_required },
                aplicacoes_espaco_disco: { required: traducoes[idioma].aplicacoes_espaco_disco_required },
                aplicacoes_id_servidor: { required: traducoes[idioma].aplicacoes_id_servidor_required },
                aplicacoes_id_plugin: { required: traducoes[idioma].aplicacoes_id_plugin_required },
                aplicacoes_nome: { required: traducoes[idioma].aplicacoes_nome_required },
                aplicacoes_ftp_usuario: { required: traducoes[idioma].aplicacoes_ftp_usuario_required },
                aplicacoes_ftp_senha: { required: traducoes[idioma].aplicacoes_ftp_senha_required },
                aplicacoes_ftp_porta: { required: traducoes[idioma].aplicacoes_ftp_porta_required },
                aplicacoes_senha: {
                    required: traducoes[idioma].aplicacoes_senha_required,
                    minlength: traducoes[idioma].aplicacoes_senha_minlength
                },
                aplicacoes_live_authentication: {
                    equalTo: traducoes[idioma].aplicacoes_auth_bloqueio_ip
                }
            },
            errorPlacement: function ( error, element ) { // render error placement for each input type
                if ( element.attr( "name" ) == "aplicacoes_bitrate" ) {
                    error.insertAfter( $( 'input[name=aplicacoes_bitrate]' ).parent( ".input-group" ) );
                } else {
                    error.insertAfter( element ); // for other inputs, just perform default behavior
                }
            },
            invalidHandler: function ( event, validator ) { //display error alert on form submit
                success3.hide();
                error3.show();
                App.scrollTo( error3, -200 );
            },
            highlight: function ( element ) { // hightlight error inputs
                $( element ).closest( '.form-group' ).removeClass( 'has-success' ).addClass( 'has-error' ); // set error class to the control group
            },
            unhighlight: function ( element ) { // revert the change done by hightlight
                $( element ).closest( '.form-group' ).removeClass( 'has-error' ); // set error class to the control group
            },
            success: function ( label ) {
                label.closest( '.form-group' ).removeClass( 'has-error' ).addClass( 'has-success' ); // set success class to the control group
            },
            submitHandler: function ( form ) {
                success3.show();
                error3.hide();
                form.submit();
            }
        } );
    };

    var FormularioUsuariosAlterarSenha = function () {

        var UsuarioAlterarSenha = $( '#UsuarioAlterarSenha' );
        var error3 = $( '.alert-danger', UsuarioAlterarSenha );
        var success3 = $( '.alert-success', UsuarioAlterarSenha );

        UsuarioAlterarSenha.validate( {
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                usuario_nova_senha: {
                    required: true
                },
                usuario_confirmar_nova_senha: {
                    required: true,
                    equalTo: "#usuario_nova_senha"
                }
            },
            messages: {
                usuario_nova_senha: { required: traducoes[idioma].alterar_senha_usuario_nova_senha_required },
                usuario_confirmar_nova_senha: {
                    required: traducoes[idioma].alterar_senha_usuario_confirmar_nova_senha_required,
                    equalTo: traducoes[idioma].alterar_senha_usuario_confirmar_nova_senha_equalTo
                }
            },
            errorPlacement: function ( error, element ) { // render error placement for each input type
                if ( element.parent( ".input-group" ).size() > 0 ) {
                    error.insertAfter( element.parent( ".input-group" ) );
                } else if ( element.attr( "data-error-container" ) ) {
                    error.appendTo( element.attr( "data-error-container" ) );
                }
            },
            invalidHandler: function ( event, validator ) { //display error alert on form submit
                success3.hide();
                error3.show();
                App.scrollTo( error3, -200 );
            },
            highlight: function ( element ) { // hightlight error inputs
                $( element )
                    .closest( '.form-group' ).addClass( 'has-error' ); // set error class to the control group
            },
            unhighlight: function ( element ) { // revert the change done by hightlight
                $( element )
                    .closest( '.form-group' ).removeClass( 'has-error' ); // set error class to the control group
            },
            success: function ( label ) {
                label
                    .closest( '.form-group' ).removeClass( 'has-error' ); // set success class to the control group
            },
            submitHandler: function ( form ) {
                success3.show();
                error3.hide();
                form.submit();
            }
        } );
    }

    var handleWysihtml5 = function () {
        if ( !jQuery().wysihtml5 ) {
            return;
        }
        if ( $( '.wysihtml5' ).size() > 0 ) {
            $( '.wysihtml5' ).wysihtml5( {
                "stylesheets": ["assets/plugins/bootstrap-wysihtml5/wysiwyg-color.css"]
            } );
        }
    };
    return {
        //main function to initiate the module
        init: function () {
            handleWysihtml5();
            FormularioConfiguracoes();
            FormularioConfiguracoesConversor();
            FormularioUsuarios();
            FormularioPlanos();
            FormularioAplicacoes();
            FormularioPerfil();
            FormularioUsuariosAlterarSenha();

        }
    };
}();