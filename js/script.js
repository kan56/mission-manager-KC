console.log("hello,world!");


//データを格納する変数を作成
var datas = [
    {id: "#d1",m: new Array(3)},
    {id: "#d2",m: new Array(1)},
    {id: "#d3",m: new Array(1)},
    {id: "#d4",m: new Array(1)},
    {id: "#d5",m: new Array(1)},
    {id: "#d6",m: new Array(1)},
    {id: "#d7",m: new Array(1)},
    {id: "#d8",m: new Array(1)},
];

//現在の時間を格納する変数を作成
var time = new Date();

function rerodeData() {
    for(var i = 0;i < datas.length;i ++){
        for(var j = 0;j < datas[i].m.length;j ++){
            if(datas[i].m[j] == 1 && $($(datas[i].id)[0].children.item(j)).hasClass("btn-primary")){
                $($(datas[i].id)[0].children.item(j)).removeClass("btn-primary").addClass("btn-secondary").addClass("disabled");
            }else if(datas[i].m[j] != 1 && $($(datas[i].id)[0].children.item(j)).hasClass("btn-secondary")){
                $($(datas[i].id)[0].children.item(j)).removeClass("btn-secondary").removeClass("disabled").addClass("btn-primary");
            }
        }
        if(datas[i].m.filter(x => x == 1).length == datas[i].m.length && $(datas[i].id).next().css("display") != "block"){
            $(datas[i].id).next().show();
        }else if(datas[i].m.filter(x => x == 1).length != datas[i].m.length && $(datas[i].id).next().css("display") == "block"){
            $(datas[i].id).next().hide();
        }
    }
}


//読み込まれたときに実行
$(function(){

    
    //ローカルストレージからデータを取得
    var tempData = localStorage.getItem('datas');
    if(tempData != null){
        datas = JSON.parse(tempData);
        rerodeData();
    }else{
        $(".crear").hide();
    }


    $(".dayryBtn").on("click",function() { 
        var index = $(this).parent().attr("id");
        index = Number(index.slice(1,index.length));
        console.log(datas[index-1]);
        console.log($(this).parent().children("button").index(this));
        datas[index-1].m[$(this).parent().children("button").index(this)] 
        if(datas[index-1].m[$(this).parent().children("button").index(this)] == 1){
            if(confirm($(this).text() + "を未達成の状態に戻しますか？")){
                datas[index-1].m[$(this).parent().children("button").index(this)] = 0;
            }
        }else{
            datas[index-1].m[$(this).parent().children("button").index(this)] = 1;
        }
        localStorage.setItem("datas",JSON.stringify(datas));
        rerodeData();
    });
    // $(".dayryBtn").on("click",function(){
    //     if($(this).hasClass("disabled")){
    //         if(confirm($(this).text() + "を未達成の状態に戻しますか？")){
    //             $(this).removeClass("btn-secondary");
    //             $(this).addClass("btn-primary");
    //             $(this).removeClass("disabled");
    //             if($(this).parent().next().css("display") == "block"){
    //                 $(this).parent().next().hide();
    //             }
    //         }
    //     }else{
    //         $(this).removeClass("btn-primary").addClass("btn-secondary").addClass("disabled");
    //         var parent = $(this).parent();

    //         for(var i = 0;i < parent.children("button").length;i ++){
    //             if(!$(parent[0].children.item(i)).hasClass("disabled")){
    //                 break;
    //             }else if(i === parent.children("button").length - 1){
    //                 parent.next().show();
    //             }
    //         }
    //     }
    // });

    $("#dayrytime").text("残り" + (23 - time.getHours()) + "時間" + (59 - time.getMinutes()) + "分");

    setInterval(function(){
        time = new Date();
        $("#dayrytime").text("残り" + (23 - time.getHours()) + "時間" + (59 - time.getMinutes()) + "分");
    },1000*60)
});