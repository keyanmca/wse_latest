var Playlists = function () {

    /*
     |-------------------------------------------------------------------------
     |  time_php = data atual
     |-------------------------------------------------------------------------
     */
    var time_php = getTimePHP();
    //1399056277
    /*
     |-------------------------------------------------------------------------
     |  publicarEm = data recuperada do Input Publicar Em
     |-------------------------------------------------------------------------
     */
    var publicarEm = parseInt( $( '#publicarEm' ).val() );

    var InstanciarDatepicker = function () {

        var TempoFormatado = converterTimeEmDataFormatada( time_php, false );
        //positionStart = $('#fixedposition').position().top;
        $( '#playlist_starttime' ).html( TempoFormatado );
        $( '#playlist_finishtime' ).html( TempoFormatado );
        resetpositions();

        $( ".sortable" ).sortable( {
            axis: 'y',
            stop: resetpositions,
            receive: resetpositions
        } );
        $( '.draggable' ).draggable( {
            connectToSortable: ".sortable",
            helper: "clone",
            revert: "invalid",
            start: function ( event, ui ) {
                $( '#midias_scroller' ).slimScroll( { destroy: true } );
            },
            drag: function ( event, ui ) {

                var DivArquivos = $( ".sortable" ).children();
                /*
                 |----------------------------------------------------------------------
                 | Conta quantos Elementos Filhos foram encontrados
                 |----------------------------------------------------------------------
                 */
                var NumElementos = DivArquivos.length;
                /*
                 |----------------------------------------------------------------------
                 | Faz um for Recuperando o Nome dos Arquivos
                 |----------------------------------------------------------------------
                 */
                for ( $i = 0; $i < NumElementos; $i++ ) {
                    /*
                     |------------------------------------------------------------------
                     | O Tempo dos Arquivos está na Classe CSS .Seconds
                     | e soma todos os Valores encontados
                     |------------------------------------------------------------------
                     */

                    $( DivArquivos[$i] ).removeClass( 'col-md-4' ).addClass( 'col-md-12' );
                    $( DivArquivos[$i] ).find( '.delete' ).removeAttr( 'onclick' );
                    $( DivArquivos[$i] ).find( '.editar' ).css( 'display', 'none' );

                }
            },
            stop: function ( event, ui ) {

                $( '#sortable' ).css( 'height', parseFloat( $( '#sortable' ).css( 'height' ) ) + 80 );

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

                var DivArquivos = $( ".sortable" ).children();
                /*
                 |----------------------------------------------------------------------
                 | Conta quantos Elementos Filhos foram encontrados
                 |----------------------------------------------------------------------
                 */
                var NumElementos = DivArquivos.length;
                /*
                 |----------------------------------------------------------------------
                 | Faz um for Recuperando o Nome dos Arquivos
                 |----------------------------------------------------------------------
                 */
                for ( $i = 0; $i < NumElementos; $i++ ) {
                    /*
                     |------------------------------------------------------------------
                     | O Tempo dos Arquivos está na Classe CSS .Seconds
                     | e soma todos os Valores encontados
                     |------------------------------------------------------------------
                     */

                    $( DivArquivos[$i] ).removeClass( 'col-md-4' ).addClass( 'col-md-12' );
                    $( DivArquivos[$i] ).find( '.remover' ).removeAttr( 'onclick' ).removeClass( 'remover' ).addClass( 'delete' );


                    $( DivArquivos[$i] ).find( '.editar' ).css( 'display', 'none' );

                    $( DivArquivos[$i] ).removeClass( 'mix' ).removeClass( 'mix_all' );
                    $( DivArquivos[$i] ).removeClass( 'draggable' ).addClass( 'playlist' );

                }
            }
        } );

        $( "#sortable" ).disableSelection();
        $( '.AvailableItems' ).disableSelection();
        $( 'body' ).delegate( '.delete', 'click', removemediaitem );
        $( '.salvarPlaylist' ).click( salvarPlaylist );
        $( '.compilar' ).click( compilarPlaylist );
        calcularTempoTotal();

    };

    //remove item and set the list to recalc.
    function removemediaitem( e ) {
        e.preventDefault();

        $( this ).parents( '.playlist' ).remove();
        calcularTempoTotal();
        resetpositions();
    }


    /*
     |--------------------------------------------------------------------------
     | Calcular o Tempo Total
     |--------------------------------------------------------------------------
     */
    function calcularTempoTotal() {
        var TotalSegundos = 0;
        /*
         |----------------------------------------------------------------------
         | Recupera a Div que contém os Arquivos para a Playlist
         |----------------------------------------------------------------------
         */
        var DivArquivos = $( "#sortable" ).children();
        /*
         |----------------------------------------------------------------------
         | Conta quantos Elementos Filhos foram encontrados
         |----------------------------------------------------------------------
         */
        var NumElementos = DivArquivos.length;
        /*
         |----------------------------------------------------------------------
         | Faz um for Recuperando o Nome dos Arquivos
         |----------------------------------------------------------------------
         */

        $( "#sortable" ).find( '.Seconds' ).each( function () {

            TotalSegundos += parseFloat( $( this ).html() );
        } );

        //for ( $i = 0; $i < NumElementos; $i++ ) {
        //    /*
        //     |------------------------------------------------------------------
        //     | O Tempo dos Arquivos está na Classe CSS .Seconds
        //     | e soma todos os Valores encontados
        //     |------------------------------------------------------------------
        //     */
        //    TotalSegundos += parseFloat( $( DivArquivos[$i] ).children( '.Seconds' ).html() );
        //}
        //calculate the new end time
        var TempoFinal = time_php + TotalSegundos;
        var TempoFormatado = converterTimeEmDataFormatada( TempoFinal, false );
        //grab the total hours,minutes seconds
        var TempoTotalPlaylist = converterSegundosEmHora( TotalSegundos );
        $( '#playlist_finishtime' ).html( TempoFormatado );
        $( '#playlist_totaltime' ).html( TempoTotalPlaylist );
        $( ".tooltips" ).css( 'cursor', 'pointer' ).tooltip();
    }

    /*
     |--------------------------------------------------------------------------
     | Compilar string que representa uma matriz JSON para listas de reprodução.
     |--------------------------------------------------------------------------
     */
    function compilarPlaylist() {

        //var playlistArray = '[';
        var playlistArray = '';
        /*
         |-------------------------------------------------------------------------
         | Recupera a Div que contém os Arquivos para a Playlist
         |-------------------------------------------------------------------------
         */
        var DivArquivos = $( "#sortable" ).children();
        /*
         |-------------------------------------------------------------------------
         | Conta quantos Elementos Filhos foram encontrados
         |-------------------------------------------------------------------------
         */
        var NumElementos = DivArquivos.length;
        /*
         |-------------------------------------------------------------------------
         | Faz um for Recuperando o Nome dos Arquivos
         |-------------------------------------------------------------------------
         */
        for ( $i = 0; $i < NumElementos; $i++ ) {
            /*
             |-------------------------------------------------------------------------
             | O Nome dos Arquivos estão na Classe CSS .Filename
             | e concatena com vírgula
             |-------------------------------------------------------------------------
             */
            playlistArray += $( DivArquivos[$i] ).find( '.Filename' ).html() + ',';

        }


        /*
         |-------------------------------------------------------------------------
         | Remove a última Vírgula
         |-------------------------------------------------------------------------
         */
        playlistArray = playlistArray.slice( 0, -1 );
        //playlistArray += ']';
        return playlistArray;
    }

    // Save Playlist to Server
    function clearPlaylist() {

        var areyousure = confirm( "Are you sure you wish to clear the playlist?" );
        if ( areyousure ) {
            document.getElementById( 'PlaylistField' ).value = "";
            document.forms['PlaylistData'].submit();
        }
    }

    /*
     * Salvar a Playlist
     */
    function salvarPlaylist() {

        document.getElementById( 'playlist_itens' ).value = compilarPlaylist();
        document.forms['PlaylistForm'].submit();
    }

    /*
     |--------------------------------------------------------------------------
     | Quando as mudanças de ordem de classificação ou um novo item é anexado
     | recalcular os valores de início de tempo de
     | todos os itens da matriz.
     |--------------------------------------------------------------------------
     */
    function resetpositions( e, uiobject ) {
        /*
         |----------------------------------------------------------------------
         | Posição inicial definida
         |----------------------------------------------------------------------
         */
        var startpos = 0;
        $( '#sortable .ui-draggable' ).removeClass( 'ui-draggable' );
        /*
         |-------------------------------------------------------------------------
         | Recupera a Div que contém os Arquivos para a Playlist
         |-------------------------------------------------------------------------
         */
        var DivArquivos = $( "#sortable" ).children();
        /*
         |-------------------------------------------------------------------------
         | Conta quantos Elementos Filhos foram encontrados
         |-------------------------------------------------------------------------
         */
        var NumElementos = DivArquivos.length;
        /*
         |-------------------------------------------------------------------------
         | Faz um for Recuperando o Nome dos Arquivos
         |-------------------------------------------------------------------------
         */

        $( "#sortable" ).find( '.StartTime' ).each( function () {

            $( this ).html( converterTimeEmDataFormatada( ( publicarEm + startpos ), true ) );
            startpos += parseFloat( $( this ).parent().children( '.Seconds' ).html() );
        } );


        //for ( $i = 0; $i < NumElementos; $i++ ) {
        //    //console.log( converterTimeEmDataFormatada( ( publicarEm + startpos ), true ) );
        //    /*
        //     |-------------------------------------------------------------------------
        //     | Reinforma o Tempo de cada Elemento Novamente
        //     |-------------------------------------------------------------------------
        //     */
        //    $( DivArquivos[$i] ).children( '.StartTime' ).html( converterTimeEmDataFormatada( ( publicarEm + startpos ), true ) );
        //    startpos += parseFloat( $( DivArquivos[$i] ).children( '.Seconds' ).html() );
        //}
        calcularTempoTotal();
        $( '.delete' ).click( removemediaitem );
    }

    function modifyTotalTime( timelength ) {

    }

    // Converte uma string segundos em uma string data formatada e retorna.
    function converterTimeEmDataFormatada( time_php, formato ) {
        /*
         |-------------------------------------------------------------------------
         |  Instancia Objeto Date passando o time() do PHP
         |  Multiplica por 1000 pois o time() é em milesegundos
         |-------------------------------------------------------------------------
         */
        var DataTimestamp = new Date( time_php * 1000 );
        var Ano = DataTimestamp.getFullYear();
        var Mes = ( ( DataTimestamp.getMonth() + 1 ) < 10 ) ? "0" + ( DataTimestamp.getMonth() + 1 ) : ( DataTimestamp.getMonth() + 1 );
        var Dia = ( DataTimestamp.getDate() < 10 ) ? "0" + DataTimestamp.getDate() : DataTimestamp.getDate();
        var Hora = ( DataTimestamp.getHours() < 10 ) ? "0" + DataTimestamp.getHours() : DataTimestamp.getHours();
        var Minuto = ( DataTimestamp.getMinutes() < 10 ) ? "0" + DataTimestamp.getMinutes() : DataTimestamp.getMinutes();
        var Segundos = ( DataTimestamp.getSeconds() < 10 ) ? "0" + DataTimestamp.getSeconds() : DataTimestamp.getSeconds();
        var MesesAno = new Array( 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Augosto', 'Setembro', 'Outobro', 'Novembro', 'Dezembro' );
        /*
         |-------------------------------------------------------------------------
         |  Tipo de Formatação da Data
         |-------------------------------------------------------------------------
         */
        if ( formato ) {
            return Dia + "/" + Mes + "/" + Ano + " " + Hora + ":" + Minuto + ":" + Segundos;
        } else {
            return Hora + ":" + Minuto + " " + Dia + " " + MesesAno[DataTimestamp.getMonth()] + " " + Ano;
        }
    }

    /*
     |-------------------------------------------------------------------------
     | Transformar os segundos em horas, minutos e segundos e
     | retornar as informações concatenadas
     |-------------------------------------------------------------------------
     */
    function converterSegundosEmHora( valor ) {
        var PreHora = valor / ( 60 * 60 );
        var Hora = Math.floor( PreHora );
        var PreMinuto = ( PreHora - Hora ) * 60;
        var Minuto = Math.floor( PreMinuto );
        var Min = ( Minuto < 10 ) ? "0" + Minuto : Minuto;
        var Segundo = Math.floor( ( PreMinuto - Minuto ) * 60 );
        var Seg = ( Segundo < 10 ) ? "0" + Segundo : Segundo;
        return Hora + ':' + Min + ':' + Seg;
    }

    return {
        init: function ( options ) {
            InstanciarDatepicker();
        }
    };
}();

Playlists.init();