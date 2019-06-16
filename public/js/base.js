/* Button in home (Get Start) */ 
$( ' .from-left ').hover(function() {
    $(this).find('span').eq(0).animate({
        width: '100%'
        
    },500);
    
}, function() {
    $(this).find('span').eq(0).animate({
        width:0
    },500) 
});
/* Start Scroll To Tob Button*/
$(document).ready(function(){
    var scrollButton = $("#scroll-top");
    $(window).scroll(function(){
        console.log($(this).scrollTop());
        if( $(this).scrollTop() >= 700)
                 scrollButton.show();   
        else
                scrollButton.hide();
  
    });
          scrollButton.click(function(){
            $("html,body").animate({scrollTop : 0},700);    
        });
    
});
/* End Scroll To Tob Button*/

/* sign up page */ 
$(document).ready(function(){
    var formInput = $('input[type="email"],input[type="password"],input[type="text"]');
    formInput.focusin(function(){
        $(this).parent().children('p.formLabel').addClass('formTop');
        $('div#form-style').addClass('darken-bg');
    });
    formInput.focusout(function(){
        if($.trim($(this).val()).length == 0) {
            $(this).parent().children('p.formLabel').removeClass('formTop');
        }
        	$('div#form-style').removeClass('darken-bg');
    });
    	$('p.formLabel').click(function(){
		 $(this).parent().children('.form-style').focus();
	});
    
});

/* Creat new survey*/
$(document).ready(function(){
 $('#My-new-survey').click(function(){
   $('#Mymodal').modal('show')
 });
});
$(document).ready(function(){
    $('#new-survey').click(function(){               
      $('#Mymodal').modal('show')
    });
   });
   $(document).ready(function(){
    $('#n-survey').click(function(){               
      $('#Mymodal').modal('show')
    });
   });

/* Show and hide password*/
$(document).ready(function() {
    $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "text"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass( "fa-eye-slash" );
            $('#show_hide_password i').removeClass( "fa-eye" );
        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass( "fa-eye-slash" );
            $('#show_hide_password i').addClass( "fa-eye" );
        }
    });
});