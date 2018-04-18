$(function(){

    chrome.storage.sync.get(['total','goal'], function(items){
        $('#total').text(items.total);
        $('#goal').text(items.goal);
        // $('#amount').value("1");

        var percentage = (items.total/items.goal)*100;
        
        if(percentage<10 && percentage>=0){
            $("#glass").attr("src","images/one.gif");
        }
        else if(percentage<25 && percentage>=10){
            $("#glass").attr("src","images/two.gif");
        }
        else if(percentage<50 && percentage>=25){
            $("#glass").attr("src","images/three.gif");
        }
        else if(percentage<75 && percentage>=50){
            $("#glass").attr("src","images/four.gif");
        }
        else if(percentage<100 && percentage>=75){
            $("#glass").attr("src","images/five.gif");
        }
        else{
            $("#glass").attr("src","images/goal.gif");
        }
    
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