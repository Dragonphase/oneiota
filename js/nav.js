// JQuery Animation for collapsed / uncollapsed unordered lists
$(document).on('click', '.sidebar-nav li > a', function(){
    $(this).parent().children('ul').slideToggle('fast', function() {
        // Toggle the collapsed class after the animation is completed
        $(this).toggleClass('collapsed');
    });
});

/*
    Populate div.sidebar-nav with data retrieved from the navigation JSON
    echoed inside nav.php
*/
$.getJSON("nav.php", function(data) {
    $.each(data["nav"], function(key, value) {
        $('.sidebar-nav').append(populateNavigation(0, "", value));
    });
});

/*
    A recursive function which returns HTML code for nested list items, populated
    using a provided array input

    Returns a string containing HTML code
*/
function populateNavigation(level, output, array) {
    // Add the individual item link HTML to the output
    output += "<li class='level_" + level + "'>"
    output += "<a href='#'>" + array["name"] + "</a>";

    // If the item has any children, append HTML for the children to the output
    if (typeof array["children"] !== 'undefined' && array["children"].length > 0) {
        // Create a collapsed unordered list for the children
        output += "<ul class='collapsed'>";

        // Append HTML for each children to the output
        $.each(array["children"], function(key, value) {
            // Make a recursive call to append child HTML to the output
            output += populateNavigation(level + 1, "", value);
        });

        output += "</ul>";
    }

    output += "</li>";

    return output;
}
