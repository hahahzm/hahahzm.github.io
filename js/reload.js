$("#bt-menu li a").click(function(e) {
    // prevent from going to the page
    e.preventDefault();

    // get the href
    var href = $(this).attr("href");
    $("#content").load(href, function() {
        // do something after content has been loaded
    });
});