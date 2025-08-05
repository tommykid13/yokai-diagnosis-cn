// 簡易測驗腳本
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('start-diagnosis');
  const quizModal = document.getElementById('quizModal');
  const resultModal = document.getElementById('resultModal');
  const closeQuizBtn = document.getElementById('closeModal');
  const closeResultBtn = document.getElementById('closeResult');
  const quizForm = document.getElementById('quizForm');
  const resultTitle = document.getElementById('resultTitle');
  const resultDesc = document.getElementById('resultDesc');

  // 顯示測驗框
  startBtn.addEventListener('click', () => {
    quizModal.classList.remove('hidden');
  });

  // 關閉測驗框
  closeQuizBtn.addEventListener('click', () => {
    quizModal.classList.add('hidden');
  });

  // 提交測驗
  quizForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(quizForm);
    const counts = {};
    for (const value of formData.values()) {
      counts[value] = (counts[value] || 0) + 1;
    }
    // 選擇票數最高的妖怪類型
    let topType = null;
    let maxCount = 0;
    for (const type in counts) {
      if (counts[type] > maxCount) {
        topType = type;
        maxCount = counts[type];
      }
    }
    // 映射說明
    const info = {
      kitsune: {
        title: '妖狐 (Kitsune)',
        desc:
          '您聰明伶俐，擅長觀察與思考，偶爾帶點狡黠。就像妖狐一樣，能夠善用智慧達成目標。',
      },
      oni: {
        title: '鬼 (Oni)',
        desc:
          '您充滿力量與熱情，重視正義感。雖然外表強悍，但內心其實柔軟。就像鬼一樣，是值得信賴的守護者。',
      },
      yuki: {
        title: '雪女 (Yuki-onna)',
        desc:
          '您性格內斂沉著，給人優雅高冷的感覺。像雪女般擁有冰雪般的氣質與神秘魅力。',
      },
      kappa: {
        title: '河童 (Kappa)',
        desc:
          '您天生好奇且充滿童心，喜歡嘗試新奇事物。就像河童般調皮可愛，是群體中的開心果。',
      },
    };
    const result = info[topType] || {
      title: '未知妖怪',
      desc: '您是獨一無二的存在，超越了傳統妖怪的分類！',
    };
    resultTitle.textContent = result.title;
    resultDesc.textContent = result.desc;
    quizModal.classList.add('hidden');
    resultModal.classList.remove('hidden');
  });

  // 關閉結果框
  closeResultBtn.addEventListener('click', () => {
    resultModal.classList.add('hidden');
    // 重置表單以便下次填寫
    quizForm.reset();
  });
});