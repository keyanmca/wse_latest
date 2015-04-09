var Calendar = function () {
    return {
        //main function to initiate the module
        init: function () {
//            $( '#tab_playlist' ).on( 'shown.bs.tab', function( e ) {
//                Calendar.initCalendar();
//            } );

            Calendar.initCalendar( getUrl() );
        },
        initCalendar: function ( getUrl ) {
            if ( !jQuery().fullCalendar ) {
                return;
            }
            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();
            var AplicacaoId = $( '#aplicacao_id' ).val();
            var h = {};
            if ( App.isRTL() ) {
                if ( $( '#calendar' ).parents( ".portlet" ).width() <= 720 ) {
                    $( '#calendar' ).addClass( "mobile" );
                    h = {
                        right: 'title, prev, next',
                        center: '',
                        right: 'agendaDay, agendaWeek, month, today'
                    };
                } else {
                    $( '#calendar' ).removeClass( "mobile" );
                    h = {
                        right: 'title',
                        center: '',
                        left: 'agendaDay, agendaWeek, month, today, prev,next'
                    };
                }
            } else {
                if ( $( '#calendar' ).parents( ".portlet" ).width() <= 720 ) {
                    $( '#calendar' ).addClass( "mobile" );
                    h = {
                        left: 'title, prev, next',
                        center: '',
                        right: 'today,month,agendaWeek,agendaDay'
                    };
                } else {
                    $( '#calendar' ).removeClass( "mobile" );
                    h = {
                        left: 'title',
                        center: '',
                        right: 'prev,next,today,month,agendaWeek,agendaDay'
                    };
                }
            }


            $.ajax( {
                url: getUrl + "tvstation/jsonPlaylist/" + AplicacaoId,
                dataType: 'json',
                success: function ( data ) {
                    if ( data ) {

                        var events = [];
                        $.each( data, function ( chave, valor ) {
                            events.push( {
                                id: valor.id,
                                title: valor.title,
                                start: new Date( valor.start_ano, valor.start_mes, valor.start_dia, valor.start_hora, valor.start_minuto ),
                                end: valor.end,
                                url: valor.url
                            } );
                        } );
                        json_events = events;

                    }


                }
            } );


            $( '#calendar' ).fullCalendar( 'destroy' ); // destroy the calendar
            $( '#calendar' ).fullCalendar( { //re-initialize the calendar
                allDaySlot: false,
                header: h,
                slotMinutes: 30,
                editable: false,
                droppable: true, // this allows things to be dropped onto the calendar !!!
                selectable: true,
                firstHour: 0,
                loading: function ( IsLoading ) {
                    if ( IsLoading )
                        $( '#calendar' ).css( 'opacity', '0.4' );
                    else
                        $( '#calendar' ).css( 'opacity', '1' );
                },
                select: function ( startDate, endDate, allDay, jsEvent, view ) {

                    /** DISABLE PAST DAY SELECTION **/
                    var check = $.fullCalendar.formatDate( startDate, 'yyyy-MM-dd' );
                    var today = $.fullCalendar.formatDate( new Date(), 'yyyy-MM-dd' );
                    if ( check < today ) {
                        return false;
                    }

                    /** CHECK IF CLICKED ON DAY, EXTEND BY 1 DAY **/
                    if ( "" + endDate + "" == "" + startDate + "" ) {
                        //endDate.setDate(startDate.getDate()+1);
                        endDate.setHours( startDate.getHours() + 23 );
                        endDate.setMinutes( startDate.getMinutes() + 59 );
                    }

                    $( '#playlist_inicio' ).datetimepicker( {
                        format: "dd/mm/yyyy - hh:ii",
                        autoclose: true,
                        todayBtn: true,
                        pickerPosition: ( App.isRTL() ? "bottom-right" : "bottom-left" ),
                        minuteStep: 10
                    } ).datetimepicker( 'update', startDate );
                    $( '#playlist_fim' ).datetimepicker( {
                        format: "dd/mm/yyyy - hh:ii",
                        autoclose: true,
                        todayBtn: true,
                        pickerPosition: ( App.isRTL() ? "bottom-right" : "bottom-left" ),
                        minuteStep: 10
                    } ).datetimepicker( 'update', endDate );
                    $( '#btn_deletar_playlist' ).hide();
                    $( '#create-playlist-dialog' ).modal();
                },
                events: {
                    url: getUrl + "tvstation/jsonPlaylist/" + AplicacaoId
                },
                eventClick: function ( event ) {

                    var str = event.url;
                    var res = str.substr( 0, 1 );

                    if ( res == '#' ) {

                        $( '#playlist_id' ).val( event.id );
                        $( '#playlist_nome' ).val( event.nome );
                        $( '#playlist_inicio' ).val( event.data_inicio );
                        $( '#playlist_tipo option[value="' + event.tipo + '"]' ).attr( 'selected', 'selected' );
                        $( '#playlist_tipo' ).select2();

                        $( '#btn_deletar_playlist' ).show();

                        $( '#create-playlist-dialog' ).modal()
                    } else {
                        $( '#btn_deletar_playlist' ).hide();
                    }

                }
            } );
        }
    };
}();