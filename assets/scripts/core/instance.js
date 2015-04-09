jQuery( document ).ready( function () {
    App.init(); // initlayout and core plugins
    Index.init();
    Index.initCharts(); // init index page's custom scripts
    Index.initChat();
    Index.initMiniCharts();
    Index.initDashboardDaterange();
    TableManaged.init();
    FormSamples.init();
    ComponentsEditors.init();
    FormValidation.init();
    $( '.calendario_playlist' ).datetimepicker( {
        format: "dd/mm/yyyy - hh:ii",
        startDate: "-0d",
        autoclose: true,
        todayBtn: true,
        pickerPosition: ( App.isRTL() ? "bottom-right" : "bottom-left" ),
        minuteStep: 10
    } );

    Calendar.init();
    TableAdvanced.init();
    UIGeneral.init();
    UIToastr.init();
    ComponentsDropdowns.init();
    $( '.tablesorter' ).tablesorter();
    $( '.tablesorter_aplicacoes' ).tablesorter( {
        cssChildRow: "tablesorter-childRow",
        headers: { 0: { sorter: false }, 1: { sorter: false }, 8: { sorter: false } }
    } );
    $( '.tablesorter_conversor' ).tablesorter( {
        headers: {
            0: { sorter: false },
            1: { sorter: false },
            6: { sorter: false }
        }
    } );
    $( '.portlet-body' ).slideDown( 'slow' );
    $( '.table-responsive' ).slideDown( 'slow' );
    //$( 'input[type=text]' ).attr( 'maxlength', 80 );

    function check( name, local ) {
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
        //SE ALGUM CHECKBOX EMPRESA FOR DESELECIONADO O CHECKBOX QUE SELECIONA TODOS SERÃ DESCELECIONADO
        $( local ).delegate( "[type=checkbox]", "click", function () {
            if ( this.checked === false ) {
                $( "input[name=" + name + "]" ).each( function () {
                    $( this ).removeAttr( 'checked' );
                    $( this ).parent( 'span' ).removeAttr( 'class', 'checked' );
                } );
            }
        } );
    }

    check( "selectAll", ".tablesorter_conversor tbody" );
    check( "selectAll", ".tablesorter_aplicacoes tbody" );


    if ( $().bootstrapFileInput ) {
        $( 'input[type=file]' ).bootstrapFileInput();
    }
    if ( jQuery.slimScroll ) {
        $( '.scroll_playlist' ).slimScroll( {
            allowPageScroll: true, // allow page scroll when the element scroll is ended
            size: '7px',
            color: ( $( this ).attr( "data-handle-color" ) ? $( this ).attr( "data-handle-color" ) : '#bbb' ),
            railColor: ( $( this ).attr( "data-rail-color" ) ? $( this ).attr( "data-rail-color" ) : '#eaeaea' ),
            position: 'right',
            alwaysVisible: ( $( this ).attr( "data-always-visible" ) == "1" ? true : false ),
            railVisible: ( $( this ).attr( "data-rail-visible" ) == "1" ? true : false ),
            disableFadeOut: true
        } );
    }


    var AlturaBrowser = $( window ).height();
    var AlturaScrollPlailist = parseFloat( AlturaBrowser ) - 480;

    $( '.scroll_playlist' ).css( 'height', AlturaScrollPlailist );
    $( '#midias_scroller' ).css( 'height', parseFloat( AlturaBrowser ) - 350 );
    if ( jQuery.slimScroll ) {
        $( '#midias_scroller' ).slimScroll( {
            allowPageScroll: true, // allow page scroll when the element scroll is ended
            size: '7px',
            color: ( $( this ).attr( "data-handle-color" ) ? $( this ).attr( "data-handle-color" ) : '#bbb' ),
            railColor: ( $( this ).attr( "data-rail-color" ) ? $( this ).attr( "data-rail-color" ) : '#eaeaea' ),
            position: 'right',
            alwaysVisible: ( $( this ).attr( "data-always-visible" ) == "1" ? true : false ),
            railVisible: ( $( this ).attr( "data-rail-visible" ) == "1" ? true : false ),
            disableFadeOut: true
        } );
    }

} );

function msg( tipo, msg ) {
    if ( tipo == 'success' ) {
        toastr.success( msg );
    } else {
        toastr.warning( msg );
    }

}