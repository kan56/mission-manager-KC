console.log("hello,world!");

var time = new Date();

$(function(){
    $(".btn").on("click",function(){
        if($(this).hasClass("disabled")){
            if(confirm($(this).text() + "を未達成の状態に戻しますか？")){
                $(this).removeClass("disabled");
            }
        }else{
            $(this).addClass("disabled");
        }
    });

    $("#dayrytime").text("残り" + (24 - time.getHours()) + "時間" + (60 - time.getMinutes()) + "分");
});