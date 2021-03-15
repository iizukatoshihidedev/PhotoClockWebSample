//====================================
//
//フォト時計
//Toshihide Iizuka
//
//2021/03/15
//
//====================================

//Main

//データ
var masterdata = new Array();

function init() {
    initphoto();
    initclock();
}

function initphoto() {
    //ファイルの読み込み
    csv_data('./list.csv');

    function csv_data(dataPath) {
        const request = new XMLHttpRequest();
        request.addEventListener('load', (event) => {
            const response = event.target.responseText;
            var resArray = response.split("\n");
            
            //1行目を削除した配列を生成する
            for ( var i=1; i<resArray.length; i++ ) {
                masterdata.push(resArray[i]);
            }
            
            loadimage();
        });
        request.open('GET', dataPath, true);
        request.send();
    }
}

function loadimage() {
    var index = Math.round( Math.random()*masterdata.length);
    var mdata = masterdata[index];
    var data = mdata.split(",");
    var src = data[2];
    
    //画像表示
    var bg = document.getElementById("bg");
    bg.src = "./Album/" + src;
}

//時計機能
function initclock() {
    var time = new Date(); //  現在日時を得る
    var hour = time.getHours(); // 時を抜き出す
    var min  = time.getMinutes(); // 分を抜き出す
    if ( min == 0 ) {
        min = "00";
    } else if ( min < 10 ) {
        min = "0" + min;
    }
    
    var clock = document.getElementById("clock");
    clock.innerHTML = hour + ":" + min;
    
    delayedCall(1,function(){
        initclock();
    });
}