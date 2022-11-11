// ネットワークリクエストが終了した時に発火するイベント
chrome.devtools.network.onRequestFinished.addListener(
  // Requestオブジェクト?をrequestに格納(中身はリクエストやレスポンスのヘッダーや内容?)
  (request) => {
    // レスポンスボディ?を取得するメソッド
    request.getContent(
      // 返ってくるJSONをcontentに格納
      (content) => {
        // リクエスト先のURL
        const requestURL = request.request.url;
        // JSONを見たいURL
        const pattern = "https://mobileknowledge.jp/api/pages/all?";
        // JSONを見たいURLから返ってきているなら
        if (requestURL.indexOf(pattern) == 0) {
          // contentsキーの要素を取り出し
          const contents = JSON.parse(content)["contents"];
          // 各問の答えを連結
          let answers = ""
          for (var i in contents) {
            answers += `Q${Number(i)+1}:A${JSON.stringify(contents[i]["correct_ans"])}<br>`;
          }
          // answersのElementを取得
          let answersElem = document.getElementById('answers');
          // 表示状態ならば更新
          if (!answersElem.classList.contains('hidden')) {
            answersElem.innerHTML = answers;
          }
          // localStorageに保存
          localStorage.setItem("answers", answers);
          // デバッグ用
          chrome.devtools.inspectedWindow.eval(`console.log('answers: ${answers}');`);
          chrome.devtools.inspectedWindow.eval(`console.log('requestURL: ${requestURL}');`);
        }
      }
    );
  }
);

// ボタンで表示非表示を切り替える
const answersElem = document.getElementById('answers');
const hidden_buttonElem = document.getElementById('change_hidden_button');
hidden_buttonElem.addEventListener('click', () => {
  // 表示ボタンを押したとき
  if (answersElem.classList.contains('hidden')) {
    hidden_buttonElem.textContent = "非表示";
    const answers = localStorage.getItem("answers")
    if (answers == "") {
      answersElem.innerHTML = "まだ読み込んでいません"
    }
    else {
      answersElem.innerHTML = localStorage.getItem("answers");
    }
    answersElem.classList.remove('hidden');
  }
  // 非表示ボタンを押したとき
  else {
    hidden_buttonElem.textContent = "表示";
    answersElem.innerText = "非表示です";
    answersElem.classList.add('hidden');
  }
});
