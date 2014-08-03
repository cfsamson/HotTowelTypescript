/* JS */


/* Navigation */

$(document).ready(function(){

  $(window).resize(function()
  {
    if($(window).width() >= 765){
      $(".sidebar .sidebar-inner").slideDown(350);
    }
    else{
      $(".sidebar .sidebar-inner").slideUp(350); 
    }
  });

});

$(document).ready(function(){

  $(".has_submenu > a").click(function(e){
    e.preventDefault();
    var menu_li = $(this).parent("li");
    var menu_ul = $(this).next("ul");

    if(menu_li.hasClass("open")){
      menu_ul.slideUp(350);
        menu_li.removeClass("open");
    }
    else{
      $(".navi > li > ul").slideUp(350);
      $(".navi > li").removeClass("open");
      menu_ul.slideDown(350);
      menu_li.addClass("open");
    }
  });

});

$(document).ready(function(){
  $(".sidebar-dropdown a").on('click',function(e){
      e.preventDefault();

      if(!$(this).hasClass("dropy")) {
        // hide any open menus and remove all other classes
        $(".sidebar .sidebar-inner").slideUp(350);
        $(".sidebar-dropdown a").removeClass("dropy");
        
        // open our new menu and add the dropy class
        $(".sidebar .sidebar-inner").slideDown(350);
        $(this).addClass("dropy");
      }
      
      else if($(this).hasClass("dropy")) {
        $(this).removeClass("dropy");
        $(".sidebar .sidebar-inner").slideUp(350);
      }
  });

    //Makes menu cloese when viewed on small screen and an menuitem has been seleceted
    $(".sidebar-inner a").on('click',function()
    {
        if ($(".sidebar-dropdown a").hasClass("dropy"))
        {
            alert("");
            // hide any open menus and remove all other classes
            $(".sidebar .sidebar-inner").slideUp(350);
            $(".sidebar-dropdown a").removeClass("dropy");
        }
    });
});

/* Widget close */

$('.wclose').click(function(e){
  e.preventDefault();
  var $wbox = $(this).parent().parent().parent();
  $wbox.hide(100);
});

/* Widget minimize */

$('.wminimize').click(function(e){
	e.preventDefault();
	var $wcontent = $(this).parent().parent().next('.widget-content');
	if($wcontent.is(':visible')) 
	{
	  $(this).children('i').removeClass('fa fa-chevron-up');
	  $(this).children('i').addClass('fa fa-chevron-down');
	}
	else 
	{
	  $(this).children('i').removeClass('fa fa-chevron-down');
	  $(this).children('i').addClass('fa fa-chevron-up');
	}            
	$wcontent.toggle(500);
}); 

/* Progressbar animation */

setTimeout(function(){

	$('.progress-animated .progress-bar').each(function() {
		var me = $(this);
		var perc = me.attr("data-percentage");

		var current_perc = 0;

		var progress = setInterval(function() {
			if (current_perc>=perc) {
				clearInterval(progress);
			} else {
				current_perc +=1;
				me.css('width', (current_perc)+'%');
			}

			me.text((current_perc)+'%');

		}, 600);

	});

},600);

/* Scroll to Top */


$(".totop").hide();

$(function(){
	$(window).scroll(function(){
	  if ($(this).scrollTop()>300)
	  {
		$('.totop').fadeIn();
	  } 
	  else
	  {
		$('.totop').fadeOut();
	  }
	});

	$('.totop a').click(function (e) {
	  e.preventDefault();
	  $('body,html').animate({scrollTop: 0}, 500);
	});
});

///* jQuery Notification (Gritter) */
//
//$(document).ready(function(){
//
//  /* Auto notification */
//
//  setTimeout(function() {
//
//            var unique_id = $.gritter.add({
//                // (string | mandatory) the heading of the notification
//                title: 'Howdy! User',
//                // (string | mandatory) the text inside the notification
//                text: 'Today you got some messages and new members. Please check it out!',
//                // (string | optional) the image to display on the left
//                image: './img/user.jpg',
//                // (bool | optional) if you want it to fade out on its own or just sit there
//                sticky: false,
//                // (int | optional) the time you want it to be alive for before fading out
//                time: '',
//                // (string | optional) the class name you want to apply to that specific message
//                class_name: 'gritter-custom'
//            });
//
//            // You can have it return a unique id, this can be used to manually remove it later using
//            setTimeout(function () {
//                $.gritter.remove(unique_id, {
//                    fade: true,
//                    speed: 'slow'
//                });
//            }, 10000);
//
//  }, 4000);
//
//  
//});
//
///* Sidebar calendar */
//
//$(function() {
//	$( "#todaydate" ).datepicker();
//});
//
///* Modal fix */
//
//$('.modal').appendTo($('body'));
//
///* Notification box */
//
//$('.slide-box-head').click(function() {
//    var $slidebtn=$(this);
//    var $slidebox=$(this).parent().parent();
//    if($slidebox.css('right')=="-252px"){
//      $slidebox.animate({
//        right:0
//      },500);
//      $slidebtn.children("i").removeClass().addClass("fa fa-chevron-right");
//    }
//    else{
//      $slidebox.animate({
//        right:-252
//      },500);
//      $slidebtn.children("i").removeClass().addClass("fa fa-chevron-left");
//    }
//}); 
//
//
//$('.sclose').click(function(e){
//  e.preventDefault();
//  var $wbox = $(this).parent().parent().parent();
//  $wbox.hide(0);
//});
//
//
//$('.sminimize').click(function(e){
//	e.preventDefault();
//	var $wcontent = $(this).parent().parent().next('.slide-content');
//	if($wcontent.is(':visible')) 
//	{
//	  $(this).children('i').removeClass('fa fa-chevron-down');
//	  $(this).children('i').addClass('fa fa-chevron-up');
//	}
//	else 
//	{
//	  $(this).children('i').removeClass('fa fa-chevron-up');
//	  $(this).children('i').addClass('fa fa-chevron-down');
//	}            
//	$wcontent.toggle(0);
//}); 


  