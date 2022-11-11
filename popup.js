// devtools.jsで保存したanswersを読み込み
answers = localStorage.getItem("answers");
// popup.htmlのElementを取得
let answersElem = document.getElementById('answers');
// 取得したElementにanswersを埋め込む
answersElem.innerHTML = answers;