
function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
  options.frequency.disabled = isDeactivated; 
}

window.addEventListener('load', function() {
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
  options.frequency.value = localStorage.frequency;


  if (!options.isActivated.checked) { ghost(true); }

  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    ghost(!options.isActivated.checked);
  };

  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };
});


//options for water tracker goal

$(function(){

  chrome.storage.sync.get(['goal','message'], function(items){
      $('#goal').val(items.goal);
      $('#message').val(items.message);
  });

  $('#save').click(function(){
      var goal = $('#goal').val();
      var message = $('#message').val();
      if(goal){
          chrome.storage.sync.set({ 'goal' :goal, 'message':message}, function(){
              close();
          })
      }
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
