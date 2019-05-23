
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


  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
              label: 'My First dataset',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45]
          }]
      },

      // Configuration options go here
      options: {}
  });

});

//options for water tracker goal

$(function(){

  chrome.storage.sync.get(['goal','message','sound'], function(items){

      $('#goal').val(items.goal);
      $('#message').val(items.message);
      $('#sound').val(items.sound);

      if(items.sound == null || items.sound == ""){
        $('#sound').val("A Beautiful Drop");
      }

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
            // var opt = {
            //     type: "basic",
            //     title: "Changes Saved Successfully.",
            //     message : "",
            //     iconUrl:"icon.png"
            // }
            var opt = {
              type: "progress",
              title: "Primary Title",
              message: "Primary message to display",
              iconUrl: "icon.png",
              progress: 42
            }
            chrome.notifications.create('saveChanges', opt, function(){});
              close();
          });
      }

      else{
        alert("Goal Not Set");
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
