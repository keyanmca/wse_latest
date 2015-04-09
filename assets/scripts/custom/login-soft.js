var Login = function() {

    var handleLogin = function() {
        $( '.login-form' ).validate( {
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                email: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },
            messages: {
                email: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },
            invalidHandler: function( event, validator ) { //display error alert on form submit
                $( '.alert-danger', $( '.login-form' ) ).show();
            },
            highlight: function( element ) { // hightlight error inputs
                $( element )
                        .closest( '.form-group' ).addClass( 'has-error' ); // set error class to the control group
            },
            success: function( label ) {
                label.closest( '.form-group' ).removeClass( 'has-error' );
                label.remove();
            },
            errorPlacement: function( error, element ) {
                error.insertAfter( element.closest( '.input-icon' ) );
            },
            submitHandler: function( form ) {
                form.submit();
            }
        } );

        $( '.login-form input' ).keypress( function( e ) {
            if ( e.which == 13 ) {
                if ( $( '.login-form' ).validate().form() ) {
                    $( '.login-form' ).submit();
                }
                return false;
            }
        } );
    }

    var handleForgetPassword = function() {
        $( '.forget-form' ).validate( {
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: "Informe seu E-mail.",
                    email: "Informe um E-mail Válido."
                }
            },
            invalidHandler: function( event, validator ) { //display error alert on form submit

            },
            highlight: function( element ) { // hightlight error inputs
                $( element )
                        .closest( '.form-group' ).addClass( 'has-error' ); // set error class to the control group
            },
            success: function( label ) {
                label.closest( '.form-group' ).removeClass( 'has-error' );
                label.remove();
            },
            errorPlacement: function( error, element ) {
                error.insertAfter( element.closest( '.input-icon' ) );
            },
            submitHandler: function( form ) {
                $.ajax( {
                    type: 'POST',
                    url: "/login/recover",
                    data: $( '#login_recover' ).serialize(),
                    dataType: 'json',
                    error: function( error ) {
                        console.log( error );
                    },
                    success: function( data ) {
                        $( '#msg_recover' ).html( '<div class="alert alert-' + data.tipo + '">' + data.msg + '</div>' );
                    }
                } );
                return false;
            }
        } );

        $( '.forget-form input' ).keypress( function( e ) {
            if ( e.which == 13 ) {
                if ( $( '.forget-form' ).validate().form() ) {
                    $( '.forget-form' ).submit();
                }
                return false;
            }
        } );

        jQuery( '#forget-password' ).click( function() {
            jQuery( '.login-form' ).hide();
            jQuery( '.forget-form' ).show();
        } );

        jQuery( '#back-btn' ).click( function() {
            jQuery( '.login-form' ).show();
            jQuery( '.forget-form' ).hide();
        } );

    }

    return {
        //main function to initiate the module
        init: function() {

            handleLogin();
            handleForgetPassword();

            $.backstretch( [
                "assets/img/bg/1.jpg",
                "assets/img/bg/2.jpg",
                "assets/img/bg/3.jpg",
                "assets/img/bg/4.jpg"
            ], {
                fade: 1000,
                duration: 8000
            } );
        }

    };

}();