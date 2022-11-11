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
          // popup.htmlのElementを取得
          let answersElem = document.getElementById('answers');
          // 取得したElementにanswersを埋め込む
          answersElem.innerHTML = answers;
          
          // popupでanswersを見るために，localStorageに保存
          localStorage.setItem("answers", answers);
          // デバッグ用
          chrome.devtools.inspectedWindow.eval(`console.log('answers: ${answers}');`);
          chrome.devtools.inspectedWindow.eval(`console.log('requestURL: ${requestURL}');`);
        }
      }
    );
  }
);
