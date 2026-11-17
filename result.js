/**
 * THÀNH VIÊN 4: CHẤM ĐIỂM TỰ ĐỘNG, PHÂN TÍCH KỸ NĂNG YẾU & MODAL XEM JSON
 * File: result.js
 */

function confirmSubmitQuiz() {
  closeSubmitModal();
  clearInterval(timerInterval);
  document.getElementById("active-quiz-indicator").classList.add("hidden");

  const questions = activeQuiz.questions;
  const timeSpentSeconds = totalQuizSeconds - remainingSeconds;

  let correctCount = 0;
  const skillStats = {};
  const detailedReview = [];

  questions.forEach((q, idx) => {
    const userSelected = (userAnswers[idx] || []).slice().sort((a, b) => a - b);
    const correctAnswers = q.correct.slice().sort((a, b) => a - b);

    const isCorrect =
      userSelected.length === correctAnswers.length &&
      userSelected.every((val, i) => val === correctAnswers[i]);

    if (isCorrect) {
      correctCount++;
    }

    if (!skillStats[q.skill]) {
      skillStats[q.skill] = { total: 0, correct: 0 };
    }
    skillStats[q.skill].total++;
    if (isCorrect) {
      skillStats[q.skill].correct++;
    } else {
      globalWeakSkills.add(q.skill);
    }

    detailedReview.push({
      index: idx + 1,
      questionObj: q,
      userSelected,
      correctAnswers,
      isCorrect
    });
  });

  Object.entries(skillStats).forEach(([skill, stat]) => {
    if (stat.correct === stat.total) {
      globalWeakSkills.delete(skill);
    }
  });

  const accuracy = Math.round((correctCount / questions.length) * 100);
  const score10 = ((correctCount / questions.length) * 10).toFixed(1);

  if (!quizHistory[activeQuiz.id] || parseFloat(score10) > parseFloat(quizHistory[activeQuiz.id].bestScore10)) {
    quizHistory[activeQuiz.id] = {
      bestScore10: score10,
      attempts: (quizHistory[activeQuiz.id]?.attempts || 0) + 1
    };
  }

  lastResult = {
    quizTitle: activeQuiz.title,
    totalQuestions: questions.length,
    correctCount,
    wrongCount: questions.length - correctCount,
    accuracy,
    score10,
    timeSpentSeconds,
    timestamp: new Date().toLocaleString("vi-VN"),
    skillStats,
    detailedReview
  };

  reviewFilterMode = lastResult.wrongCount > 0 ? "wrong" : "all";

  renderResultView();
  if (typeof updateDashboardStats === "function") updateDashboardStats();
  if (typeof renderQuizList === "function") renderQuizList();
  switchView("result");
  showToast(`Đã chấm điểm xong! Bạn đạt ${score10}/10 điểm.`, "success");
}

