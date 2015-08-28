var $ = require('jquery');
require('jquery.scrollto');
require('waypoints/lib/noframework.waypoints');
require('jquery.easing');
require('photoset-grid/jquery.photoset-grid');
require('jquery-colorbox');
var wixmp = require('wixmedia/image-api');

var scrollTiming = 1500;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
var mobileInit = false;

$(window).resize(function () {
    if (!$("#desktop-div").is(':visible')) {
        enableMobileGallery();
    }
});

$(document).ready(function () {

    if (!isMobile) {
        //set up our click handlers
        $(".everest-nav").click(function () {
            $.scrollTo("#everest", {
                duration: scrollTiming
            });
            return false;
        });
        $(".tibet-nav").click(function () {
            $.scrollTo("#tibet", {
                duration: scrollTiming
            });
            return false;
        });
        $(".tlv-nav").click(function () {
            $.scrollTo("#tlv", {
                duration: scrollTiming
            });
            return false;
        });

        var waypoint = new Waypoint({
            element: document.querySelector('.fixed-nav'),
            handler: function() {
                $('.fixed-nav').addClass('stuck');
            },
            offset: function() {
                return 0;
            }
        });
    } else {
        enableMobileGallery();
    }
});

function enableMobileGallery() {
    if (mobileInit)
        return;

    var BASE_URL = "media.wixapps.net/wix-99108486-2a7c-4ddb-9598-39db88cf5752/images";

    var image;
    $('.photoset-grid-basic img').each(function() {
        image = wixmp.WixImage(BASE_URL, $(this).attr('data-src'), $(this).attr('data-name'));
        $(this).attr('src', image.fill().w(480).h(270).toUrl());
    });

    $('.photoset-grid-basic').photosetGrid({
        highresLinks: true,
        gutter: '2px',
        onComplete: function () {
            // Show the grid after it renders
            $('.photoset-grid-basic').attr('style', '');
            $('.photoset-grid-basic a').colorbox({
                photo: true,
                scalePhotos: true,
                maxHeight: '90%',
                maxWidth: '90%'
            });
        }

    });
    mobileInit = true;
}
