$( document ).ready( function () {

    // Verificar a URL
    var url = window.location.pathname;
    // Separar ( explode ) nas barras
    var retorno = url.split( "/" );

    // Verifica se o Terceiro Parametro da URL é alguma Aplicação


    if ( retorno[1] == 'estatisticas' ) {

        //estatisticas_home();

        CalendarioEstatisticas();
        /**
         * Registro de Acessos Diário
         */
        GraficoDiario();
    }

    $( '#statistics_sete_dias_tab' ).on( 'shown.bs.tab', function ( e ) {
        /**
         * Registro de Acessos 7 Dias
         */
        $.ajax( {
            type: "POST",
            url: getUrl() + 'estatisticas/ajax',
            dataType: "json",
            data: {
                acao: 'getDados7Dias'
            },
            error: function ( error ) {
                console.log( error );
            },
            success: function ( visitors ) {
                $( '#TotalAcessosSeteDias' ).text( visitors.TotalAcessos );
                $( '#MaiorAcessoSeteDias' ).text( visitors.MaiorAcesso );
                PlotGrafico( visitors.date, $( '#site_statistics_sete_dias' ), $( '#site_statistics_loading_sete_dias' ), $( '#site_statistics_content_sete_dias' ) );
            }
        } );
    } );
    $( '#statistics_quatorze_dias_tab' ).on( 'shown.bs.tab', function ( e ) {
        /**
         * Registro de Acessos 7 Dias
         */
        $.ajax( {
            type: "POST",
            url: getUrl() + 'estatisticas/ajax',
            dataType: "json",
            data: {
                acao: 'getDados14Dias'
            },
            error: function ( error ) {
                console.log( error );
            },
            success: function ( visitors ) {
                $( '#TotalAcessosQuatorzeDias' ).text( visitors.TotalAcessos );
                $( '#MaiorAcessoQuatorzeDias' ).text( visitors.MaiorAcesso );
                PlotGrafico( visitors.date, $( '#site_statistics_quatorze_dias' ), $( '#site_statistics_loading_quatorze_dias' ), $( '#site_statistics_content_quatorze_dias' ) );
            }
        } );
    } );
    $( '#statistics_mes_tab' ).on( 'shown.bs.tab', function ( e ) {
        /**
         * Registro de Acessos 7 Dias
         */
        $.ajax( {
            type: "POST",
            url: getUrl() + 'estatisticas/ajax',
            dataType: "json",
            data: {
                acao: 'getDados30Dias'
            },
            error: function ( error ) {
                console.log( error );
            },
            success: function ( visitors ) {
                $( '#TotalAcessosTrintaDias' ).text( visitors.TotalAcessos );
                $( '#MaiorAcessoTrintaDias' ).text( visitors.MaiorAcesso );
                PlotGrafico( visitors.date, $( '#site_statistics_trinta_dias' ), $( '#site_statistics_loading_trinta_dias' ), $( '#site_statistics_content_trinta_dias' ) );
            }
        } );
    } );
} );

/**
 *
 * @param {type} data_inicio
 * @param {type} data_fim
 * @returns {undefined}
 */
