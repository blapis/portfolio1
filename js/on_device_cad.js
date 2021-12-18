$(document).ready(function(){
    $(window).on("load resize", function (e) {
        var w_w = window.innerWidth;

        var $sliderWrap = $(".On_Device_CAD").find(".why__slider");
        $sliderWrap.not('.slick-initialized').slick({
            infinite : true,
            arrows: false,
            slidesToShow: 1,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    dots: true 
                }
            }, {
                breakpoint: 3000,
                settings: 'unslick'
    
            }
            ]
        });

        var $sliderWrap2 = $(".On_Device_CAD").find(".clinical__slider");
        $sliderWrap2.not('.slick-initialized').slick({
            infinite : true,
            dots: true,
            slidesToShow: 1,
            draggable : true, 
            responsive: [{
                breakpoint: 1024,
                settings: {
                    arrows: false 
                }
            }, {
                breakpoint: 3000,
                settings:{
                    arrows:true,prevArrow : "<button type='button' class='slick-prev'></button>",		// 이전 화살표 모양 설정
                    nextArrow : "<button type='button' class='slick-next'></button>",
                }
    
            }
            ]
        })
        
    });

    $.slider=function(){
        $(".why__slider .why__slider__itemWrap:nth-child(1)").addClass("left_item");
        $(".why__slider .why__slider__itemWrap:nth-child(1)").siblings().removeClass("left_item");
        $(".why__slider .why__slider__itemWrap:nth-child(2)").addClass("center_item");
        $(".why__slider .why__slider__itemWrap:nth-child(2)").siblings().removeClass("center_item");
        $(".why__slider .why__slider__itemWrap:nth-child(3)").addClass("right_item");
        $(".why__slider .why__slider__itemWrap:nth-child(3)").siblings().removeClass("right_item");
    }

    

    $(".why__slider__leftBtn").click(function(){
      $(".why__slider .why__slider__itemWrap:nth-child(3)").after($(".why__slider__itemWrap:nth-child(1)"));
        $.slider();
    });

    $(".why__slider__rightBtn").click(function(){
      $(".why__slider .why__slider__itemWrap:nth-child(1)").before($(".why__slider__itemWrap:nth-child(3)"));
      $.slider();
    });

    
});