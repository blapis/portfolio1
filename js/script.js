$(document).ready(function(){

  $.timeSystem=function(){
    var date = new Date();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = date.getDate();
    var hour = date.getHours();
    var minute = ("0" + date.getMinutes()).slice(-2);
    var week = date.getDay();
    var week_text=["일","월","화","수","목","금","토"];


    $(".hour").text(hour);
    $(".minute").text(minute);
    $(".month").text(month);
    $(".day").text(day);
    $(".week").text(week_text[week]);
    if(hour>12){
      $(".ampm").text("오후");
      $(".header_time").find(".hour").text(hour-12);
    }
    else{
      $(".ampm").text("오전");
    }
  };

  $.timeSystem();

  setInterval(function(){
    $.timeSystem();
  },10000);
    
  $('a').smoothScroll({
    speed: 320,
    easing: 'easeOutQuad'
  });

  var w_w = window.innerWidth;
    var w_h = window.innerHeight;

  $(window).on("load resize", function (e) {
    
    var w_w = window.innerWidth;
    var w_h = window.innerHeight;
    console.log(w_w);
  });

  /* battery */
  var battery=101;

  $.battery_system=function(){
    if(battery>=2)
    battery-=1;
    $(".battery_percent").text(battery);
    if(battery<=70){
      $(".fa-battery-full").removeClass("battery_on");
      $(".fa-battery-three-quarters").addClass("battery_on");
    }

    if(battery<=50){
      $(".fa-battery-three-quarters").removeClass("battery_on");
      $(".fa-battery-half").addClass("battery_on");
    }

    if(battery<=25){
      $(".fa-battery-half").removeClass("battery_on");
      $(".fa-battery-quarter").addClass("battery_on");
    }

    if(battery<=10){
      $(".fa-battery-quarter").removeClass("battery_on");
      $(".fa-battery-empty").addClass("battery_on");
    }
  };

  $.battery_system();

  setInterval(function(){
    $.battery_system();
  },5000);

  

  $(".draggable").draggable(
    
    {
      containment: ".dragWrap"
    },
    {
      scroll: false
    },
    {
      
      stop: function (event, ui) {

        //droppable 객체가 아닌곳에 드래그 됫을때

        if ($(this).offset().top >w_h/-2) {
          console.log($(this).offset().top);
          $(this).css({"top":"100vh","transition":"0.3s,easeOutQuad"});
          setTimeout(function(){
            $(".draggable").css({"transition":"none"});
          },300);
          return true;

          //droppable 객체에 들어갓을때

        } else {
          $(this).css({"top":"0px","transition":"0.3s,easeOutQuad"});
          isRevert = true;

          
            $(".intro").addClass("intro_open");
            $(".header").addClass("header_on");
            $(".intro__iconBox").addClass("intro_open");
         
          setTimeout(function(){
            $(".dragWrap").fadeOut();
          },400);
        }

      }
    }
  );

  $(".intro__iconBox").click(function(e){
      x = e.pageX;
      y = e.pageY;
      $(".introduce").css({
        "top" : y,
        "left" : x
      });
      $(".introduce").addClass("app_open");
      $(".introduce").animate({
        top: "0%",
        left : "0%",
        right:"0%",
        bottom:"0",
        transform : "translate(-50%, -50%)",
        width: "100%",
        height: "100vh" 
      },300,"easeOutQuad");
  });

 

  /* 
  
  var w_w = window.innerWidth;
  
  $(".introduce").on('mousewheel DOMMouseScroll', function(e) {
    
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