/**
 * THÀNH VIÊN 3: LOGIC TRANG LÀM BÀI (ĐẾM NGƯỢC, TIẾN ĐỘ, RADIO/CHECKBOX, CHỐNG GIAN LẬN)
 * File: quiz.js
 */

function startQuizById(quizId, notify = true) {
  const foundQuiz = QUIZZES_DATA.find(q => q.id === quizId);
  if (!foundQuiz) return;

  activeQuiz = JSON.parse(JSON.stringify(foundQuiz));
  initQuizSession(notify);
}

function startAdaptiveWeakSkillQuiz() {
  let targetSkills = Array.from(globalWeakSkills);
  let adaptiveQuestions = [];

  QUIZZES_DATA.forEach(quiz => {
    quiz.questions.forEach(q => {
      if (targetSkills.length > 0 && targetSkills.includes(q.skill)) {
        adaptiveQuestions.push(JSON.parse(JSON.stringify(q)));
      }
    });
  });

  if (adaptiveQuestions.length === 0) {
    QUIZZES_DATA.forEach(quiz => {
      adaptiveQuestions.push(...JSON.parse(JSON.stringify(quiz.questions.slice(0, 2))));
    });
  }

  activeQuiz = {
    id: "adaptive-custom-quiz",
    title: "Đề Luyện tập Thích ứng: Bù đắp Kỹ năng Yếu",
    topic: "Thích ứng cá nhân hóa",
    difficulty: "Thích ứng",
    durationMinutes: Math.max(4, adaptiveQuestions.length),
    description: "Đề thi được sinh tự động dựa trên phân tích lỗi sai của bạn.",
    questions: adaptiveQuestions
  };

  initQuizSession(true);
  showToast(`Đã sinh đề thích ứng gồm ${adaptiveQuestions.length} câu hỏi chuyên sâu!`, "success");
}

function initQuizSession(notify = true) {
  currentQuestionIndex = 0;
  userAnswers = {};
  flaggedQuestions = new Set();
  tabSwitchCount = 0;
  document.getElementById("tab-switch-count").textContent = "0";

  totalQuizSeconds = activeQuiz.durationMinutes * 60;
  remainingSeconds = totalQuizSeconds;

  document.getElementById("quiz-active-title").textContent = activeQuiz.title;
  document.getElementById("quiz-active-topic").textContent = activeQuiz.topic;
  document.getElementById("quiz-active-difficulty").textContent = `Độ khó: ${activeQuiz.difficulty}`;
  document.getElementById("active-quiz-indicator").classList.remove("hidden");

  startCountdownTimer();
  renderCurrentQuestion();
  renderQuestionPalette();

  switchView("quiz");
  if (notify) {
    showToast(`Bắt đầu: ${activeQuiz.title}`, "success");
  }
}

function startCountdownTimer() {
  clearInterval(timerInterval);
  const timerDisplay = document.getElementById("timer-display");
  const timerBox = document.getElementById("timer-box");

  timerDisplay.textContent = formatTime(remainingSeconds);
  timerBox.classList.remove("timer-warning", "border-rose-500", "bg-rose-950/90");

  timerInterval = setInterval(() => {
    remainingSeconds--;
    timerDisplay.textContent = formatTime(remainingSeconds);

    if (remainingSeconds <= 60) {
      timerBox.classList.add("timer-warning", "border-rose-500", "bg-rose-950/90");
    }

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      showToast("Đã hết thời gian làm bài! Hệ thống tự động chấm điểm.", "warning");
      if (typeof confirmSubmitQuiz === "function") {
        confirmSubmitQuiz();
      }
    }
  }, 1000);
}

