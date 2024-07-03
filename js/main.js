$(document).ready(function(){
var _url = "https://my-json-server.typicode.com/yunitasari193310027/api/pro"

var dataResult = ''
var catResult = ''
var categories= []
$.get(_url,function(data){
    $.each(data, function(key, items){
        _cat = items.category

        dataResult += "<div>"
                        + "<h3>" + items.name + "</h3>"
                        + "<p>" + _cat + "</p>"
                    "<>/div";

        if($.inArray(_cat, categories) == -1){
            categories.push(_cat)
            catResult += "<option value'" + _cat +"'>" + _cat +"</option>"
        }

    })
    $('#products').html(dataResult)
    $('#cat_select').html("<option value='all'>semua</option>" + catResult)
})

// Fungsi untuk filter
$("#cat_select").on('change', function(){
    updateProduct($(this).val())
})

function updateProduct(cat){
    var dataResult = ''
    var _newUrl = _url
        if(cat != 'all')
            _newUrl = _url + "?category=" + cat

    $.get(_newUrl,function(data){

        $.each(data, function(key, items){
            _cat = items.category
    
            dataResult += "<div>"
                            + "<h3>" + items.name + "</h3>"
                            + "<p>" + _cat + "</p>"
                        "<>/div";
        })
        $('#products').html(dataResult)
     })
}
}) // end document jquery


//PWA Service Worker
window.addEventListener('load', () => {
    // Is service worker available?
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/serviceworker.js').then(() => {
        console.log('Service worker registered!');
      }).catch((error) => {
        console.warn('Error registering service worker:');
        console.warn(error);
      });
    }
  });