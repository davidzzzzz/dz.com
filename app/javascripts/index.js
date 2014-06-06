require(['jquery', 'scrollTo', 'bootstrap', 'easing', 'photoSet', 'colorbox'], function ($) {
    var scrollTiming = 1500;
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var mobileInit = false;

    $(window).resize(function() {
        if(!$("#desktop-div").is(':visible')) {
            enableMobileGallery();
        }
    });

    $(document).ready(function () {

        if(!isMobile) {
            //set up our click handlers
            $(".everest-nav").click(function (event) {
                $.scrollTo("#everest", {
                    duration: scrollTiming
                });
                return false;
            });
            $(".tibet-nav").click(function (event) {
                $.scrollTo("#tibet", {
                    duration: scrollTiming
                });
                return false;
            });
            $(".tlv-nav").click(function (event) {
                $.scrollTo("#tlv", {
                    duration: scrollTiming
                });
                return false;
            });
        } else {
            enableMobileGallery();
        }
    });

    function enableMobileGallery() {
        if(mobileInit)
            return;
        $('.photoset-grid-basic').photosetGrid({
            highresLinks: true,
            gutter: '2px',
            onComplete: function(){
                // Show the grid after it renders
                $('.photoset-grid-basic').attr('style', '');
                $('.photoset-grid-basic a').colorbox({
                    photo: true,
                    scalePhotos: true,
                    maxHeight:'90%',
                    maxWidth:'90%'
                });
            }

        });
        mobileInit = true;
    }
});
