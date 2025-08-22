// ================================
// 1) アルセウスのデータ
// ================================
const arseusuData = [
  { type: "ノーマル", image: "arseusimage/Arseus-Normal.png" },
  { type: "ほのお", image: "arseusimage/Arseus-Fire.png" },
  { type: "みず", image: "arseusimage/Arseus-Water.png" },
  { type: "でんき", image: "arseusimage/Arseus-Electric.png" },
  { type: "くさ", image: "arseusimage/Arseus-Grass.png" },
  { type: "こおり", image: "arseusimage/Arseus-Ice.png" },
  { type: "かくとう", image: "arseusimage/Arseus-Fighting.png" },
  { type: "どく", image: "arseusimage/Arseus-Poison.png" },
  { type: "じめん", image: "arseusimage/Arseus-Ground.png" },
  { type: "ひこう", image: "arseusimage/Arseus-Flying.png" },
  { type: "エスパー", image: "arseusimage/Arseus-Psychic.png" },
  { type: "むし", image: "arseusimage/Arseus-Bug.png" },
  { type: "いわ", image: "arseusimage/Arseus-Rock.png" },
  { type: "ゴースト", image: "arseusimage/Arseus-Ghost.png" },
  { type: "ドラゴン", image: "arseusimage/Arseus-Dragon.png" },
  { type: "あく", image: "arseusimage/Arseus-Dark.png" },
  { type: "はがね", image: "arseusimage/Arseus-Steel.png" },
  { type: "フェアリー", image: "arseusimage/Arseus-Fairy.png" }
];

// 見た目が似ているグループ
const group = [
  [0, 12, 3],          // ノーマル・岩・電気
  [2, 9, 5],           // 水・飛行・氷
  [7, 10, 13, 14, 17], // 毒・エスパー・ゴースト・ドラゴン・フェアリー
  [1, 6, 8],           // 炎・格闘・地面
  [4, 11]              // 草・虫
];

// ================================
// 2) DOM要素
// ================================
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

// ================================
// 3) ランダムでアルセウスを選ぶ関数
// ================================
function getRandomArseusIndex() {
  if (Math.random() < 0.3) { // 30%の確率でグループから選ぶ
    const selectedGroup = group[Math.floor(Math.random() * group.length)];
    return selectedGroup[Math.floor(Math.random() * selectedGroup.length)];
  } else {
    return Math.floor(Math.random() * arseusuData.length);
  }
}

// ================================
// 4) 問題作成関数
// ================================
function createArseusQuiz() {
  const correctIndex = getRandomArseusIndex();
  const correctData = arseusuData[correctIndex];

  const options = [correctData];
  while (options.length < 4) {
    const candidate = arseusuData[getRandomArseusIndex()];
    if (!options.includes(candidate)) options.push(candidate);
  }

  // シャッフル
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  // 問題形式をランダムに選ぶ
  if (Math.random() < 0.5) {
    return {
      type: "type-to-image",
      question: correctData.type,
      options: options.map(o => o.image),
      answer: correctData.image
    };
  } else {
    return {
      type: "image-to-type",
      question: correctData.image,
      options: options.map(o => o.type),
      answer: correctData.type
    };
  }
}

// ================================
// 5) 問題をHTMLに反映
// ================================
function renderQuiz(quiz) {
  questionEl.innerHTML = "";
  choicesEl.innerHTML = "";
  resultEl.textContent = "";

  if (quiz.type === "image-to-type") {
    questionEl.innerHTML = `<img src="${quiz.question}" class="quiz-image"> のタイプは？`;
    quiz.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.onclick = () => checkAnswer(opt, quiz.answer, quiz.type);
      choicesEl.appendChild(btn);
    });
  } else {
    questionEl.textContent = `「${quiz.question}」タイプのアルセウスはどれ？`;
    quiz.options.forEach(opt => {
      const img = document.createElement("img");
      img.src = opt;
      img.className = "option";
      img.onclick = () => checkAnswer(opt, quiz.answer, quiz.type);
      choicesEl.appendChild(img);
    });
  }
}

// ================================
// 6) 答え合わせ
// ================================
function checkAnswer(choice, correct, quizType) {
  if (choice === correct) {
    resultEl.textContent = "✅ 正解！";
  } else {
    if (quizType === "image-to-type") {
      resultEl.textContent = "❌ 不正解...正解は " + correct;
    } else {
      resultEl.innerHTML = `❌ 不正解...正解は <img src="${correct}" width="80">`;
    }
  }
}

// ================================
// 7) 次の問題ボタン
// ================================
nextBtn.onclick = () => renderQuiz(createArseusQuiz());

// ================================
// 8) 最初の1問を表示
// ================================
renderQuiz(createArseusQuiz());