function renderCurrentQuestion() {
  if (!activeQuiz) return;
  const questions = activeQuiz.questions;
  const q = questions[currentQuestionIndex];
  const selectedIndices = userAnswers[currentQuestionIndex] || [];
  const isMultiple = q.type === "multiple";

  const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k] && userAnswers[k].length > 0).length;
  const answeredPercent = Math.round((answeredCount / questions.length) * 100);
  const positionPercent = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);

  document.getElementById("progress-question-text").textContent = `Câu hỏi ${currentQuestionIndex + 1} / ${questions.length}`;
  document.getElementById("progress-answered-text").textContent = `Đã trả lời: ${answeredCount}/${questions.length} câu (${answeredPercent}%)`;
  document.getElementById("quiz-progress-bar").style.width = `${positionPercent}%`;

  const typeBadge = document.getElementById("question-type-badge");
  if (isMultiple) {
    typeBadge.className = "inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200";
    typeBadge.innerHTML = `<i class="fa-regular fa-square-check"></i> Chọn nhiều đáp án đúng (Checkbox)`;
    document.getElementById("question-hint").textContent = "Lưu ý: Câu hỏi này có nhiều hơn 1 phương án đúng. Hãy đánh dấu tất cả các ý đúng.";
  } else {
    typeBadge.className = "inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200";
    typeBadge.innerHTML = `<i class="fa-regular fa-circle-dot"></i> Chọn 1 đáp án đúng nhất (Radio)`;
    document.getElementById("question-hint").textContent = "Hãy chọn 1 phương án chính xác nhất.";
  }

  document.getElementById("question-skill-badge").innerHTML = `<i class="fa-solid fa-tag text-indigo-500"></i> Kỹ năng: <strong>${escapeHTML(q.skill)}</strong>`;

  const flagBtn = document.getElementById("btn-flag-question");
  if (flaggedQuestions.has(currentQuestionIndex)) {
    flagBtn.className = "inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-amber-400 bg-amber-100 text-amber-800 transition";
    flagBtn.innerHTML = `<i class="fa-solid fa-flag text-amber-600"></i> <span>Đã đánh dấu xem lại</span>`;
  } else {
    flagBtn.className = "inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition";
    flagBtn.innerHTML = `<i class="fa-regular fa-flag"></i> <span>Đánh dấu xem lại</span>`;
  }

  document.getElementById("question-text").textContent = `Câu ${currentQuestionIndex + 1}: ${q.question}`;

  const inputType = isMultiple ? "checkbox" : "radio";
  const letters = ["A", "B", "C", "D", "E", "F"];
  const optionsContainer = document.getElementById("options-container");

  optionsContainer.innerHTML = q.options.map((optText, optIdx) => {
    const isChecked = selectedIndices.includes(optIdx);
    return `
      <label
        class="option-card flex items-start gap-3.5 p-4 rounded-xl border-2 cursor-pointer select-none ${
          isChecked ? "selected border-indigo-600 bg-indigo-50/70" : "border-slate-200 bg-white"
        }"
      >
        <input
          type="${inputType}"
          name="quiz-option-${q.id}"
          value="${optIdx}"
          ${isChecked ? "checked" : ""}
          onchange="handleSelectOption(${optIdx}, '${inputType}')"
          class="mt-1 w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 ${isMultiple ? "rounded" : "rounded-full"}"
        />
        <div class="flex-1 text-sm sm:text-base font-medium text-slate-800 leading-relaxed">
          <span class="font-bold text-indigo-700 mr-1.5">${letters[optIdx]}.</span>
          <span>${escapeHTML(optText)}</span>
        </div>
      </label>
    `;
  }).join("");

  document.getElementById("btn-prev").disabled = currentQuestionIndex === 0;
  const nextBtn = document.getElementById("btn-next");
  if (currentQuestionIndex === questions.length - 1) {
    nextBtn.innerHTML = `<span>Kiểm tra & Nộp bài</span> <i class="fa-solid fa-check"></i>`;
    nextBtn.onclick = () => requestSubmitQuiz();
  } else {
    nextBtn.innerHTML = `<span>Câu tiếp theo</span> <i class="fa-solid fa-arrow-right"></i>`;
    nextBtn.onclick = () => navigateQuestion(1);
  }

  renderQuestionPalette();
}

function handleSelectOption(optionIndex, inputType) {
  if (inputType === "radio") {
    userAnswers[currentQuestionIndex] = [optionIndex];
  } else {
    let currentSelected = userAnswers[currentQuestionIndex] ? [...userAnswers[currentQuestionIndex]] : [];
    if (currentSelected.includes(optionIndex)) {
      currentSelected = currentSelected.filter(i => i !== optionIndex);
    } else {
      currentSelected.push(optionIndex);
    }
    currentSelected.sort((a, b) => a - b);
    if (currentSelected.length > 0) {
      userAnswers[currentQuestionIndex] = currentSelected;
    } else {
      delete userAnswers[currentQuestionIndex];
    }
  }
  renderCurrentQuestion();
}

