function include(url) {
    var script = document.createElement('script');
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}
include("js/widget/currentdate.js");
include("js/widget/grid.js");
include("js/widget/converter.js");

$("#currentdate").currentdate();
$("#grid").grid();
$("#converter").converter();