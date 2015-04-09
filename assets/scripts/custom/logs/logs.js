$( document ).ready( function() {

    if ( window.location.pathname == '/logs' ) {
        mostrarLogs();
        setInterval( function() {
            mostrarLogs();
        }, 60000 );
    }
} );

function mostrarLogs() {
    $.ajax( {
        type: 'POST',
        url: getUrl() + "logs/ajax",
        error: function( error ) {
            console.log( error );
        },
        success: function( data ) {
            $( '#logs_table' ).html( data );
        }
    } );
}