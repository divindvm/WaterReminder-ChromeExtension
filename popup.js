$(function(){

    chrome.storage.sync.get(['total','goal'], function(items){
        $('#total').text(items.total);
        $('#goal').text(items.goal);
        $('#amount').value("1");
    });

    $('#addAmount').click(function(){
       

        chrome.storage.sync.get(['total','goal'], function (items){
            var newTotal = 0;
            if(items.total){
                newTotal += parseInt(items.total);
            }

            var amount = $('#amount').val();

            if(amount) {
                newTotal+= parseInt(amount);
            }

            chrome.storage.sync.set({'total': newTotal});
            $('#total').text(newTotal);
            $('#amount').val('');

            if(newTotal >= items.goal){
                
                var opt = {
                    type: "basic",
                    title: "Goal Reached. Well Done!",
                    message : "You Reached Your Goal " + items.goal + " !",
                    iconUrl:"icon.png"
                }

                chrome.notifications.create('goalReached', opt, function(){});
            }
            close();

        })

    });
});