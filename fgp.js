/************************************************************/
/* Name: fgp.js                                             */
/* Purpose: Library of JavaScript functions                 */
/************************************************************/

function fgpExpandAll() {
    var colBtn, expBtn;
    $(".submenu").show("slow");
    expBtn = $("#fgpExpandMeta");
    colBtn = $("#fgpCollapseMeta");
    $(".fgpExpandible").attr('open', 'open');
    expBtn.hide();
    colBtn.show();
}

function fgpCollapseAll() {
    var colBtn, expBtn;
    expBtn = $("#fgpExpandMeta");
    colBtn = $("#fgpCollapseMeta");
    $(".fgpExpandible").removeAttr('open');
    expBtn.show();
    colBtn.hide();
}

// Clear the Map cart
function fgpClearCart() {
    window.location.href = "/geonetwork/mapcart/eng?keys=null";
}

// Get current applicatino language
function fgpGetLang() {
	var docurl = document.URL;
	if ((docurl.indexOf('/en/') !== -1) || (docurl.indexOf('/eng') !== -1)) {
		return "eng";
	} else {
		return "fre";
	}
}

// Adjust the Add Data link if the user is logged in
function fgpAdjustAddDataLink() {
	var docurl = document.URL,
        lnkAddData = $("#aAddData"),
        newurl;
	if (docurl.indexOf('/en/index.html') !== -1) {
        newurl = "/geonetwork/srv/eng/admin";
        lnkAddData.attr("href", newurl);
	}
	if (docurl.indexOf('/fr/index.html') !== -1) {
        newurl = "/geonetwork/srv/fre/admin";
        lnkAddData.attr("href", newurl);
	}
}

// Get session information
function fgpGetSessionInfo() {
    var authenticated, cururl, mapcart, name, pagelang, surname, txt, uid, uname, username, x, xhttp, xmlDoc;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            xmlDoc = xhttp.responseXML;
            x = xmlDoc.getElementsByTagName("me");
            authenticated = x[0].attributes[0].nodeValue;
            // See if a user is logged in and get user information to display
            if (authenticated === 'true') {
                fgpAdjustAddDataLink();
                name = x[0].childNodes[7].childNodes[0].data;
                surname = x[0].childNodes[9].childNodes[0].data;
                uid = x[0].childNodes[5].childNodes[0].data;
                pagelang = fgpGetLang();
                if (pagelang === 'eng') {
                    //txt = '<a href="/geonetwork/j_spring_security_logout" style="color:white;text-decoration:none;">Logged in as: ' + surname + ', ' + name + '</a>';
                    txt = '<a id="aMenuUser" href="#" class="item" tabindex="0" title="" role="menuitem" aria-haspopup="true">' + surname + ', ' + name + '<span class="expicon glyphicon glyphicon-chevron-down"></a>';
                    txt += '<ul class="sm list-unstyled" id="implement2" role="menu">';
                    txt += '<li><a id="aMenuLogout" href="/geonetwork/j_spring_security_logout" id="fgpLogoutAnchor" tabindex="0" title="Sign-out for contributors">Sign-out</a></li>';
                    txt += '<li><a id="aMenuEditProfil" href="/geonetwork/admin/user/infoedit/' + uid + '/eng" id="fgpEditAnchor" tabindex="0" title="Edit your contributor profile">Edit profile</a></li>';
                    txt += '<li><a id="aMenuAdmin" href="/geonetwork/srv/eng/admin" id="fgpAdmin" tabindex="0" title="Administer GeoNetwork">Administration</a></li>';
                    txt += '</ul>';
                } else {
                    //txt = '<a href="/geonetwork/j_spring_security_logout" style="color:white;text-decoration:none;">ConnectÃ© en tant que: ' + surname + ', ' + name + '</a>';
                    txt = '<a id="aMenuUtilisateur" href="#" class="item" tabindex="0" title="" role="menuitem" aria-haspopup="true">' + surname + ', ' + name + '<span class="expicon glyphicon glyphicon-chevron-down"></a>';
                    txt += '<ul class="sm list-unstyled" id="implement2" role="menu">';
                    txt += '<li><a id="aMenuDeconnexion" href="/geonetwork/j_spring_security_logout" id="fgpLogoutAnchor" tabindex="0" title="Fermer la session pour un contributeur">Fermer la session</a></li>';
                    txt += '<li><a id="aMenuEditezProfil" href="/geonetwork/admin/user/infoedit/' + uid + '/fre" id="fgpEditAnchor" tabindex="0" title="Editez votre profil de contributeur">Editez votre profil</a></li>';
                    txt += '<li><a id="aMenuAdmin" href="/geonetwork/srv/fre/admin" id="fgpAdmin" tabindex="0" title="Administrer GeoNetwork">Administration</a></li>';
                    txt += '</ul>';
                }
                //document.getElementById("gcwu-srchbx-in").innerHTML = txt;
                if (document.getElementById("fgpLogout") !== null) document.getElementById("fgpLogout").innerHTML = txt;
                $("#wb-srch").attr('class', 'visible-md visible-lg');
                $("#fgpLogin").attr('class', 'hidden-xs hidden-sm hidden-md hidden-lg');
                $("#fgpLogout").attr('class', 'visible-md visible-lg');
            } else {
                $("#wb-srch").attr('class', 'hidden-xs hidden-sm hidden-md hidden-lg');
                $("#fgpLogin").attr('class', 'visible-md visible-lg');
                $("#fgpLogout").attr('class', 'hidden-xs hidden-sm hidden-md hidden-lg');
            }
/*
            // See if there are any items in the Map Cart and update the display
            x = xmlDoc.getElementsByTagName("mapcart");
            if (x.length !== 0) {
                mapcart = x[0].childNodes[0].data;
                document.getElementById("mappreview-count").innerHTML = mapcart;
                // If there no more items in the map cart, make it disabled
                if (mapcart === 0) {
                    $("#mapCartDelete").attr('class', 'envcan-icon fgp-map-cart-position disabled');
                } else {
                    $("#mapCartDelete").attr('class', 'envcan-icon fgp-map-cart-position');
                }
            }
            // Update the URL of the onclick event
            cururl = window.location.hostname;
            x = $("#fgpViewOnMap");
            x.attr("onclick", "map.view('http://" + cururl + "/RAMP/ramp-en.html?keys=', '', false)");
*/
        }
    };
    xhttp.open("GET", "/geonetwork/srv/eng/xml.info?type=me", true);
    xhttp.send();
}