function renderResultView() {
  if (!lastResult) return;

  document.getElementById("result-quiz-title").textContent = `Kết quả: ${lastResult.quizTitle}`;
  document.getElementById("result-timestamp").textContent = `Nộp bài lúc: ${lastResult.timestamp} • Giám sát rời tab: ${tabSwitchCount} lần`;
  document.getElementById("result-score-10").textContent = `${lastResult.score10} / 10`;
  document.getElementById("result-correct-ratio").textContent = `${lastResult.correctCount} / ${lastResult.totalQuestions}`;
  document.getElementById("result-accuracy").textContent = `${lastResult.accuracy}%`;
  document.getElementById("result-time-spent").textContent = formatTime(lastResult.timeSpentSeconds);

  const badge = document.getElementById("result-badge-status");
  if (lastResult.accuracy >= 80) {
    badge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30";
    badge.innerHTML = `<i class="fa-solid fa-trophy"></i> XUẤT SẮC - NẮM VỮNG KIẾN THỨC`;
  } else if (lastResult.accuracy >= 50) {
    badge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30";
    badge.innerHTML = `<i class="fa-solid fa-circle-check"></i> ĐẠT YÊU CẦU - CẦN BÙ ĐẮP LỖ HỔNG`;
  } else {
    badge.className = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30";
    badge.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> CHƯA ĐẠT - CẦN ÔN TẬP LẠI NGAY`;
  }

  const skillsContainer = document.getElementById("skills-breakdown-container");
  const weakSkillsList = [];

  skillsContainer.innerHTML = Object.entries(lastResult.skillStats)
    .map(([skillName, stat]) => {
      const percent = Math.round((stat.correct / stat.total) * 100);
      let barColor = "bg-emerald-500";
      let statusLabel = `<span class="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">Vững vàng</span>`;

      if (percent < 50) {
        barColor = "bg-rose-500";
        statusLabel = `<span class="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-[11px] font-bold">Kỹ năng yếu</span>`;
        weakSkillsList.push(skillName);
      } else if (percent < 100) {
        barColor = "bg-amber-500";
        statusLabel = `<span class="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-bold">Cần củng cố</span>`;
        weakSkillsList.push(skillName);
      }

      return `
        <div class="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs sm:text-sm font-bold text-slate-800">${escapeHTML(skillName)}</span>
            ${statusLabel}
          </div>
          <div class="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div class="h-full ${barColor} rounded-full" style="width: ${percent}%"></div>
          </div>
          <div class="flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>Đúng ${stat.correct}/${stat.total} câu</span>
            <span>Độ thành thạo: <strong>${percent}%</strong></span>
          </div>
        </div>
      `;
    })
    .join("");

  const recBox = document.getElementById("weak-skills-recommendation");
  if (weakSkillsList.length === 0) {
    recBox.className = "rounded-xl p-4 bg-emerald-50 border border-emerald-200 space-y-2";
    recBox.innerHTML = `
      <div class="flex items-center gap-2 text-emerald-800 font-bold text-sm">
        <i class="fa-solid fa-medal text-base"></i>
        <span>Chúc mừng! Bạn không có kỹ năng nào bị hổng trong đề này.</span>
      </div>
      <p class="text-xs text-emerald-700 leading-relaxed">
        Bạn đã trả lời chính xác 100% các nhóm kỹ năng. Hãy thử sức với các bộ đề mức độ <strong>Khó</strong> hơn ở Trang Danh sách đề thi.
      </p>
    `;
  } else {
    recBox.className = "rounded-xl p-4 bg-amber-50 border border-amber-200 space-y-3";
    recBox.innerHTML = `
      <div class="flex items-center gap-2 text-amber-900 font-bold text-sm">
        <i class="fa-solid fa-lightbulb text-amber-600"></i>
        <span>Lộ trình bù đắp kiến thức (${weakSkillsList.length} kỹ năng cần ôn):</span>
      </div>
      <ul class="space-y-2 text-xs text-amber-900">
        ${weakSkillsList
          .map(
            skill => `
          <li class="p-2.5 rounded-lg bg-white/80 border border-amber-200/80 leading-relaxed">
            <strong class="text-indigo-700 block mb-0.5">• ${escapeHTML(skill)}:</strong>
            <span>${escapeHTML(SKILL_RECOMMENDATIONS[skill] || "Ôn tập lại lý thuyết và làm lại các câu hỏi thuộc chủ đề này.")}</span>
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  document.getElementById("count-wrong-tab").textContent = lastResult.wrongCount;
  document.getElementById("count-all-tab").textContent = lastResult.totalQuestions;

  renderReviewQuestionsList();
}

function setReviewFilter(mode) {
  reviewFilterMode = mode;
  renderReviewQuestionsList();
}

function renderReviewQuestionsList() {
  if (!lastResult) return;

  const btnWrong = document.getElementById("btn-filter-wrong");
  const btnAll = document.getElementById("btn-filter-all");

  if (reviewFilterMode === "wrong") {
    btnWrong.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-rose-600 shadow-sm transition";
    btnAll.className = "px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition";
  } else {
    btnAll.className = "px-3 py-1.5 rounded-lg text-xs font-bold bg-white text-indigo-600 shadow-sm transition";
    btnWrong.className = "px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:text-slate-900 transition";
  }

  const items =
    reviewFilterMode === "wrong"
      ? lastResult.detailedReview.filter(item => !item.isCorrect)
      : lastResult.detailedReview;

  const container = document.getElementById("review-questions-container");

  if (items.length === 0) {
    container.innerHTML = `
      <div class="p-8 text-center bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
        <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl">
          <i class="fa-solid fa-check-double"></i>
        </div>
        <h4 class="text-base font-bold text-emerald-900">Tuyệt vời! Bạn không làm sai câu nào.</h4>
        <p class="text-xs text-emerald-700">Bấm sang tab "Tất cả câu" nếu bạn muốn xem lại lời giải thích chi tiết của toàn bộ đề thi.</p>
      </div>
    `;
    return;
  }

  const letters = ["A", "B", "C", "D", "E", "F"];

  container.innerHTML = items
    .map(item => {
      const q = item.questionObj;
      const userText =
        item.userSelected.length > 0
          ? item.userSelected.map(i => `${letters[i]}. ${escapeHTML(q.options[i])}`).join(" | ")
          : "Chưa chọn đáp án (Bỏ trống)";

      const correctText = item.correctAnswers
        .map(i => `${letters[i]}. ${escapeHTML(q.options[i])}`)
        .join(" | ");

      return `
        <div class="rounded-2xl border ${
          item.isCorrect ? "border-emerald-200 bg-emerald-50/20" : "border-rose-200 bg-rose-50/20"
        } p-4 sm:p-5 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-md text-xs font-bold ${
                item.isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
              }">
                ${item.isCorrect ? '<i class="fa-solid fa-check mr-1"></i>Đúng' : '<i class="fa-solid fa-xmark mr-1"></i>Làm sai'} • Câu ${item.index}
              </span>
              <span class="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                Kỹ năng: ${escapeHTML(q.skill)}
              </span>
            </div>
            <span class="text-[11px] font-medium text-slate-400">
              Loại: ${q.type === "multiple" ? "Checkbox (Nhiều đáp án)" : "Radio (1 đáp án)"}
            </span>
          </div>

          <h4 class="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
            ${escapeHTML(q.question)}
          </h4>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div class="p-3 rounded-xl border ${
              item.isCorrect
                ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                : "bg-rose-50 border-rose-200 text-rose-900"
            }">
              <p class="font-bold uppercase tracking-wider text-[10px] opacity-75 mb-1">Đáp án của bạn:</p>
              <p class="font-semibold">${userText}</p>
            </div>

            <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <p class="font-bold uppercase tracking-wider text-[10px] text-emerald-700 mb-1">Đáp án đúng chuẩn JSON:</p>
              <p class="font-semibold">${correctText}</p>
            </div>
          </div>

          <div class="p-3.5 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <span class="font-bold text-indigo-700"><i class="fa-solid fa-book-open mr-1.5"></i>Giải thích chi tiết: </span>
            <span>${escapeHTML(q.explanation)}</span>
          </div>
        </div>
      `;
    })
    .join("");
}

function retryCurrentQuiz() {
  if (!activeQuiz) return;
  initQuizSession(true);
}

// ==================== MODAL XEM & SAO CHÉP DỮ LIỆU JSON ====================
function openJsonModal() {
  const modal = document.getElementById("json-modal");
  const pre = document.getElementById("json-viewer-content");
  pre.textContent = JSON.stringify(QUIZZES_DATA, null, 2);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeJsonModal() {
  const modal = document.getElementById("json-modal");
  modal.classList.add("hidden");
  modal.classList.remove("flex");
}

function copyJsonData() {
  const jsonText = JSON.stringify(QUIZZES_DATA, null, 2);
  const textarea = document.createElement("textarea");
  textarea.value = jsonText;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);

  const btnText = document.getElementById("copy-json-btn-text");
  btnText.textContent = "Đã sao chép!";
  showToast("Đã sao chép toàn bộ dữ liệu questions.json vào Clipboard!", "success");
  setTimeout(() => {
    btnText.textContent = "Sao chép JSON";
  }, 2000);
}
