(function () {
    'use strict';
    //HTMLから引っ張ってくる
    const userNameInput = document.getElementById('user-name');
    const assessmentButton = document.getElementById('assessment');
    const resultDivided = document.getElementById('result-area');
    const tweetDivided = document.getElementById('tweet-area');
 
/**
 * 指定した要素子を全て削除する　関数にして他のところも使いまわせれるようにする
 * @param {HTMLElement} element HTMLの要素
 *///              要素にしたいのでelement
    function removeAllChildren(element){
        while (element.firstChild) { // 子どもの要素があるかぎり削除していく
            element.removeChild(element.firstChild);
        }//　　　　　　　　　　　　　最初の子要素↑↑
    }
    //オブジェクト↘↘  プロパティ↘↘　　　↙↙function()の略 アロー関数=>
    assessmentButton.onclick=()=>{//クリックされたときに動く
            const userName= userNameInput.value;
 //↓↓●ガード句 特定の処理の際に、処理を終了させるような処理
            if(userName.length === 0){
                return;//←←←戻り値なしに、そこで処理を終了する
            }//名前の文字列の長さが 空0 だった場合は、処理を終了するという意味
 

        removeAllChildren(resultDivided);//子要素の削除関数呼び起こし
        
//３ 診断結果表示エリアの作成 HTMLじゃなくてもここでも作れる
        const header = document.createElement('h3');//h3のタグ作る
        header.innerText = '診断結果';
        resultDivided.appendChild(header);
   //divタグの中に↑↑　　　↑↑htmlの子要素として足すということ
 　　//Pタグなので↓↓
        const paragraph = document.createElement('p');
        const result = assessment(userName);
        paragraph.innerText = result;
        resultDivided.appendChild(paragraph);
//最後 ツイートエリアの作成
        removeAllChildren(tweetDivided);//Pタグの子要素削除
        const anchor = document.createElement('a');　　　                     //URIエンコードにかえる↓↓
        const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
            + encodeURIComponent('あなたのいいところ') //URIエンコードにかえる↓↓
            + '&ref_src=twsrc%5Etfw';
        anchor.setAttribute('href', hrefValue);
        anchor.className = 'twitter-hashtag-button';
        anchor.setAttribute('data-text', result);//診断結果が入っている変数resultに変える
        anchor.innerText = 'Tweet #あなたのいいところ';
        tweetDivided.appendChild(anchor);

        twttr.widgets.load();//HTMLにあるwidgets.jsを実行するためのコード
    };
//Enterキーを押されると上のassessmentButton.onclick呼び出される
    userNameInput.onkeydown = (event) => {
        if (event.key === 'Enter') {
            assessmentButton.onclick();
        }
    };

    const answers = [
        '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
        '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
        '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
        '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
        '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
        '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
        '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
        '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
        '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
        '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
        '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
        '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
        '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
        '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
        '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
        '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。 '
    ];// Ctrl+alt+↓で複数カーソル　Fn+Endで文末
    
    /**　string=文字列　param=引数名
     * 名前の文字列を渡すと診断結果を出す関数
     * @param {string} userName ユーザーの名前
     * @return {string} 診断結果
     *戻り値↑↑
     */

     //'A'.charCodeAt(0);は６５番目　Bなら６６番目 漢字も登録されている
    function assessment(userName){
        //全文字のコード番号を取得してそれを足し合わせる
        let sumOfcharCode=0;//←←コードの最初は０からなので
        for(let i=0; i<userName.length; i++){
            sumOfcharCode = sumOfcharCode + userName.charCodeAt(i);
        }//forで名前の文字すべての文字のコードを足し合わせている。
        //sumOfは合計という意味

        //文字のコード番号の合計を回答の数(今回は16個)で割って添字の数値を求める
        const index= sumOfcharCode % answers.length;
        //！！膨大の数字を小さい回答数のどれにあてはめるか→割って余り％を使う！！
//２
//result.replace() という関数の戻り値を再代入しているからlet
        let result= answers[index];
     //名前から計算した文字コードの合計値を、診断結果のパターンの数で割った余りを求め、それを利用して配列から診断結果を得る。      
        result = result.replace(/\{userName\}/g, userName);
　　　//置き換えるという関数↑↑　　　　　左を　全てに↑↑　右に置き換える
        return result;　　　　　//※正規表現 {userName} という文字列自身に合うものを複数回適用する
    }

    //テストコード　　　　　　　　　　　　　　　　　　　　ここが違うとエラー
    console.assert(                                    　//↓↓
        assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
        '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
    );
    //同じ名前なら、同じ診断結果を出力する処理が正しいかどうか
    console.assert(
        assessment('太郎') === assessment('太郎'),
        '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません。'
    );


})();
//var answers['バナナ','スイカ','みかん'];
//let index =59896 % answers.length;
//index
//1 
//answers[index];
//"スイカ"
//と同じことをしている

//無名関数→→名前を持たない関数の記述法　代入するだけの用途の関数のときに使われる
