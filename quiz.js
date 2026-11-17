const currentQuiz = getActiveQuizData();
let currentQuestionIndex = 0;
let userSelections = {};
let remainingSeconds = currentQuiz.duration;
let timerInterval = null;
let tabSwitchCount = 0;

document.getElementById("quiz-topic-badge").textContent = currentQuiz.topic || "ĐỀ LUYỆN TẬP THÍCH ỨNG";
document.getElementById("quiz-active-title").textContent = currentQuiz.title;

// Giám sát chuyển tab chống gian lận
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    tabSwitchCount++;
    document.getElementById("tab-switch-count").textContent = tabSwitchCount;
  }
});

function renderCurrentQuestion() {
  const q = currentQuiz.questions[currentQuestionIndex];
  const total = currentQuiz.questions.length;
  const selected = userSelections[currentQuestionIndex] || [];
  const isMultiple = q.type === "multiple";

  document.getElementById("q-number-badge").textContent = `Câu ${currentQuestionIndex + 1} / ${total}`;
  document.getElementById("q-skill-badge").textContent = `Kỹ năng: ${q.skill}`;
  document.getElementById("q-type-badge").textContent = isMultiple
    ? "Chọn nhiều đáp án (Checkbox)"
    : "Chọn 1 đáp án đúng (Radio)";
  document.getElementById("question-text").textContent = q.question;

  // Cập nhật Progress Bar
  const answeredCount = Object.values(userSelections).filter(arr => arr && arr.length > 0).length;
  const percent = Math.round((answeredCount / total) * 100);
  document.getElementById("progress-label").textContent = `Đang ở: Câu ${currentQuestionIndex + 1} / ${total}`;
  document.getElementById("answered-count-label").textContent = `Đã trả lời: ${answeredCount}/${total} câu (${percent}%)`;
  document.getElementById("quiz-progress-bar").style.width = `${percent}%`;

  // Render các phương án
  const letters = ["A", "B", "C", "D"];
  document.getElementById("options-container").innerHTML = q.options.map((opt, idx) => {
    const isChecked = selected.includes(idx);
    const inputType = isMultiple ? "checkbox" : "radio";
    return `
      <label class="option-card flex items-center justify-between p-4 rounded-xl border border-slate-200 cursor-pointer ${isChecked ? "selected" : ""}">
        <div class="flex items-center gap-3.5">
          <input type="${inputType}" name="q-option" value="${idx}" ${isChecked ? "checked" : ""}
            onchange="handleSelectOption(${idx}, '${inputType}')"
            class="w-4 h-4 text-indigo-600 focus:ring-indigo-500">
          <span class="font-bold text-xs px-2 py-1 rounded bg-slate-100 text-slate-700">${letters[idx]}.</span>
          <span class="text-sm font-medium text-slate-800">${escapeHTML(opt)}</span>
        </div>
      </label>
    `;
  }).join("");

  document.getElementById("btn-prev").disabled = currentQuestionIndex === 0;
  renderPalette();
}

function handleSelectOption(optionIdx, inputType) {
  if (inputType === "radio") {
    userSelections[currentQuestionIndex] = [optionIdx];
  } else {
    const current = userSelections[currentQuestionIndex] || [];
    if (current.includes(optionIdx)) {
      userSelections[currentQuestionIndex] = current.filter(i => i !== optionIdx);
    } else {
      userSelections[currentQuestionIndex] = [...current, optionIdx].sort();
    }
  }
  renderCurrentQuestion();
}

function renderPalette() {
  const palette = document.getElementById("question-palette");
  palette.innerHTML = currentQuiz.questions.map((_, idx) => {
    const isAnswered = userSelections[idx] && userSelections[idx].length > 0;
    const isCurrent = idx === currentQuestionIndex;
    let btnClass = "bg-slate-50 text-slate-700 border-slate-200";
    if (isAnswered) btnClass = "bg-indigo-50 text-indigo-700 border-indigo-300 font-bold";
    if (isCurrent) btnClass += " ring-2 ring-indigo-600";

    return `
      <button onclick="jumpToQuestion(${idx})" class="h-10 rounded-lg border text-xs font-semibold transition ${btnClass}">
        ${idx + 1}
      </button>
    `;
  }).join("");
}

function jumpToQuestion(index) {
  currentQuestionIndex = index;
  renderCurrentQuestion();
}

function navigateQuestion(step) {
  const nextIndex = currentQuestionIndex + step;
  if (nextIndex >= 0 && nextIndex < currentQuiz.questions.length) {
    currentQuestionIndex = nextIndex;
    renderCurrentQuestion();
  } else if (nextIndex >= currentQuiz.questions.length) {
    submitQuizNow();
  }
}

function startCountdownTimer() {
  const display = document.getElementById("countdown-display");
  const timerBox = document.getElementById("timer-box");

  timerInterval = setInterval(() => {
    remainingSeconds--;
    const mins = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
    const secs = String(remainingSeconds % 60).padStart(2, "0");
    display.textContent = `${mins}:${secs}`;

    if (remainingSeconds <= 30) {
      timerBox.classList.add("bg-rose-600", "timer-warning");
      timerBox.classList.remove("bg-slate-900");
    }

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      submitQuizNow();
    }
  }, 1000);
}

function submitQuizNow() {
  clearInterval(timerInterval);
  const resultPayload = {
    quiz: currentQuiz,
    userSelections: userSelections,
    timeSpent: currentQuiz.duration - remainingSeconds,
    tabSwitches: tabSwitchCount,
    submittedAt: new Date().toLocaleString("vi-VN")
  };
  localStorage.setItem("latestQuizResult", JSON.stringify(resultPayload));
  window.location.href = "result.html";
}

renderCurrentQuestion();
startCountdownTimer();
