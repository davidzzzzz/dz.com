var scrollTiming = 1500;
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);

$(document).ready(function () {

    if(!isMobile) {
        $("#mobile-photo-grid").remove();
        //set up our click handlers
        $(".everest-nav").click(function (event) {
            stopListening();
            $.scrollTo("#everest", {
                duration: scrollTiming,
                onAfter: resumeListening
            });
            return false;
        });
        $(".tibet-nav").click(function (event) {
            stopListening();
            $.scrollTo("#tibet", {
                duration: scrollTiming,
                onAfter: resumeListening
            });
            return false;
        });
        $(".tlv-nav").click(function (event) {
            stopListening();
            $.scrollTo("#tlv", {
                duration: scrollTiming,
                onAfter: resumeListening
            });
            return false;
        });
    } else {
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
    }
});