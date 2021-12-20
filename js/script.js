$(document).ready(function () {

  console.log($(".working_pentaWrap").offset().top);

  $.timeSystem = function () {
    var date = new Date();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = date.getDate();
    var hour = date.getHours();
    var minute = ("0" + date.getMinutes()).slice(-2);
    var week = date.getDay();
    var week_text = ["일", "월", "화", "수", "목", "금", "토"];


    $(".hour").text(hour);
    $(".minute").text(minute);
    $(".month").text(month);
    $(".day").text(day);
    $(".week").text(week_text[week]);
    if (hour > 12) {
      $(".ampm").text("오후");
      $(".header_item").find(".hour").text(hour - 12);
    }
    else {
      $(".ampm").text("오전");
    }
  };

  $.timeSystem();

  setInterval(function () {
    $.timeSystem();
  }, 10000);

  $('a').smoothScroll({
    speed: 320,
    easing: 'easeOutQuad'
  });

  var w_w = window.innerWidth;
  var w_h = window.innerHeight;


  var bar_target_top = $(".home_barWrap").offset().top;
  var bar_top = $(".home_bar").offset().top;
  var bar_height = bar_top - bar_target_top;
  console.log("bar :" + bar_height);
  $(window).on("load resize", function (e) {

    var w_w = window.innerWidth;
    var w_h = window.innerHeight;
    console.log(w_w);
    var bar_target_top = $(".home_barWrap").offset().top;
    var bar_top = $(".home_bar").offset().top;
    $(".home_bar").draggable(
      {
        containment: ".home_barWrap"
      },
      {
        scroll: false,
      },
      {

        stop: function (event, ui) {

          if (($(this).offset().top <= bar_target_top)) /* 끝까지 드래그 시, */ {
            $(this).css({ "top": bar_height, "transition": "0.2s,easeOutQuad!important" });
            
              $(".header").removeClass("darkMode");
              $(".home_bar").removeClass("darkMode");

            $("section.app_open").removeClass("app_open").addClass("remove_app").fadeOut(200).show();
            
            setTimeout(function () {
              $(".draggable_screen").css({ "transition": "none" });
              $("section.remove_app").css({
                width: "0%",
                height: "0vh"
              }).removeClass("remove_app");
              
            }, 400);

          }
          else {
            $(this).css({ "top": bar_height, "transition": "0.2s,easeOutQuad!important" });
            setTimeout(function () {
              $(".draggable_screen").css({ "transition": "none" });
            }, 200);
          }

        }
      }

    );

    $(".draggable_screen").draggable(

      {
        containment: ".dragWrap"
      },
      {
        scroll: false
      },
      {

        stop: function (event, ui) {

          //droppable 객체가 아닌곳에 드래그 됫을때

          if ($(this).offset().top > (w_h * 2 / -5)) {
            console.log($(this).offset().top);
            $(this).css({ "top": "100vh", "transition": "0.3s,easeOutQuad" });
            setTimeout(function () {
              $(".draggable_screen").css({ "transition": "none" });
            }, 300);
            return true;

            //droppable 객체에 들어갓을때

          } else {
            $(this).css({ "top": "0px", "transition": "0.3s,easeOutQuad" });
            isRevert = true;


            $(".intro").addClass("intro_open");
            $(".header").fadeIn();
            $(".intro__iconBox").addClass("intro_open");

            setTimeout(function () {
              $(".dragWrap").fadeOut();
            }, 400);
          }

        }
      }
    );

    var future_dragTop=(w_h * 4 / -5);

    /* future */
    $(".future").draggable(

      {
        axis: "y"
      },
      {
        scroll: false
      },
      {

        stop: function (event, ui) {

          //실패

          
          
          if ($(this).offset().top < future_dragTop) {
            
            $(this).css({ "top": "-100vh", "transition": "0.3s,easeOutQuad" });
            $(this).find(".future_handle").show();
            $("section.app_open").removeClass("blur");
            $(".header").fadeIn(300);
            $(".intro").addClass("intro_open");
            future_dragTop=(w_h * 4 / -5);
            setTimeout(function () {
              $(".future").css({ "transition": "0s" });
            }, 300);
            return true;

            //droppable 객체에 들어갓을때

          } else {
            $(this).css({ "top": "0px", "transition": "0.3s,easeOutQuad" });
            $(this).find(".future_handle").hide();
            $("section.app_open").addClass("blur");
            $(".header").fadeOut(300);
            $(".intro").removeClass("intro_open");
            setTimeout(function () {
              $(".future").css({ "transition": "0s" });
            }, 300);
            future_dragTop=(w_h * 1 / -9);
            isRevert = true;
          }

        }
      }
    );
  });

  

  /* battery */
  var battery = 101;

  $.battery_system = function () {
    if (battery >= 2)
      battery -= 1;
    $(".battery_percent").text(battery);
    if (battery <= 70) {
      $(".fa-battery-full").removeClass("battery_on");
      $(".fa-battery-three-quarters").addClass("battery_on");
    }

    if (battery <= 50) {
      $(".fa-battery-three-quarters").removeClass("battery_on");
      $(".fa-battery-half").addClass("battery_on");
    }

    if (battery <= 25) {
      $(".fa-battery-half").removeClass("battery_on");
      $(".fa-battery-quarter").addClass("battery_on");
    }

    if (battery <= 10) {
      $(".fa-battery-quarter").removeClass("battery_on");
      $(".fa-battery-empty").addClass("battery_on");
    }
  };

  $.battery_system();

  setInterval(function () {
    $.battery_system();
  }, 5000);


  $.icon_click = function (cs, x, y) {
    $(cs).css({
      "top": y,
      "left": x
    });
    $(cs).show();
    $(cs).addClass("app_open");
    
    $(cs).animate({
      top: "0%",
      left: "0%",
      right: "0%",
      bottom: "0",
      transform: "translate(-50%, -50%)",
      width: "100%",
      height: "100vh"
    }, 200, "easeOutQuad");

  };

  /* icon_click */
  $(".memo_icon").click(function (e) {
    x = e.pageX;
    y = e.pageY;
    $.icon_click(".memo", x, y);
    $(".header").addClass("darkMode");
    $(".home_bar").addClass("darkMode");
  });

  $(".netflix_icon").click(function (e) {
    x = e.pageX;
    y = e.pageY;
    $.icon_click(".netflix", x, y);
  });

  $(".working_icon").click(function (e) {
    x = e.pageX;
    y = e.pageY;
    $.icon_click(".working", x, y);
    $(".header").addClass("darkMode");
    $(".home_bar").addClass("darkMode");
  });

  /* memo */
  $(".memo").find(".tab_item").click(function () {
    var tab_num = $(this).index();
    $(this).siblings().removeClass("open_tab");
    $(this).addClass("open_tab");
    $(".contents_wrap .contents_item").eq(tab_num).addClass("open_tab");
    $(".contents_wrap .contents_item").eq(tab_num).siblings().removeClass("open_tab");

    if (tab_num >= 3) {
      $(".tab_header").text("계획");
    }
    else {
      $(".tab_header").text("배운 점");
    }
  });

  /* netflix */
  var current_index = 0;
  var dup_prev=0;
  $(".slider_img_wrap:first-child").siblings().hide();
  var desc =["졸업작품", "펜타브리드 입사","지금 이 일이 너무 재밌습니다"]
  $(".slider_img_wrap").click(function () {
    

    if(dup_prev==1){
      return 0;
    }

    var img_index = $(".slider_img_wrap").length;
    current_index += 1;
    if (img_index == current_index) {
      current_index = 0;
    }
    $(this).fadeOut(400);
    $(".slider_img_wrap").eq(current_index).fadeIn(400);
    $(".desc").text(desc[current_index]);
    
    setTimeout(function(){
      dup_prev=0;
    },400);
    dup_prev=1;
  });

  /* working */
  $('.working_samsungWrap .slick_wrap').slick({
    infinite: false,
    slidesToScroll: 1,
    arrows: true,
    variableWidth: true,
    

  });

  $(".slick-prev").hide();
  $(".slick-next").html("→");

  $(".slick_wrap").mouseover(function(){
    $(".slick-arrow").addClass("slick-hover");
  });

  $(".slick_wrap").mouseout(function(){
    $(".slick-arrow").removeClass("slick-hover");
  });

  /* future */
  $(".button_x").click(function(){
    $(".future_slider_wrap").slideUp();
  });

  /* 
  
  var w_w = window.innerWidth;
  
  $(".memo").on('mousewheel DOMMouseScroll', function(e) {
    
    position_x = $(".slierWrap").offset();
    
    
    if(position_x.left>=w_w*-4){
     
    $(".slierWrap").css("left", position_x.left - w_w);
    event.preventDefault();
    }

    else{

    }
  }); */




});
/* 
window.onload = function () {
    var elm = "section";
    $(elm).each(function (index) {
        // 개별적으로 Wheel 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function (e) {
            e.preventDefault();
            var delta = 0;
            if (!event) event = window.event;
            if (event.wheelDelta) {
                delta = event.wheelDelta / 120;
                if (window.opera) delta = -delta;
            } 
            else if (event.detail)
                delta = -event.detail / 3;
            var moveTop = $(window).scrollTop();
            var elmSelecter = $(elm).eq(index);
            // 마우스휠을 위에서 아래로
            if (delta < 0) {
                if ($(elmSelecter).next() != undefined) {
                    try{
                        moveTop = $(elmSelecter).next().offset().top;
                    }catch(e){}
                }
                
            // 마우스휠을 아래에서 위로
            } else {
                if ($(elmSelecter).prev() != undefined) {
                    try{
                        moveTop = $(elmSelecter).prev().offset().top;
                    }catch(e){}
                }
            }
             
            // 화면 이동 0.8초(800)
            $("html,body").stop().animate({
                scrollTop: moveTop + 'px'
            }, {
                duration: 600, complete: function () {
                }
            });
        });
    });
  } */