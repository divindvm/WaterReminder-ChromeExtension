(function () {
    'use strict';
     var alarmName = 'remindme';
  
     function checkAlarm(callback) {
       chrome.alarms.getAll(function(alarms) {
  
         var hasAlarm = alarms.some(function(a) {
           return a.name == alarmName;
         });
  
         var newLabel;
         if (hasAlarm) {
           newLabel = 'Cancel alarm';
         } else {
           newLabel = 'Activate alarm';
         }
         document.getElementById('toggleAlarm').innerText = newLabel;
  
         if (callback) callback(hasAlarm);
       });
     }
  
     function createAlarm() {

       var frequency = parseInt(localStorage.frequency) > 0 ? parseInt(localStorage.frequency) : 0.2;

       chrome.alarms.create(alarmName, {
         delayInMinutes: frequency, periodInMinutes: frequency});
     }
  
     function cancelAlarm() {
       chrome.alarms.clear(alarmName);
     }
  
     function doToggleAlarm() {
       checkAlarm( function(hasAlarm) {
         if (hasAlarm) {
           cancelAlarm();
         } else {
           createAlarm();
         }
         checkAlarm();
       });
     }
  
     document.getElementById("toggleAlarm").addEventListener('click', doToggleAlarm);
  
    checkAlarm();
  
  })();
  