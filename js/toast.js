/*	
*   Toast v1.0
*   Manpreet Singh Bhurji (http://msbhurji.com/)
*
*   Directions -
*     $.toast.makeToast(message) or
*     makeToast(message)
*
*   Additional tips -
*    If you want to add a element to close the toast simply give it a class 'plugin-close-class'
*    You can get or set any propery using $.toast.propertyName
*
*   Dependencies -
*     jquery & jquery-ui
*
*   To do -
*     Make it accept HTML
*     Add support to accept height, width, etc parameters in different formats
*/

(function( $ ){
  $.toast = {
  
    id : "plugin-toast",
    closeId : "plugin-toast-close",
    closeClass : "plugin-toast-close",
    bgcolor : "#B5FFCF",
    width : "100%",
    height : "100px",
    bottom : "0",
    appendEle : "body",
    animationSpeed : 700,
    showEffect : "slide",
    hideEffect: "slide", // possible options for showEffect and hideEffect:
                        // blind, bounce, clip, drop, explode*, fold, highlight, puff*, pulsate, scale, shake*, size*, slide
    
    _createToast : function(message) {
      // create toast div
      $(document.createElement("div")).attr({
        id: $.toast.id,
      })
      .css({
        "position": "absolute",
        "background-color": $.toast.bgcolor,
        "bottom": $.toast.bottom,
        "width": $.toast.width,
        "height": $.toast.height,
      })
      .hide()
      .text(message)
      .appendTo($.toast.appendEle);
      
      // create span to close toast
      var toastDiv = document.getElementById($.toast.id);
      $(document.createElement("span")).attr({
        "id": $.toast.closeId,
        "class": $.toast.closeClass,
      })
      .text("Close")
      .css({
        "position": "absolute",
        "bottom": "2px",
        "right": "2px",
        "display": "none",
        "cursor": "pointer"
      })
      .appendTo(toastDiv);
    },
    
    // function to hide toast
    _hideToast: function(effectOptions) {
      var toastDiv = document.getElementById($.toast.id);      
      $(toastDiv).hide($.toast.hideEffect, effectOptions, $.toast.animationSpeed, function() {
        $(this).remove();
      });
    },
    
    makeToast : function(message) {
      $.toast._createToast(message);

      var effectOptions = {};
      
      // some effects require options to be passed. Add specific cases to handle them
      switch ($.toast.showEffect) {
        case "scale":
          //effectOptions = {"percent": "100%"};
          break;
        case "shake":
          break;
        case "size":
           break
        case "slide":
          effectOptions = {"direction": "down"};
          break;
        default:
          break;
      }      
      
      var toastDiv = document.getElementById($.toast.id);      
      $(toastDiv).show($.toast.showEffect, effectOptions, $.toast.animationSpeed, callback);

      function callback() {
        var closeSpan = document.getElementById($.toast.closeId);
        $(closeSpan).show();
        
        // bind function to close toast to any element with closeClass
        $(document.getElementsByClassName($.toast.closeClass)).click(function() {
          $.toast._hideToast(effectOptions);
        });
      }  
    },

  };
  
  // expose function $.toast.makeToast globally as makeToast
  makeToast = function(message) {
    $.toast.makeToast(message);
  }
   
})( jQuery );
