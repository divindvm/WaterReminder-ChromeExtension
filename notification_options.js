
function setNotification(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
  options.frequency.disabled = isDeactivated; 
}


function setNotificationSound(isDeactivated) {
    soundOptions.style.color = isDeactivated ? 'graytext' : 'black';
    soundOptions.sound.disabled = isDeactivated; 
}



window.addEventListener('load', function() {
  
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
  options.frequency.value = localStorage.frequency;
  soundOptions.isSoundActivated.checked =JSON.parse(localStorage.isSoundActivated);
//   soundOptions.isSoundActivated.checked = JSON.parse(localStorage.isSoundActivated);
  



  if (!options.isActivated.checked) { setNotification(true); }

  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    setNotification(!options.isActivated.checked);
  };


  if (!soundOptions.isSoundActivated.checked) { setNotificationSound(true); }

  soundOptions.isSoundActivated.onchange = function() {
    setNotificationSound(!soundOptions.isSoundActivated.checked);
  };



  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };



});


//options for water tracker goal

$(function(){

  chrome.storage.sync.get(['goal','message','sound'], function(items){
      $('#goal').val(items.goal);
      $('#message').val(items.message);
      $('#sound').val(items.sound);

  });

  $('#playAudio').click(function(){
    var notificationSound = $('#sound').val();
    var sound = new Audio('audio/'+notificationSound+'.mp3');
    sound.play();
  });

  $('#save').click(function(){
      var goal = $('#goal').val();
      var message = $('#message').val();
      var sound = $('#sound').val();

      if(goal){
          chrome.storage.sync.set({ 'goal' :goal, 'message':message, 'sound': sound}, function(){
            //   close();
          })
      }
       localStorage.isSoundActivated = $('#soundCheck').is(":checked");
  });

  $('#reset').click(function(){
      chrome.storage.sync.set({ 'total' : 0},function(){
          var opt = {
              type: "basic",
              title: "Total Reset",
              message : "Total Number of Glasses Consumed Today has been reset to zero.",
              iconUrl:"icon.png"
          }

          chrome.notifications.create('reset', opt, function(){});
      });
  });

});
