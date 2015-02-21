/*!
 * Tracking Event Managemet Script
 * http://jquery.com/
 *
 * Dependency System
 * https://mixpanel.com/
 *
 * Copyright 2015,
 *
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date  : 2014-12-18T15:11Z
 * Author: ryu saiwai()
 */
jQuery(document).ready(function(){

    // variable se
    var url = "/insurance/aff-data.json";
    var objData = {};
    var intLength = 0;
    var runTrack;

    // get json data (blocking asynchronous);
    jQuery.ajax({
        url     :  url,
        async   : false
    }).always(
        function(data){
            objData  = data;
            intLength = data.item.length
        }
    );


        // track mixpanel
    runTrack = function(){
        var idTarget = jQuery(this).attr("id");
        var trackItem;

        // filter by key
        fltrPickupByKey = function(data){
            var extractData = _.filter (data , function(item){

                if(item.key == idTarget) return true;
            });

            trackItem = extractData;
        };

        _.filter( objData , fltrPickupByKey );

        // Tracking
        mixpanel.track(
            "Click Banner",
            { "Aff ID"      : trackItem[0].key },
            { "Aff Company" : trackItem[0].company}
        );
    }

    for( i = 0; i < intLength; i++){
        jQuery("#"+objData.item[i].key).click( runTrack );
    }

});