$( document ).ready( function () {

    Portfolio.init();

    // Verificar a URL
    var url = window.location.pathname;
    // Separar ( explode ) nas barras
    var retorno = url.split( "/" );
    // Verifica se o Terceiro Parametro da URL é alguma Aplicação
    if ( retorno[2] == 'aplicacao' ) {
        // Armazena o Id da Aplicação
        var AplicacaoId = retorno[3];
        //CalendarioEstatisticas( AplicacaoId );

        $( '#playlist_inicio' ).datetimepicker( {
            format: "dd/mm/yyyy - hh:ii",
            autoclose: true,
            todayBtn: true,
            pickerPosition: ( App.isRTL() ? "bottom-right" : "bottom-left" ),
            minuteStep: 10
        } ).datetimepicker( 'update', new Date() );
        $( '#playlist_fim' ).datetimepicker( {
            format: "dd/mm/yyyy - hh:ii",
            autoclose: true,
            todayBtn: true,
            pickerPosition: ( App.isRTL() ? "bottom-right" : "bottom-left" ),
            minuteStep: 10
        } ).datetimepicker( 'update', new Date() );

    }
    $( '#aba_estatisticas_tvstation' ).on( 'shown.bs.tab', function ( e ) {
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
                console.log( data );
                if ( data ) {
                    $( '#TabelaAcessosAplicacao' ).html( data.TABLE );
                    DataTable();
                }
            }
        } );

        var h = {};
        var div_calendario = $( '#calendario_estatisticas_tvstation' );
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

                GraficoDiario( aplicacao, AnoInicio + '-' + MesInicio + '-' + DiaInicio, AnoFim + '-' + MesFim + '-' + DiaFim );

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


function get_playlist_modal( id, tipo, nome, inicio ) {

    $( '#playlist_id' ).val( id );
    $( '#playlist_nome' ).val( nome );
    $( '#playlist_inicio' ).val( inicio );
    $( '#playlist_tipo option[value="' + tipo + '"]' ).attr( 'selected', 'selected' );
    $( '#playlist_tipo' ).select2();

}


function deletar_playlist() {

    var AplicacaoId = $( '#aplicacao_id' ).val();

    $.ajax( {
        type: 'POST',
        url: getUrl() + 'tvstation/deletar_playlist',
        data: {
            id_playlist: $( '#playlist_id' ).val(),
            id_aplicacao: AplicacaoId,
            redirecionar: 'ajax'
        },
        success: function () {

            window.location.href = getUrl() + 'tvstation/aplicacao/' + AplicacaoId + '/#tab_playlist';
        }
    } );


}

