function adjustStyle(width) {
    width = parseInt(width);
    if (width < 901) {
        $("#size-stylesheet").attr("href", "css/small.css");
    } else {
       $("#size-stylesheet").attr("href", "css/big.css"); 
    }
}

$(function() {
    adjustStyle($(this).width());
    $(window).resize(function() {
        adjustStyle($(this).width());
    });
});