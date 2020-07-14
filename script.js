var $root = $('html, body');
var $window = $(window);
var timing_page = "cubic-bezier(.65,.10,.0,.65)";
var ontoppage = false; //used to control nav
var onfirstpage = false;
var onsecondpage = false;
var onthirdpage = false;
var onfourthpage = false;
var iscarouselmoving = false;
var carousel_interval_listener;
var firstpage;
var secondpage;
var thirdpage;
var fourthpage;

var page_inc = 50;

var navbgcolorhover = "#aaa";

$(document).ready(function(){
    $(window).trigger('scroll');
    loadPage(1);
    $('#bg-parallax').css('transform', 'perspective(1000px) translate3d('+1*10+'px,'+1*-10+'px,'+1*-50+'px) rotate3d('+(1)+','+(1)+',0,2deg)');
    
    
    $.each($('.arrow_down'), function(){
        var element = $(this);
        var index = element.attr('value');
        
        element.click(function(){
            goToPage(parseInt(index)+1);
        });
    });
    $.each($('.nav div'), function(){
        var element = $(this);
        var index = element.attr('value');
        
        element.click(function(){
            goToPage(parseInt(index));
        });
    });
        
    firstpage = $('#s1').offset().top;
    secondpage = $('#s2').offset().top;
    thirdpage = $('#s3').offset().top;
    fourthpage = $('#s4').offset().top;
});

$window.on('scroll', function(){
    
    var scrollPos = $(window).scrollTop();
    var scrollBottom = $(window).scrollTop() + $(window).height() - 100;
    
    if (scrollPos >= 0 && scrollPos <= 50) {
        $('.navbg').css('width','0');
        changeColor('.nav div', '#fff', '0');
   
    } else {
        expandWidth('.navbg', 0);
        changeColor('.nav div', '#000', '0');
    }
    
    //Do parallax only if scroll pos is on first page
    if (scrollPos < $(window).height()) {
        $(window).mousemove(function(event){

        var window_width = $(window).width();
        var window_height = $(window).height();
        var x = ((event.pageX/window_width)-0.5)*2;
        
        var y = ((event.pageY/window_height)-0.5)*-2;
        
        $('#bg-parallax').css('transform', 'perspective(1000px) translate3d('+x*10+'px,'+y*-10+'px,'+y*-50+'px) rotate3d('+(y)+','+(x)+',0,2deg)');
        
        $('#s1 #title').css('transform', 'perspective(1000px) translate3d('+x*10+'px,'+y*-10+'px,1px) rotate3d('+(y)+','+(x)+',0,2deg)');
        
        $('#s1 #subtitle').css('transform', 'perspective(10000px) translate3d('+x*3+'px,'+y*-3+'px,3px) rotate3d('+(y)+','+(x)+',0,2deg)');
        
        });
    } else {
        $(window).mousemove(function(event){
           $('#bg-parallax').css('transform', 'perspective(1000px) translate3d('+1*10+'px,'+1*-10+'px,'+1*-50+'px) rotate3d('+(1)+','+(1)+',0,2deg)');
    
            $('#s1 #title').css('transform', 'perspective(1000px) translate3d('+1*10+'px,'+1*-10+'px,1px) rotate3d('+(1)+','+(1)+',0,2deg)');

            $('#s1 #subtitle').css('transform', 'perspective(10000px) translate3d('+1*3+'px,'+1*-3+'px,3px) rotate3d('+(1)+','+(1)+',0,2deg)'); 
            });
    }
    
    if (scrollPos > thirdpage - 200 && scrollPos < fourthpage){
       //do carousel animation
        //auto move carousel every n second
        if (iscarouselmoving == false){
            moveCarousel();
            carousel_interval_listener = setInterval(function(){
                moveCarousel();
            }, automove_speed * 1000);
            iscarouselmoving = true;
        }
    } else {
        iscarouselmoving = false;
        clearInterval(carousel_interval_listener);
    }
    
    //SCROLL RULES
    
    if (scrollPos >= firstpage - page_inc && scrollPos < secondpage - page_inc){
        if (!onfirstpage){
            loadPage(1);
            onfirstpage = true;
        }
    } else onfirstpage = false;
    
    if (scrollPos >= secondpage - page_inc && scrollPos < thirdpage - page_inc){
        if (!onsecondpage){
            loadPage(2);
            onsecondpage = true;
        }
    } else onsecondpage = false;
    
    if (scrollPos >= thirdpage - page_inc && scrollPos < fourthpage - page_inc){
        if (!onthirdpage){
            loadPage(3);
            onthirdpage = true;
        }
    } else onthirdpage = false;
    
    if (scrollPos >= fourthpage - page_inc){
        if (!onfourthpage){
            loadPage(4);
            onfourthpage = true;
        }
    } else onfourthpage = false;
    
});

         
             
function loadPage(page) {
    $('.nav div').css('font-weight', '');
    $('.nav div').css('background', '');
    $('.nav div').eq(page - 1).css('font-weight', '800');

    $('.nav div').hover(
            function(){
                $(this).css('background', navbgcolorhover);
        },
            function(){
                $(this).css('background', '');
        });
    
    if (page == 1){
        $('.nav div').eq(page - 1).css('background', '');
        $('.nav div').hover(
            function(){
                $(this).css('background', '');
                $(this).css('border-bottom', '1px #fff solid');
        },
            function(){
                $(this).css('border-bottom', '');
        });
    } else {
        $('.nav div').hover(
            function(){
                $(this).css('border-bottom', '');
        });
    }
    if (page == 2){
    } else {
        
    }
    if (page == 3){
        
    } else {
        
    }
    if (page == 4){
        
    } else {
        
    }
    if (page == 5){
        
    } else {
        
    }
    if (page == 6){
        
    } else {
        
    }
    
}

function goToPage(page){
    var page_scrollTop;
    switch(page){
        case 1: page_scrollTop =  firstpage;
            break;
        case 2: page_scrollTop =  secondpage;
            break;
        case 3: page_scrollTop =  thirdpage;
            break;
        case 4: page_scrollTop =  fourthpage;
            break;
        
    }
    $root.animate({
        scrollTop: page_scrollTop
    }, 700, "swing");
}

function fromLeft(element, delay) {
    $(element).css('transform', 'translateX(-100%)');
    $(element).css('transition', 'all 0s ease');
    
    setTimeout(function(){
        $(element).css('transform', '');
        $(element).css('transition', 'all 0.5s ease');


    }, delay);
}
function fromTop(element, delay) {
    $(element).css('transform', 'translateY(-100%)');
    $(element).css('transition', 'all 0s ease');
    
    setTimeout(function(){
        $(element).css('transform', '');
        $(element).css('transition', 'all 0.5s ease');


    }, delay);
}
function fromRight(element, delay) {
    $(element).css('transform', 'translateX(100%)');
    $(element).css('transition', 'all 0s ease');
    
    setTimeout(function(){
        $(element).css('transform', '');
        $(element).css('transition', 'all 0.4s ease-out');


    }, delay);
}

function expandWidth(element, delay) {
    setTimeout(function(){
        $(element).css('width', '');
        $(element).css('transition', 'all 0.6s ' + timing_page);


    }, delay);
}

function changeColor(element, color, delay){
    setTimeout(function(){
        $(element).css('color', color);


    }, delay);
}