function GraficoDiario( data_inicio, data_fim ) {

    $.ajax( {
        type: "POST",
        url: getUrl() + 'estatisticas/ajax',
        async: true,
        dataType: "json",
        data: {
            data_inicio: data_inicio,
            data_fim: data_fim,
            acao: 'getDados'
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( visitors ) {

            $( '#TotalAcessosHoje' ).text( visitors.TotalAcessos );
            $( '#MaiorAcessoHoje' ).text( visitors.MaiorAcesso );
            $( '#TabelaAcessos' ).html( visitors.TableAcessosDiario );
            PlotGrafico( visitors.horas, $( '#site_statistics' ), $( '#site_statistics_loading' ), $( '#site_statistics_content' ) );
            DataTable();

        }
    } );
}

/**
 * Gráficos
 * @param {type} visitors
 * @param {type} obj
 * @param {type} obj_loading
 * @param {type} obj_content
 * @returns {undefined}
 */
function PlotGrafico( visitors, obj, obj_loading, obj_content ) {

    if ( obj.size() != 0 ) {
        obj_loading.hide();
        obj_content.show();
        $.plot( obj, [
            { data: visitors, lines: { fill: 0.6, lineWidth: 0, }, color: ['#f89f9f'] },
            {
                data: visitors,
                points: { show: true, fill: true, radius: 5, fillColor: "#f89f9f", lineWidth: 3 },
                color: '#fff',
                shadowSize: 3
            },
        ], {
            xaxis: {
                tickLength: 0,
                tickDecimals: 0,
                mode: "categories",
                min: 2,
                font: { lineHeight: 14, style: "normal", variant: "small-caps", color: "#6F7B8A" }
            },
            yaxis: {
                ticks: 5,
                tickDecimals: 0,
                tickColor: "#eee",
                font: { lineHeight: 14, style: "normal", variant: "small-caps", color: "#6F7B8A" }
            },
            grid: { hoverable: true, clickable: true, tickColor: "#eee", borderColor: "#eee", borderWidth: 1 }
        } );
        var previousPoint = null;
        obj.bind( "plothover", function ( event, pos, item ) {
            $( "#x" ).text( pos.x.toFixed( 2 ) );
            $( "#y" ).text( pos.y.toFixed( 2 ) );
            if ( item ) {
                if ( previousPoint != item.dataIndex ) {
                    previousPoint = item.dataIndex;
                    $( "#tooltip" ).remove();
                    var x = item.datapoint[0].toFixed( 2 ),
                        y = item.datapoint[1].toFixed( 2 );
                    showChartTooltip( item.pageX, item.pageY, item.datapoint[0], item.datapoint[1] + ' visitantes' );
                }
            } else {
                $( "#tooltip" ).remove();
                previousPoint = null;
            }
        } );
    }
}

/**
 * Coloca os Tooltip's no gráfico ( Círculos que Informam o Número de Visitantes )
 * @param {type} x
 * @param {type} y
 * @param {type} xValue
 * @param {type} yValue
 * @returns {undefined}
 */
function showChartTooltip( x, y, xValue, yValue ) {
    $( '<div id="tooltip" class="chart-tooltip">' + yValue + '<\/div>' ).css( {
        position: 'absolute',
        display: 'none',
        top: y - 40,
        left: x - 40,
        border: '0px solid #ccc',
        padding: '2px 6px',
        'background-color': '#fff',
    } ).appendTo( "body" ).fadeIn( 200 );
}

/**
 * Formata as Tabelas
 * @returns {undefined}
 */
function DataTable() {
    $( '#TableAcessos' ).dataTable( {
        "aLengthMenu": [
            [10, 20, 30, -1],
            [10, 20, 30, "Todos"] // change per page values here
        ],
        // set the initial value
        "iDisplayLength": 10,
        "sPaginationType": "bootstrap",
        "oLanguage": {
            "sLengthMenu": "_MENU_ Registros",
            "oPaginate": {
                "sPrevious": "Prev",
                "sNext": "Next"
            }
        },
        "aoColumnDefs": [
            { 'bSortable': false, 'aTargets': [0] },
            { "bSearchable": false, "aTargets": [0] }
        ]
    } );
    jQuery( '#TableAcessos .group-checkable' ).change( function () {
        var set = jQuery( this ).attr( "data-set" );
        var checked = jQuery( this ).is( ":checked" );
        jQuery( set ).each( function () {
            if ( checked ) {
                $( this ).attr( "checked", true );
            } else {
                $( this ).attr( "checked", false );
            }
        } );
        jQuery.uniform.update( set );
    } );
    jQuery( '#TableAcessos_wrapper .dataTables_filter input' ).addClass( "form-control input-inline" ); // modify table search input
    jQuery( '#TableAcessos_wrapper .dataTables_length select' ).addClass( "form-control input-xsmall" ); // modify table per page dropdown
    jQuery( '#TableAcessos_wrapper .dataTables_length select' ).select2(); // initialize select2 dropdown

    var test = $( "input[type=checkbox]:not(.toggle, .make-switch), input[type=radio]:not(.toggle, .star, .make-switch)" );
    if ( test.size() > 0 ) {
        test.each( function () {
            if ( $( this ).parents( ".checker" ).size() == 0 ) {
                $( this ).show();
                $( this ).uniform();
            }
        } );
    }
}

/**
 * Calendário
 * @returns {undefined}
 */
function CalendarioEstatisticas( aplicacao ) {
    var h = {};
    if ( $( '#calendar_estatisticas' ).width() <= 200 ) {
        $( '#calendar_estatisticas' ).addClass( "mobile" );
        h = {
            left: 'title, prev, next',
            center: '',
            right: ''
        };
    } else {
        $( '#calendar' ).removeClass( "mobile" );
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
    $( '#calendar_estatisticas' ).fullCalendar( 'destroy' );
    $( '#calendar_estatisticas' ).fullCalendar( {
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

            GraficoDiario( AnoInicio + '-' + MesInicio + '-' + DiaInicio, AnoFim + '-' + MesFim + '-' + DiaFim );
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
                    $( '#TabelaAcessos' ).html( '<img src="' + getUrl() + 'assets/img/ajax-loader.gif" />' );
                },
                success: function ( data ) {
                    $( '#TabelaAcessos' ).html( data.TABLE );
                    DataTable();
                }
            } );
        }
    } );
}

/**
 * Carregamento dos dados na página home das Estatísticas
 */
function estatisticas_home() {


    $.ajax( {
        type: "POST",
        url: getUrl() + 'estatisticas/ajax',
        async: true,
        dataType: "json",
        data: {
            acao: 'findDataToday'
        },
        error: function ( error ) {
            console.log( error );
        },
        success: function ( data ) {

            console.log( data );

            //$( '#TotalAcessosHoje' ).text( visitors.TotalAcessos );
            //$( '#MaiorAcessoHoje' ).text( visitors.MaiorAcesso );
            //$( '#TabelaAcessos' ).html( visitors.TableAcessosDiario );
            //PlotGrafico( visitors.horas, $( '#site_statistics' ), $( '#site_statistics_loading' ), $( '#site_statistics_content' ) );
            //DataTable();
        }
    } );


}
