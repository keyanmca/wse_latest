/**
 * Created with PhpStorm.
 * User: adam.debono
 * Date: 25/10/13
 * Time: 2:34 PM
 */

jQuery(document).ready(function() {
    //Setup Datepickers
    if (jQuery("input[type='datepicker']").length) {
        jQuery("input[type='datepicker']").datetimepicker({
            format: 'dd/mm/yy hh:ii',
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            minuteStep: 1
        }).on('focus', function(e) {
            jQuery(this).blur();
        });
    }
});