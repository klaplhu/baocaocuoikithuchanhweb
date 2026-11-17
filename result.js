const storedResult = localStorage.getItem("latestQuizResult");
let evaluatedQuestions = [];
let detectedWeakSkills = [];

if (!storedResult) {
  window.location.href = "index.html";
} else {
  const { quiz, userSelections, timeSpent, tabSwitches, submittedAt } = JSON.parse(storedResult);
  const skillMap = {};
  let correctTotal = 0;

  evaluatedQuestions = quiz.questions.map((q, idx) => {
    const userAns = (userSelections[idx] || []).slice().sort();
    const correctAns = q.correct.slice().sort();
    const isCorrect = JSON.stringify(userAns) === JSON.stringify(correctAns);

    if (!skillMap[q.skill]) skillMap[q.skill] = { total: 0, correct: 0 };
    skillMap[q.skill].total++;

    if (isCorrect) {
      correctTotal++;
      skillMap[q.skill].correct++;
    }

    return { ...q, index: idx + 1, userAns, isCorrect };
  });

  const totalQ = quiz.questions.length;
  const accuracy = Math.round((correctTotal / totalQ) * 100);
  const score10 = ((correctTotal / totalQ) * 10).toFixed(1);
  const m = String(Math.floor(timeSpent / 60)).padStart(2, "0");
  const s = String(timeSpent % 60).padStart(2, "0");

  document.getElementById("res-title").textContent = `Kết quả: ${quiz.title}`;
  document.getElementById("res-meta").textContent = `Nộp bài lúc: ${submittedAt} • Giám sát rời tab: ${tabSwitches} lần`;
  document.getElementById("stat-score-10").textContent = `${score10} / 10`;
  document.getElementById("stat-correct-count").textContent = `${correctTotal} / ${totalQ}`;
  document.getElementById("stat-accuracy").textContent = `${accuracy}%`;
  document.getElementById("stat-time-spent").textContent = `${m}:${s}`;

  const statusBadge = document.getElementById("res-status-badge");
  if (accuracy >= 80) {
    statusBadge.textContent = "ĐẠT YÊU CẦU - NẮM VỮNG KIẾN THỨC";
    statusBadge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 mb-3";
  } else {
    statusBadge.textContent = "CHƯA ĐẠT - CẦN ÔN TẬP LẠI NGAY";
  }

  // Render cột Phân tích Kỹ năng
  document.getElementById("skills-analysis-list").innerHTML = Object.entries(skillMap).map(([skill, stat]) => {
    const pct = Math.round((stat.correct / stat.total) * 100);
    const isWeak = pct < 70;
    if (isWeak) detectedWeakSkills.push(skill);

    return `
      <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/60">
        <div class="flex items-center justify-between mb-2">
          <span class="font-bold text-sm text-slate-900">${skill}</span>
          <span class="text-xs font-bold px-2 py-0.5 rounded ${isWeak ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}">
            ${isWeak ? "Kỹ năng yếu" : "Thành thạo"}
          </span>
        </div>
        <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-1.5">
          <div class="h-full ${isWeak ? "bg-rose-500" : "bg-emerald-500"}" style="width: ${pct}%"></div>
        </div>
        <div class="flex justify-between text-xs text-slate-500">
          <span>Đúng ${stat.correct}/${stat.total} câu</span>
          <span>Độ thành thạo: ${pct}%</span>
        </div>
      </div>
    `;
  }).join("");

  renderReviewList("wrong");
}

function renderReviewList(mode) {
  const letters = ["A", "B", "C", "D"];
  const list = mode === "wrong" ? evaluatedQuestions.filter(q => !q.isCorrect) : evaluatedQuestions;

  document.getElementById("filter-wrong-btn").className = mode === "wrong"
    ? "px-3 py-1 rounded-md bg-white text-rose-600 shadow-sm"
    : "px-3 py-1 rounded-md text-slate-600";
  document.getElementById("filter-all-btn").className = mode === "all"
    ? "px-3 py-1 rounded-md bg-white text-indigo-600 shadow-sm"
    : "px-3 py-1 rounded-md text-slate-600";

  const container = document.getElementById("review-questions-container");
  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 font-semibold text-sm">
        Xuất sắc! Bạn không làm sai câu hỏi nào trong đề thi này.
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(q => {
    const userText = q.userAns.length > 0
      ? q.userAns.map(i => `${letters[i]}. ${escapeHTML(q.options[i])}`).join(", ")
      : "Chưa chọn đáp án (Bỏ trống)";
    const correctText = q.correct.map(i => `${letters[i]}. ${escapeHTML(q.options[i])}`).join(", ");

    return `
      <div class="p-5 rounded-xl border ${q.isCorrect ? "border-emerald-200 bg-emerald-50/20" : "border-rose-200 bg-rose-50/20"}">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold px-2.5 py-0.5 rounded ${q.isCorrect ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}">
              ${q.isCorrect ? "✓ Chính xác" : "✕ Làm sai"} • Câu ${q.index}
            </span>
            <span class="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700">Kỹ năng: ${q.skill}</span>
          </div>
          <span class="text-xs text-slate-400">Loại: ${q.type === "multiple" ? "Checkbox (Nhiều đáp án)" : "Radio (1 đáp án)"}</span>
        </div>

        <h4 class="font-bold text-slate-900 text-sm sm:text-base mb-3">${escapeHTML(q.question)}</h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
          <div class="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-900">
            <p class="font-bold uppercase text-[11px] text-rose-600 mb-1">ĐÁP ÁN CỦA BẠN:</p>
            <p class="font-semibold">${userText}</p>
          </div>
          <div class="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900">
            <p class="font-bold uppercase text-[11px] text-emerald-600 mb-1">ĐÁP ÁN ĐÚNG CHUẨN JSON:</p>
            <p class="font-semibold">${correctText}</p>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 leading-relaxed">
          <strong class="text-indigo-600"><i class="fa-solid fa-lightbulb mr-1"></i>Giải thích chi tiết:</strong> ${escapeHTML(q.explanation)}
        </div>
      </div>
    `;
  }).join("");
}

function generateAdaptiveQuiz() {
  const allQuestions = QUIZ_DATABASE.flatMap(q => q.questions);
  const weakQuestions = detectedWeakSkills.length > 0
    ? allQuestions.filter(q => detectedWeakSkills.includes(q.skill))
    : allQuestions;

  const customQuiz = {
    id: "adaptive-custom",
    title: "Đề Luyện tập Thích ứng: Bù đắp Kỹ năng Yếu",
    topic: "Ôn tập Thích ứng",
    difficulty: "Thích ứng",
    duration: weakQuestions.length * 60,
    questions: weakQuestions
  };

  localStorage.setItem("adaptiveCustomQuiz", JSON.stringify(customQuiz));
  localStorage.setItem("activeQuizId", "adaptive-custom");
  window.location.href = "quiz.html";
}