function clearCurrentAnswer() {
  delete userAnswers[currentQuestionIndex];
  renderCurrentQuestion();
}

function toggleFlagCurrentQuestion() {
  if (flaggedQuestions.has(currentQuestionIndex)) {
    flaggedQuestions.delete(currentQuestionIndex);
  } else {
    flaggedQuestions.add(currentQuestionIndex);
  }
  renderCurrentQuestion();
}

function navigateQuestion(step) {
  if (!activeQuiz) return;
  const nextIdx = currentQuestionIndex + step;
  if (nextIdx >= 0 && nextIdx < activeQuiz.questions.length) {
    currentQuestionIndex = nextIdx;
    renderCurrentQuestion();
  }
}

function jumpToQuestion(index) {
  currentQuestionIndex = index;
  renderCurrentQuestion();
}

function renderQuestionPalette() {
  if (!activeQuiz) return;
  const questions = activeQuiz.questions;
  const answeredCount = Object.keys(userAnswers).filter(k => userAnswers[k] && userAnswers[k].length > 0).length;
  document.getElementById("palette-summary").textContent = `${answeredCount}/${questions.length} đã trả lời`;

  const palette = document.getElementById("question-palette");
  palette.innerHTML = questions.map((q, idx) => {
    const isCurrent = idx === currentQuestionIndex;
    const isAnswered = userAnswers[idx] && userAnswers[idx].length > 0;
    const isFlagged = flaggedQuestions.has(idx);

    let btnClass = "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200";
    if (isAnswered) {
      btnClass = "bg-indigo-600 text-white border border-indigo-600 shadow-sm";
    }
    if (isFlagged && !isAnswered) {
      btnClass = "bg-amber-100 text-amber-800 border border-amber-400";
    }
    if (isCurrent) {
      btnClass += " ring-2 ring-offset-2 ring-indigo-600 font-extrabold";
    }

    return `
      <button
        onclick="jumpToQuestion(${idx})"
        class="relative h-10 rounded-xl text-xs font-bold transition flex items-center justify-center ${btnClass}"
      >
        <span>${idx + 1}</span>
        ${
          isFlagged
            ? `<span class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-amber-500 border border-white"></span>`
            : ""
        }
      </button>
    `;
  }).join("");
}

function requestSubmitQuiz() {
  if (!activeQuiz) return;
  const total = activeQuiz.questions.length;
  const answered = Object.keys(userAnswers).filter(k => userAnswers[k] && userAnswers[k].length > 0).length;
  const unanswered = total - answered;

  const modal = document.getElementById("submit-modal");
  const body = document.getElementById("submit-modal-body");

  if (unanswered > 0) {
    body.innerHTML = `
      <p class="font-semibold text-amber-700"><i class="fa-solid fa-triangle-exclamation mr-1"></i>Bạn còn <strong>${unanswered} / ${total} câu hỏi</strong> chưa chọn đáp án!</p>
      <p class="text-slate-600">Các câu bỏ trống sẽ bị tính là câu trả lời sai (0 điểm). Bạn có chắc chắn muốn nộp bài ngay không?</p>
    `;
  } else {
    body.innerHTML = `
      <p class="font-semibold text-emerald-700"><i class="fa-solid fa-circle-check mr-1"></i>Tuyệt vời! Bạn đã trả lời đầy đủ <strong>${total}/${total} câu hỏi</strong>.</p>
      <p class="text-slate-600">Thời gian còn lại: <strong>${formatTime(remainingSeconds)}</strong>. Nhấn xác nhận để hệ thống chấm điểm và phân tích kỹ năng.</p>
    `;
  }

  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeSubmitModal() {
  const modal = document.getElementById("submit-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden && currentView === "quiz" && activeQuiz) {
    tabSwitchCount++;
    document.getElementById("tab-switch-count").textContent = String(tabSwitchCount);
    showToast(`Cảnh báo chống gian lận: Hệ thống ghi nhận bạn vừa rời tab làm bài (${tabSwitchCount} lần)!`, "warning");
  }
});
