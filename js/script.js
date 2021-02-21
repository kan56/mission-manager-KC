console.log("hello,world!");

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
});