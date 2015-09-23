<<<<<<< HEAD
$(window).load(function(){var s=$(".js-panel-sign-up"),a=$(".js-panel-sign-in");$(".js-sign-up").on("click",function(){s.hasClass("out")&&s.removeClass("out").addClass("in"),a.hasClass("in")&&a.removeClass("in").addClass("out")}),$(".js-back-to-sign-in").on("click",function(e){e.preventDefault(),s.hasClass("in")&&s.removeClass("in").addClass("out"),a.hasClass("out")&&a.removeClass("out").addClass("in")}),$("#formLogin").form("submit",{onSubmit:function(){var s=$(".js-alert"),a=$(this).form("validate");return a?console.log("error"):(s.removeClass("alert-hide"),s.addClass("alert-show"),setTimeout(function(){$(".js-alert").addClass("alert-hide")}.bind(void 0,10),3e3)),$(this).form("enableValidation").form("validate")},success:function(){console.log("success")}}),qc.main.slideMenuUrl="/assets/javascripts/json/sidebarNav/mainMenuTreeData.json",$("#userProfile").dialog({title:"User Profile",width:360,height:580,closed:!0,cache:!0,modal:!0,iconCls:"fa fa-user"})});
=======

$(window).load(function(){

  //### Login Page Panel Animations
  //
  //###############################
  var jsPanelSignUp = $('.js-panel-sign-up');
  var jsPanelSignIn = $('.js-panel-sign-in');

  $('.js-sign-up').on("click",function(){
    if(jsPanelSignUp.hasClass('out')){
      jsPanelSignUp.removeClass('out').addClass('in');
    }
    if(jsPanelSignIn.hasClass('in')){
      jsPanelSignIn.removeClass('in').addClass('out');
    }
  });

  $('.js-back-to-sign-in').on("click",function(e){
    e.preventDefault();
    if(jsPanelSignUp.hasClass('in')){
      jsPanelSignUp.removeClass('in').addClass('out');
    }
    if(jsPanelSignIn.hasClass('out')){
      jsPanelSignIn.removeClass('out').addClass('in');
    }
  });

  //### Form Validate Control
  //
  //###############################
  $('#formLogin').form('submit', {
    onSubmit: function () {
      var jsAlert =  $('.js-alert');
      var isValid = $(this).form('validate');
      if (!isValid) {
        jsAlert.removeClass('alert-hide');
        jsAlert.addClass('alert-show');
        setTimeout(function(){
          $('.js-alert').addClass('alert-hide');
        }.bind(undefined, 10), 3000);

      }else{
        console.log('error');
      }
      return $(this).form('enableValidation').form('validate');
    },

    success: function () {
      console.log('success');
    }
  });

  //### User Profile Dialog
  //
  //###############################
  $('#userProfile').dialog({
    title: 'User Profile',
    width: 360,
    height: 580,
    closed:true,
    cache: true,
    modal: true,
    iconCls: 'fa fa-user'
  });
});

//### Navigation JSON Root
//
//###############################
qc.main.slideMenuUrl = "/assets/javascripts/json/sidebarNav/mainMenuTreeData.json";
>>>>>>> develop