// See if a user is logged in and get user information to display
function fgpGetLoggedInUser() {
    var xhttp, xmlDoc, txt, x, pagelang, authenticated, uname, username, uid;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            xmlDoc = xhttp.responseXML;
            x = xmlDoc.getElementsByTagName("me");
            authenticated = x[0].attributes[0].nodeValue;
            if (authenticated === 'true') {
                name = x[0].childNodes[7].childNodes[0].data;
                surname = x[0].childNodes[9].childNodes[0].data;
                uid = x[0].childNodes[5].childNodes[0].data;
                pagelang = fgpGetLang();
                if (pagelang === 'eng') {
                    txt =  'Logged in as: ';
                    txt += '<a href="/geonetwork/admin/user/infoedit/' + uid + '/eng" style="color:white;text-decoration:none;">' + surname + ', ' + name + '</a>';
                } else {
                    txt =  'ConnectÃ© en tant que: ';
                    //txt += '<a href="/geonetwork/admin/user/infoedit/' + uid + '/fre" style="color:white;text-decoration:none;">' + surname + ', ' + name + '</a>';
                    txt += surname + ', ' + name + '</a>';
                    txt += '<ul class="sm list-unstyled" id="implement2" role="menu">';
                    txt += '<li><a href="/geonetwork/j_spring_security_logout" id="fgpLogoutAnchor" class="item" tabindex="0" title="Sign-out for contributors">Sign-out</a></li>';
                    txt += '<li><a href="/geonetwork/admin/user/infoedit/1244/eng" id="fgpEditAnchor" class="item" tabindex="0" title="Edit your profile">Edit profile</a></li>';
                    txt += '</ul>';
                }
                document.getElementById("gcwu-srchbx-in").innerHTML = txt;
                $("#wb-srch").attr('class', 'visible-md visible-lg');
                $("#fgpLogin").attr('class', 'hidden-xs hidden-sm hidden-md hidden-lg');
                $("#fgpLogout").attr('class', 'visible-md visible-lg');
            } else {
                $("#wb-srch").attr('class', 'hidden-xs hidden-sm hidden-md hidden-lg');
                $("#fgpLogin").attr('class', 'visible-md visible-lg');
                $("#fgpLogout").attr('class', 'hidden-xs hidden-sm hidden-md hidden-lg');
            }
        }
    };
    xhttp.open("GET", "/geonetwork/srv/eng/xml.info?type=me", true);
    xhttp.send();
}

