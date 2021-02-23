console.log("hello,world!");

var time = new Date();

$(function(){
    $(".dayryBtn").on("click",function(){
        if($(this).hasClass("disabled")){
            if(confirm($(this).text() + "を未達成の状態に戻しますか？")){
                $(this).removeClass("btn-secondary");
                $(this).addClass("btn-primary");
                $(this).removeClass("disabled");
            }
        }else{
            $(this).removeClass("btn-primary");
            $(this).addClass("btn-secondary");
            $(this).addClass("disabled");
            var parent = $(this).parent();

            for(var i = 0;i < parent.children("button").length;i ++){
                if(!$(parent[0].children.item(i)).hasClass("disabled")){
                    break;
                }else if(i === parent.children("button").length - 1){
                    parent.css("background-color","#ffffaa");
                }
            }
        }
    });

    $("#dayrytime").text("残り" + (24 - time.getHours()) + "時間" + (60 - time.getMinutes()) + "分");

    setInterval(function(){
        time = new Date();
        $("#dayrytime").text("残り" + (24 - time.getHours()) + "時間" + (60 - time.getMinutes()) + "分");
    },1000*60)
});