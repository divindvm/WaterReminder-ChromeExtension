var myNotificationID = null;

function audioNotification(notificationSound){
  // console.log("notidfication Sound Passed : "+notificationSound);
  var sound = new Audio('audio/'+notificationSound+'.mp3');
  sound.play();
}

// function show() {
//   var time = /(..)(:..)/.exec(new Date());     
//   var hour = time[1] % 12 || 12;              
//   var period = time[1] < 12 ? 'a.m.' : 'p.m.'; 
//   var message;
//   var notificationSound;

//   chrome.storage.sync.get(['message','sound'], function(items){
//      message =items.message;
//      notificationSound=items.sound;

//      if(message == ""){
//       message = 'Hi, Friend. Time to drink some WATER.'
//     }
    
//     new Notification(hour + time[2] + ' ' + period, {
//       icon: 'icon.png',
//       body: message
//     });

//     console.log("localStorage.isSoundActivated : "+JSON.parse(localStorage.isSoundActivated));

//     if(JSON.parse(localStorage.isSoundActivated)){
//       audioNotification(notificationSound);
//     }
//   });
// }


if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   
  localStorage.frequency = 1;        
  localStorage.isInitialized = true; 
  localStorage.isSoundActivated = true;
  var goal=10;
  var message = "Hello Friend, Looks like  it's time to drink some water.";
  var sound = "Bubble";
  var total = 0;
  chrome.storage.sync.set({ 'goal' :goal, 'message':message, 'sound': sound, 'total' : total}, function(){
    var opt = {
        type: "basic",
        title: "Thank You for Downloading. We will keep you hydrated.",
        message : "Right click on the icon at the top and select options to change settings.",
        iconUrl:"icon.png"
    }
    chrome.notifications.create('saveChanges', opt, function(){});
  });

}




if (window.Notification) {
  // if (JSON.parse(localStorage.isActivated)) { show(); }
  // var interval = 0; 
  // setInterval(function() {
  //   interval++;
  //   if (
  //     JSON.parse(localStorage.isActivated) &&
  //       localStorage.frequency <= interval
  //   ) {
  //     show();
  //     interval = 0;
  //   }
  // }, 60000);
}


function showNotification() {
  if(JSON.parse(localStorage.isSoundActivated)){
    audioNotification(notificationSound);
  }
}


chrome.notifications.onClicked.addListener(function( notificationId ) {
  // launch();
  chrome.notifications.clear(notificationId, function() {});
});

chrome.alarms.onAlarm.addListener(function( alarm ) {

    var percentage = 0;
    chrome.storage.sync.get(['total','goal'], function(items){

        percentage = (items.total/items.goal)*100;

        var opt = {
          type: "progress",
          title: "Alarm",
          message : "alarm started",
          iconUrl:"icon.png",
          buttons: [{
            title: "Yes, get me there",
            iconUrl: "icon.png"
          }, {
              title: "Get out of my way",
              iconUrl: "icon.png"
          }],
          progress : percentage
        }
        chrome.notifications.create('saveChanges', opt, function(id){ myNotificationID = id;});
    });

});


/* Respond to the user's clicking one of the buttons */
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
  if (notifId === myNotificationID) {
      if (btnIdx === 0) {
          // window.open("...");
          chrome.notifications.clear(notifId, function () {


            chrome.storage.sync.get(['total','goal'], function (items){
              var newTotal = parseInt(items.total) + 1;
             
  
              chrome.storage.sync.set({'total': newTotal});


              if(newTotal >= items.goal){
                  
                  var opt = {
                      type: "basic",
                      title: "Goal Reached. Well Done!",
                      message : "You Reached Your Goal " + items.goal + " !",
                      iconUrl:"icon.png"
                  }
  
                  chrome.notifications.create('goalReached', opt, function(){});
              }

  
          })

          })

          console.log("Addd water");
      } else if (btnIdx === 1) {
          // saySorry();
          chrome.notifications.clear("myNotificationID");
      }
  }
});

/* Add this to also handle the user's clicking 
* the small 'x' on the top right corner */
chrome.notifications.onClosed.addListener(function() {
  // saySorry();
});

/* Handle the user's rejection 
* (simple ignore if you just want to hide the notification) */
function saySorry() {
  alert("Sorry to bother you !");
}