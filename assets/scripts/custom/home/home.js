$( document ).ready( function () {

    rede_dashboard_stat();

    /**
     * Atualização Acessos HOME
     */
    mostrarAcessosHome();
    setInterval( function () {
        mostrarAcessosHome();
        //rede();
    }, 10000 );

    setInterval( function () {
        rede_dashboard_stat();
    }, 5000 );
} );

function mostrarAcessosHome() {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "home/ajax",
        dataType: 'json',
        data: {
            acao: "mostrarAcessos"
        },
        error: function ( error ) {
            console.log( error );

        },
        success: function ( data ) {
            $( '.msg_proftpd' ).html( data.proftpd );
            $( '#total_conexoes_wowza' ).html( data.total_conexoes_wowza );
            $( '#TabelaAcessosHome' ).html( data.TabelaAcessos );
        }
    } );
}

function rede() {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "home/ajax",
        data: {
            acao: "rede"
        },
        error: function ( error ) {
        },
        success: function ( data ) {
            console.log( data );
        }
    } );
}

function rede_dashboard_stat() {

    $.ajax( {
        type: 'POST',
        url: getUrl() + "home/ajax",
        dataType: 'json',
        data: {
            acao: "rede_dashboard_stat"
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {
            $( '.s_rederx' ).text( data.rx );
            $( '.s_redetx' ).text( data.tx );
        }
    } );
}


$( document ).ready( function () {
    var options = {
        series: {
            shadowSize: 1
        },
        lines: {
            show: true,
            lineWidth: 0.5,
            fill: true,
            fillColor: {
                colors: [{
                    opacity: 0.1
                }, {
                    opacity: 1
                }
                ]
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            tickColor: "#eee"
        },
        xaxis: { mode: "time" },
        colors: ["#6ef146"],
        grid: {
            tickColor: "#eee",
            borderWidth: 0
        }

    };
    var data = [];
    var placeholder = $( "#chart_4" );

    $.plot( placeholder, data, options );

    var iteration = 0;

    function fetchData() {
        ++iteration;

        function onDataReceived( series ) {

            // we get all the data in one go, if we only got partial
            // data, we could merge it with what we already got

            data = [series];

            //    console.log( series );

            $.plot( $( "#chart_4" ), data, options );
            fetchData();
        }

        $.ajax( {
            url: getUrl() + "home/ajax",
            method: 'POST',
            dataType: 'json',
            data: {
                acao: "rede"
            },
            success: onDataReceived
        } );

    }

    setTimeout( fetchData, 30 );
} );