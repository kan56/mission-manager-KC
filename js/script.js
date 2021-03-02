console.log("hello,world!");

const DAY_NUM = 8;
const WEEK_NUM = 10;
const MONTH_NUM = 8;
const QUARTER_NUM = 13;

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
    {id: "#w1",m: new Array(4)},
    {id: "#w2",m: new Array(1)},
    {id: "#w3",m: new Array(1)},
    {id: "#w4",m: new Array(1)},
    {id: "#w5",m: new Array(1)},
    {id: "#w6",m: new Array(1)},
    {id: "#w7",m: new Array(1)},
    {id: "#w8",m: new Array(1)},
    {id: "#w9",m: new Array(1)},
    {id: "#w10",m: new Array(1)},
    {id: "#m1",m: new Array(1)},
    {id: "#m2",m: new Array(1)},
    {id: "#m3",m: new Array(1)},
    {id: "#m4",m: new Array(1)},
    {id: "#m5",m: new Array(1)},
    {id: "#m6",m: new Array(1)},
    {id: "#m7",m: new Array(1)},
    {id: "#m8",m: new Array(4)},
    {id: "#q1",m: new Array(1)},
    {id: "#q2",m: new Array(1)},
    {id: "#q3",m: new Array(1)},
    {id: "#q4",m: new Array(3)},
    {id: "#q5",m: new Array(1)},
    {id: "#q6",m: new Array(5)},
    {id: "#q7",m: new Array(4)},
    {id: "#q8",m: new Array(4)},
    {id: "#q9",m: new Array(4)},
    {id: "#q10",m: new Array(3)},
    {id: "#q11",m: new Array(4)},
    {id: "#q12",m: new Array(5)},
    {id: "#q13",m: new Array(4)},
];

//現在の時間を格納する変数を作成
var time = new Date();
console.log(time + "1");

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

function reloadTime() {
    //現在時刻を入れる関数(比較用)
    console.log(time + "2");
    var now = new Date();
    console.log(time  + "3");
    switch(true){
        //年が変わっているとき
        case now.getFullYear() != time.getFullYear():
            console.log("年が変わった");

        //月が変わっているとき
        case now.getMonth() != time.getMonth():
            console.log("月が変わった");

        //日が変わっている時
        case now.getDate() != time.getDate():
            console.log("日が変わった");
            for(var i = 0;i < datas.length;i ++){
                for(var j = 0;j < datas[i].m.length;j ++){
                    datas[i].m[j] = 0;
                }
            }

            //週が変わっているとき
            if(now.getTime - time.getTime > 1000*60*60*24*7){
                console.log("週が変わった");
            }else if(now.getDay() - time.getDay() < 1){
                console.log("週が変わった");
            }
            rerodeData();
        break;
    }
    console.log(time);
    time = new Date();
    console.log(time);
    localStorage.setItem("datas",JSON.stringify(datas));
    localStorage.setItem('time',JSON.stringify(time));
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
    var tempTime = localStorage.getItem('time');
    if(tempTime != null){
        time = JSON.parse(tempTime);
        console.log(time);
        time = new Date(time);
        reloadTime();
    }
    reloadTime();

    //任務ボタンが押されたときの処理
    $(".dayryBtn").on("click",function() {
        //押されたボタンに対応するdatasのインデックス番号を取得
        var index = $(this).parent().attr("id");
        var num = Number(index.slice(1,index.length));
        console.log(num);
        switch(index.slice(0,1)){
            case "q":
                num += MONTH_NUM;
            case "m":
                num += WEEK_NUM;
            case "w":
                num += DAY_NUM;
            case "d":
                break;
            default:
                break;
        }
        console.log(num);
        console.log(datas[num]);
        
        //未達成と達成を切り替える
        if(datas[num-1].m[$(this).parent().children("button").index(this)] == 1){
            if(confirm($(this).text() + "を未達成の状態に戻しますか？")){
                datas[num-1].m[$(this).parent().children("button").index(this)] = 0;
            }
        }else{
            datas[num-1].m[$(this).parent().children("button").index(this)] = 1;
        }
        
        //ローカルストレージに保存
        localStorage.setItem("datas",JSON.stringify(datas));
        rerodeData();
    });

    //時間を表示
    $("#dayrytime").text("残り" + (23 - time.getHours()) + "時間" + (59 - time.getMinutes()) + "分");

    //一分毎に時間を更新
    setInterval(function(){
        reloadTime();
        $("#dayrytime").text("残り" + (23 - time.getHours()) + "時間" + (59 - time.getMinutes()) + "分");
    },1000*60)
});