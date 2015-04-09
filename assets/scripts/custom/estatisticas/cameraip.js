$( document ).ready( function () {

// Verificar a URL
    var url = window.location.pathname;
    // Separar ( explode ) nas barras
    var retorno = url.split( "/" );
    // Verifica se o Terceiro Parametro da URL é alguma Aplicação
    if ( retorno[2] == 'aplicacao' ) {
        // Armazena o Id da Aplicação
        var AplicacaoId = retorno[3];
    }
    if ( retorno[1] === 'cameraip' ) {
        CalendarioEstatisticas( AplicacaoId );
    }

    /**
     * Calendário
     * @returns {undefined}
     */
    function CalendarioEstatisticas( aplicacao ) {

        $.ajax( {
            type: 'POST',
            url: getUrl() + 'estatisticas/ajax',
            dataType: 'json',
            data: {
                aplicacao: aplicacao,
                acao: 'getDadosTabela'
            },
            error: function ( error ) {
                console.log( error );
            },
            beforeSend: function () {
                $( '#TabelaAcessosAplicacao' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" />' );
            },
            success: function ( data ) {
                if ( data ) {
                    $( '#TabelaAcessosAplicacao' ).html( data.TABLE );
                    DataTable();
                }


            }
        } );

        var h = {};
        var div_calendario = $( '#calendario_estatisticas_cameraip' );
        if ( div_calendario.width() <= 200 ) {
            div_calendario.addClass( "mobile" );
            h = {
                left: 'title, prev, next',
                center: '',
                right: ''
            };
        } else {
            div_calendario.removeClass( "mobile" );
            if ( App.isRTL() ) {
                h = {
                    right: 'title',
                    center: '',
                    left: 'prev,next'
                };
            } else {
                h = {
                    left: 'title',
                    center: '',
                    right: 'prev,next'
                };
            }
        }
        div_calendario.fullCalendar( 'destroy' ); // destroy the calendar
        div_calendario.fullCalendar( { //re-initialize the calendar
            disableDragging: false,
            header: h,
            editable: true,
            selectable: true,
            select: function ( startDate, endDate, allDay, jsEvent, view ) {
                var AnoInicio = startDate.getFullYear();
                var MesInicio = ( parseFloat( startDate.getMonth() ) + 1 ) < 10 ? '0' + ( parseFloat( startDate.getMonth() ) + 1 ) : ( parseFloat( startDate.getMonth() ) + 1 );
                var DiaInicio = startDate.getDate() < 10 ? '0' + startDate.getDate() : startDate.getDate();
                var AnoFim = endDate.getFullYear();
                var MesFim = ( parseFloat( endDate.getMonth() ) + 1 ) < 10 ? '0' + ( parseFloat( endDate.getMonth() ) + 1 ) : ( parseFloat( endDate.getMonth() ) + 1 );
                var DiaFim = endDate.getDate() < 10 ? '0' + endDate.getDate() : endDate.getDate();

                GraficoDiario( aplicacao, AnoInicio + '-' + MesInicio + '-' + DiaInicio, AnoFim + '-' + MesFim + '-' + DiaFim )

                $.ajax( {
                    type: 'POST',
                    url: getUrl() + 'estatisticas/ajax',
                    dataType: 'json',
                    data: {
                        aplicacao: aplicacao,
                        data_inicio: AnoInicio + '-' + MesInicio + '-' + DiaInicio,
                        data_fim: AnoFim + '-' + MesFim + '-' + DiaFim,
                        acao: 'getDadosTabela'
                    },
                    error: function ( error ) {
                        console.log( error );
                    },
                    beforeSend: function () {
                        $( '#TabelaAcessosAplicacao' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" />' );
                    },
                    success: function ( data ) {
                        if ( data ) {
                            $( '#TabelaAcessosAplicacao' ).html( data.TABLE );
                            DataTable();
                        }


                    }
                } );
            }
        } );
    }

} );