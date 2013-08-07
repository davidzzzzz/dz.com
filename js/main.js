var scrollTiming = 1500;

$(document).ready(function() {
    $("#everest-nav").click(function (event) {
        $.scrollTo("#everest", {
            duration: scrollTiming
        });
        return false;
    });
    $("#tlv-nav").click(function (event) {
        $.scrollTo("#tlv", {
            duration: scrollTiming
        });
        return false;
    });
});
