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
    $( '#tab_estatisticas_live' ).on( 'shown.bs.tab', function ( e ) {
        CalendarioEstatisticas( AplicacaoId );
    } );

    /**
     * Calendário
     * @returns {undefined}
     */
    function CalendarioEstatisticas( aplicacao ) {

        $.ajax( {
            type: 'POST',
            url: getUrl() + 'estatisticas/ajax',
            dataType:'json',
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
        if ( $( '#calendario_estatisticas_live' ).width() <= 200 ) {
            $( '#calendario_estatisticas_live' ).addClass( "mobile" );
            h = {
                left: 'title, prev, next',
                center: '',
                right: ''
            };
        } else {
            $( '#calendario_estatisticas_live' ).removeClass( "mobile" );
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
        $( '#calendario_estatisticas_live' ).fullCalendar( 'destroy' ); // destroy the calendar
        $( '#calendario_estatisticas_live' ).fullCalendar( { //re-initialize the calendar
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
                    dataType:'json',
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