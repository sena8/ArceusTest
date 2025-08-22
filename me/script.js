// ================================
// 1) アルセウスのデータ
// ================================
const arseusuData = [
  { type: "ノーマル", image: "arseusimage/Arseus-Normal.png" , image2: "arseusimage-s/Arseus-Normal-s.png" },
  { type: "ほのお", image: "arseusimage/Arseus-Fire.png" , image2: "arseusimage-s/Arseus-Fire-s.png" },
  { type: "みず", image: "arseusimage/Arseus-Water.png" , image2: "arseusimage-s/Arseus-Water-s.png" },
  { type: "でんき", image: "arseusimage/Arseus-Electric.png" , image2: "arseusimage-s/Arseus-Electric-s.png" },
  { type: "くさ", image: "arseusimage/Arseus-Grass.png" , image2: "arseusimage-s/Arseus-Grass-s.png" },
  { type: "こおり", image: "arseusimage/Arseus-Ice.png" , image2: "arseusimage-s/Arseus-Ice-s.png" },
  { type: "かくとう", image: "arseusimage/Arseus-Fighting.png" , image2: "arseusimage-s/Arseus-Fighting-s.png" },
  { type: "どく", image: "arseusimage/Arseus-Poison.png" , image2: "arseusimage-s/Arseus-Poison-s.png" },
  { type: "じめん", image: "arseusimage/Arseus-Ground.png" , image2: "arseusimage-s/Arseus-Ground-s.png" },
  { type: "ひこう", image: "arseusimage/Arseus-Flying.png" , image2: "arseusimage-s/Arseus-Flying-s.png" },
  { type: "エスパー", image: "arseusimage/Arseus-Phychic.png" , image2: "arseusimage-s/Arseus-Phychic-s.png" },
  { type: "むし", image: "arseusimage/Arseus-Bag.png" , image2: "arseusimage-s/Arseus-Bug-s.png" },
  { type: "いわ", image: "arseusimage/Arseus-Rock.png" , image2: "arseusimage-s/Arseus-Rock-s.png" },
  { type: "ゴースト", image: "arseusimage/Arseus-Ghost.png" , image2: "arseusimage-s/Arseus-Ghost-s.png" },
  { type: "ドラゴン", image: "arseusimage/Arseus-Dragon.png" , image2: "arseusimage-s/Arseus-Dragon-s.png" },
  { type: "あく", image: "arseusimage/Arseus-Dark.png" , image2: "arseusimage-s/Arseus-Dark-s.png" },
  { type: "はがね", image: "arseusimage/Arseus-Steel.png" , image2: "arseusimage-s/Arseus-Steel-s.png" },
  { type: "フェアリー", image: "arseusimage/Arseus-Fairy.png" , image2: "arseusimage-s/Arseus-Fairy-s.png" },
];

// ================================
// 2) DOM要素
// ================================
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

// ================================
// 3) 問題作成関数
// ================================
function createArseusQuiz() {
  const correctData = arseusuData[Math.floor(Math.random() * arseusuData.length)];
  const mode = Math.random() < 0.5 ? 0 : 1;

  // 選択肢作成
  const getChoices = (key, correct) => {
    const pool = arseusuData.map(d => d[key]).filter(v => v !== correct);
    const result = [];
    while (result.length < 3) {
      const pick = pool[Math.floor(Math.random() * pool.length)];
      if (!result.includes(pick)) result.push(pick);
    }
    return shuffle([correct, ...result]);
  };

  if (mode === 0) {
    if (Math.random() < 0.1) {
        return{
            type: "image-to-type",
            question: correctData.image2,
            options: getChoices("type", correctData.type),
            answer: correctData.type
        }
    }
    else
    {
        return {
            type: "image-to-type",
            question: correctData.image,
            options: getChoices("type", correctData.type),
            answer: correctData.type
        };
    }
  } else {
    return {
      type: "type-to-image",
      question: correctData.type,
      options: getChoices("image", correctData.image),
      answer: correctData.image
    };
  }
}

// ================================
// 4) シャッフル関数
// ================================
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// ================================
// 5) HTMLに反映する関数
// ================================
function renderQuiz(quiz) {
  questionEl.textContent = "";
  choicesEl.innerHTML = "";
  resultEl.textContent = "";

  if (quiz.type === "image-to-type") {
    questionEl.innerHTML = `<p>このアルセウスのタイプは？</p><img src="${quiz.question}" alt="アルセウス">`;
    quiz.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option;
      btn.onclick = () => checkAnswer(option, quiz.answer, quiz.type);
      choicesEl.appendChild(btn);
    });
  } else {
    questionEl.innerHTML = `<p>${quiz.question}タイプのアルセウスはどれ？</p>`;
    quiz.options.forEach(option => {
      const btn = document.createElement("button");
      btn.innerHTML = `<img src="${option}" alt="アルセウス">`;
      btn.onclick = () => checkAnswer(option, quiz.answer, quiz.type);
      choicesEl.appendChild(btn);
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
      // タイプ名を表示
      resultEl.textContent = "❌ 不正解...正解は " + correct;
    } else {
      // 画像を表示
      resultEl.innerHTML = `❌ 不正解...正解は <img src="${correct}" alt="アルセウス" width="80">`;
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

