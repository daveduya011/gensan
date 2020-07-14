var caroimage_spreadx = -300;
var caroimage_spreadz = 100;
var caro_activeimage = 0;
var caro_visibleimages = 5;
var automove_speed = 4;


$(document).ready(function(){
    
     $.each($('.carousel .caro_image'), function(){
         var element = $(this);
         
         element.css('transition', 'all 0.5s ease');

     });
    
});

function moveCarousel(){
    caro_activeimage++;
    updateCarousel();
}

function updateCarousel(){
    var imgcount = caro_activeimage;
    
    
    $.each($('.carousel .caro_image'), function(){
        var element = $(this);
        var image = element.attr('data-image');
        var bgpos = element.attr('bg-position');
        var num, numz;
        
        
        
        if (imgcount%5 > $('.caro_image').length/2){
            
            num = ($('.caro_image').length - imgcount%5)*-1;
            
        } else {    
            num = imgcount%5;
        }
        
        if (num < 0) {
            numz = num * -1;
        } else {
            numz= num;
        }
        
        element.css('background','url("'+image+'")');
        element.css('background-size','cover');
        
        if (bgpos){
            element.css('background-position', bgpos);
        } else {
            element.css('background-position', 'center');
        }
        
        element.css('z-index', Math.round(numz*-1));
        element.css('transform', 'perspective(400px) translate3d('+
                    caroimage_spreadx*num+
                    'px, 0, '+
                    caroimage_spreadz*numz*-1+
                    'px)');
        
        imgcount++;
        
    });
}