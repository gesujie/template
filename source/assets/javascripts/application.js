
$(window).load(function(){

  //### Login Page Panel Animations
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

});

//### Sidebar Navigation JSON
qc.main.slideMenuUrl = "/assets/javascripts/json/sidebarNav/mainMenuTreeData.json";
