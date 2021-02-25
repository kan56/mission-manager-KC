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

//datasの内容を反映させる
function rerodeData() {
    //データの数ループを回し、ボタンに状態に応じたスタイルを反映   
    for(var i = 0;i < datas.length;i ++){
        for(var j = 0;j < datas[i].m.length;j ++){
            if(datas[i].m[j] == 1 && $($(datas[i].id)[0].children.item(j)).hasClass("btn-primary")){
                $($(datas[i].id)[0].children.item(j)).removeClass("btn-primary").addClass("btn-secondary").addClass("disabled");
            }else if(datas[i].m[j] != 1 && $($(datas[i].id)[0].children.item(j)).hasClass("btn-secondary")){
                $($(datas[i].id)[0].children.item(j)).removeClass("btn-secondary").removeClass("disabled").addClass("btn-primary");
            }
        }
        //任務が達成されているなら、クリアを表示
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

    //任務ボタンが押されたときの処理
    $(".dayryBtn").on("click",function() {
        //押されたボタンに対応するdatasのインデックス番号を取得
        var index = $(this).parent().attr("id");
        index = Number(index.slice(1,index.length));

        //未達成と達成を切り替える
        if(datas[index-1].m[$(this).parent().children("button").index(this)] == 1){
            if(confirm($(this).text() + "を未達成の状態に戻しますか？")){
                datas[index-1].m[$(this).parent().children("button").index(this)] = 0;
            }
        }else{
            datas[index-1].m[$(this).parent().children("button").index(this)] = 1;
        }
        
        //ローカルストレージに保存
        localStorage.setItem("datas",JSON.stringify(datas));
        rerodeData();
    });

    //時間を表示
    $("#dayrytime").text("残り" + (23 - time.getHours()) + "時間" + (59 - time.getMinutes()) + "分");

    //一分毎に時間を更新
    setInterval(function(){
        time = new Date();
        $("#dayrytime").text("残り" + (23 - time.getHours()) + "時間" + (59 - time.getMinutes()) + "分");
    },1000*60)
});