// See if there are any items in the Map Cart and update the display
function fgpGetNumberOfCartItems() {
    var xhttp, xmlDoc, txt, x, pagelang, mapcart, uname, username, uid;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            xmlDoc = xhttp.responseXML;
            x = xmlDoc.getElementsByTagName("mapcart");
            if (x.length !== 0) {
                mapcart = x[0].data;
                document.getElementById("mappreview-count").innerHTML = mapcart;
            }
        }
    };
    xhttp.open("GET", "/geonetwork/srv/eng/xml.info?type=me", true);
    xhttp.send();
}

// Map Cart handler
//var mappreview = {
//    lyrs:[],
//    params:"",
//    addLayer: function(url, title, name, desc, type, smallkey, maxlayers, msg, dialogtitle, dialoglayeradded, dialoglayerexists){
//        //check if layer already in selection
//        var exists = false;
//        jQuery(mappreview.lyrs).each(function(){
//            if (this==smallkey) exists=true;
//        })
//        if (!exists){
//            if (mappreview.lyrs.length+1 > maxlayers) {
//                jQuery.growl.warning({ title: dialogtitle, message: msg, location: "tc" })
//                return;
//            }
//
//            jQuery.ajax({
//                url: getGNServiceURL("mapcart.add"),
//                data: {
//                    smallkey: smallkey
//                },
//                type: 'POST',
//                success: function(response, opts) {
//                    //set layer
//                    mappreview.lyrs.push(smallkey);
//
//                    jQuery("#mappreview-count").text(mappreview.lyrs.length);
//
//                    jQuery("#mapcart-btn-clear").removeClass("not-active");
//                    jQuery("#mapcart-btn-clear").addClass("btn");
//                    jQuery("#mapcart-btn-clear").addClass("btn-default");
//                    jQuery("#mapcart-btn-clear").addClass("cart-icon-remove");
//
//                    jQuery("#mapcart-btn-clear-top").removeClass("not-active");
//                    jQuery("#mapcart-btn-clear-top").addClass("btn");
//                    jQuery("#mapcart-btn-clear-top").addClass("btn-default");
//                    jQuery("#mapcart-btn-clear-top").addClass("cart-icon-remove");
//
//                    jQuery("#mapcart-btn-clear-bottom").removeClass("not-active");
//                    jQuery("#mapcart-btn-clear-bottom").addClass("btn");
//                    jQuery("#mapcart-btn-clear-bottom").addClass("btn-default");
//                    jQuery("#mapcart-btn-clear-bottom").addClass("cart-icon-remove");
//
//                    jQuery(".fgp-map-cart-delete").removeClass("fgp-map-cart-delete-disabled");
//
//                    if (jQuery("#mappreview-link").length > 0) {
//                        var countTooltip = jQuery("#mappreview-link").prop('title').replace(/(\d+)/g, mappreview.lyrs.length);
//                        jQuery("#mappreview-link").prop('title', countTooltip);
//                    }
//                    jQuery.growl.notice({ title: dialogtitle, message: dialoglayeradded, location: "tc" })
//                },
//                error: function(response,opt) {
//                    jQuery.growl.error({ title: dialogtitle, message: response.status+" text: "+response.statusText, location: "tc" })
//                }
//            });
//
//        } else {
//            jQuery.growl.warning({ title: dialogtitle, message: dialoglayerexists, location: "tc" })
//        }
//    },
//    clearDialog:function() {
//        jQuery('').trigger( "wb-init.wb-lbx" );
//        jQuery( document ).trigger( "open.wb-lbx", [[{
//            src: "#inline_content_modal",
//            type: "inline"
//        }],true]);
//
//    },
//    clear:function(dialogtitle, dialogmsg){
//        jQuery.ajax({
//            url: getGNServiceURL("mapcart.remove"),
//            type: 'POST',
//            success: function(response, opts) {
//                jQuery("#mapPreviewLayers").empty();
//                mappreview.lyrs=[];
//
//                jQuery("#mappreview-count").html(mappreview.lyrs.length);
//                jQuery("#mapPreviewPanel").html("");
//                if (jQuery("#mappreview-link").length > 0) {
//                    var countTooltip = jQuery("#mappreview-link").prop('title').replace(/(\d+)/g, mappreview.lyrs.length);
//                    jQuery("#mappreview-link").prop('title', countTooltip);
//                }
//
//                jQuery("#mapcart-noitems").show();
//                jQuery("#mapcart-items").hide();
//                jQuery("#mapcart-btn-search-top").hide();
//
//
//                jQuery("#mapcart-btn-clear").addClass("not-active");
//                jQuery("#mapcart-btn-clear").removeClass("btn");
//                jQuery("#mapcart-btn-clear").removeClass("btn-default");
//                jQuery("#mapcart-btn-clear").removeClass("cart-icon-remove");
//
//                jQuery("#mapcart-btn-clear-top").addClass("not-active");
//                jQuery("#mapcart-btn-clear-top").removeClass("btn");
//                jQuery("#mapcart-btn-clear-top").removeClass("btn-default");
//                jQuery("#mapcart-btn-clear-top").removeClass("cart-icon-remove");
//
//                jQuery("#mapcart-btn-clear-bottom").addClass("not-active");
//                jQuery("#mapcart-btn-clear-bottom").removeClass("btn");
//                jQuery("#mapcart-btn-clear-bottom").removeClass("btn-default");
//                jQuery("#mapcart-btn-clear-bottom").removeClass("cart-icon-remove");
//
//                jQuery(".fgp-map-cart-delete").addClass("fgp-map-cart-delete-disabled");
//
//                jQuery("#mapcart-btn-view-top").hide();
//                jQuery("#mapcart-btn-view-bottom").hide();
//                jQuery("#mapcart-legend").hide();
//                jQuery("#mapcart-items").hide();
//
//                jQuery.growl.notice({ title: dialogtitle, message: dialogmsg, location: "tc" })
//
//                //closePopup();
//            },
//            error: function(response,opt) {
//                jQuery.growl.error({ title: dialogtitle, message: response.status+" text: "+response.statusText, location: "tc" })
//            }
//        });
//
//    },
//    removeLayer:function(smallkey, dialogtitle){
//        if (!mappreview.lyrs || mappreview.lyrs.length==0) mappreview.lyrs=[];
//
//        jQuery.ajax({
//            url: getGNServiceURL("mapcart.remove"),
//            type: 'POST',
//            data: {
//                smallkey: smallkey
//            },
//            success: function(response, opts) {
//                var lyrs2 = [];
//
//                //remove layer from selection
//                jQuery(mappreview.lyrs).each(function( index, value ){
//                    if (value!=smallkey) lyrs2.push(this);
//                })
//                var index = mappreview.lyrs.indexOf(smallkey);
//                mappreview.lyrs.splice(index, 1);
//
//                //remove layer from panel
//                if (jQuery("#mppl"+smallkey)) jQuery("#mppl"+smallkey).remove();
//
//                jQuery("#mappreview-count").html(lyrs2.length);
//
//                if (jQuery("#mappreview-link").length > 0) {
//                    var countTooltip = jQuery("#mappreview-link").prop('title').replace(/(\d+)/g,lyrs2.length);
//                    jQuery("#mappreview-link").prop('title', countTooltip);
//                }
//
//                if (lyrs2.length == 0) {
//                    jQuery("#mapcart-noitems").show();
//                    jQuery("#mapcart-btn-search-top").hide();
//                    jQuery("#mapcart-btn-clear-top").hide();
//                    jQuery("#mapcart-btn-clear-bottom").hide();
//                    jQuery("#mapcart-btn-view-top").hide();
//                    jQuery("#mapcart-btn-view-bottom").hide();
//                    jQuery("#mapcart-legend").hide();
//                    jQuery("#mapcart-items").hide();
//                }
//                //if (lyrs2.length==0) closePopup();
//            },
//            error: function(response,opt) {
//                jQuery.growl.error({ title: dialogtitle, message: response.status+" text: "+response.statusText, location: "tc" })
//            }
//        });
//    },
//    test:function(dialogtitle, msgok, msgnok){
//        jQuery.ajax({
//            url: getGNServiceURL("mapcart.tester"),
//            type: 'POST',
//            success: function(response, opts) {
//                jQuery(response).find("item").each(function(){
//                    var uuid = jQuery(this).attr("uuid");
//                    var status = jQuery(this).attr("status");
//
//                    if (status == 'OK') {
//                        jQuery("#status-" + uuid).attr("class","glyphicon glyphicon-ok text-success");
//                        jQuery("#status-" + uuid).attr("title", msgok);
//                    } else {
//                        jQuery("#status-" + uuid).attr("class","glyphicon glyphicon-exclamation-sign text-danger");
//                        jQuery("#status-" + uuid).attr("title", msgnok);
//                    }
//                });
//            },
//            error: function(response,opt) {
//                jQuery.growl.error({ title: dialogtitle, message: response.status+" text: "+response.statusText, location: "tc" })
//            }
//        });
//    }
//};
