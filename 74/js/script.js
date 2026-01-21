let payments = [];

let savedData = localStorage.getItem("payments");
if (savedData !== null) {
  payments = JSON.parse(savedData);
}

// 支出・入金を保存
function savePayment() {

  // 入力された値を取得
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;
  let type = document.getElementById("type").value;

  // 入力チェック
  if (amount === "" || category === "" || type === "") {
    alert("すべて入力してください");
    return;
  }

  // データを入れる箱を作る
  let payment = {};

  // 1つずつ入れる
  payment.amount = Number(amount);
  payment.category = category;
  payment.type = type;
  payment.dateTime = new Date().toLocaleString("ja-JP");

  // 新しいデータを追加
  payments.push(payment);

  // 保存する
  localStorage.setItem("payments", JSON.stringify(payments));

  // 入力欄を空にする
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
  document.getElementById("type").value = "";

  // 画面更新
  displayPayments();
}


// カテゴリー切り替え
function changeCategory() {
  let type = document.getElementById("type").value;
  let category = document.getElementById("category");

  category.innerHTML = '<option value="">選択してください</option>';

  let expenseCategories = [
    "食費", "日用品", "交通費", "交際費", "娯楽", "医療費", "その他"
  ];

  let incomeCategories = [
    "給与", "お小遣い", "返金", "臨時収入", "その他"
  ];

  let categories = [];

  if (type === "expense") {
    categories = expenseCategories;
  }

  if (type === "income") {
    categories = incomeCategories;
  }

  categories.forEach(function(c) {
    let option = document.createElement("option");
    option.value = c;
    option.textContent = c;
    category.appendChild(option);
  });
}

// 履歴表示（日時あり）
function displayPayments() {
  let list = document.getElementById("historyList");
  list.innerHTML = "";

  for (let i = 0; i < payments.length; i++) {
    let p = payments[i];
    let li = document.createElement("li");

    li.innerHTML =
      "<div>" +
        "<span>" + p.category + "：" + p.amount + "円</span><br>" +
        "<small>" + p.dateTime + "</small>" +
      "</div>" +
      "<button class='delete-btn' onclick='deletePayment(" + i + ")'>削除</button>";

    list.appendChild(li);
  }

  document.getElementById("count").textContent =
    "件数：" + payments.length + "件";
}


// 削除処理
function deletePayment(index) {

  payments.splice(index, 1);

  localStorage.setItem("payments", JSON.stringify(payments));

  displayPayments();
}

// 初期表示
window.onload = function() {
  displayPayments();
};


