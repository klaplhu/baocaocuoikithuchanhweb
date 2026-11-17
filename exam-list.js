const listContainer = document.getElementById("quiz-list-container");
const searchInput = document.getElementById("search-input");
const topicSelect = document.getElementById("topic-select");
const difficultySelect = document.getElementById("difficulty-select");

function getBadgeStyle(difficulty) {
  if (difficulty === "Dễ") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (difficulty === "Trung bình") return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-rose-50 text-rose-700 border-rose-200";
}

function renderQuizCards() {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectedTopic = topicSelect.value;
  const selectedDifficulty = difficultySelect.value;

  const filtered = QUIZ_DATABASE.filter(quiz => {
    const matchTopic = selectedTopic === "ALL" || quiz.topic === selectedTopic;
    const matchDifficulty = selectedDifficulty === "ALL" || quiz.difficulty === selectedDifficulty;
    const matchKeyword =
      quiz.title.toLowerCase().includes(keyword) ||
      quiz.description.toLowerCase().includes(keyword) ||
      quiz.skills.some(s => s.toLowerCase().includes(keyword));
    return matchTopic && matchDifficulty && matchKeyword;
  });

  if (filtered.length === 0) {
    listContainer.innerHTML = `
      <div class="col-span-full bg-white rounded-2xl p-10 text-center border border-slate-200">
        <p class="text-slate-600 font-semibold">Không tìm thấy đề thi nào khớp với bộ lọc hiện tại.</p>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = filtered.map(quiz => {
    const mins = Math.floor(quiz.duration / 60);
    const multiCount = quiz.questions.filter(q => q.type === "multiple").length;

    return `
      <div class="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition p-6 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <span class="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700">${quiz.topic}</span>
            <span class="text-xs font-bold px-2.5 py-1 rounded-lg border ${getBadgeStyle(quiz.difficulty)}">${quiz.difficulty}</span>
          </div>
          <h3 class="text-lg font-extrabold text-slate-900 mb-2">${quiz.title}</h3>
          <p class="text-xs text-slate-500 leading-relaxed mb-4">${quiz.description}</p>
          <div class="flex flex-wrap gap-1.5 mb-5">
            ${quiz.skills.map(skill => `
              <span class="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                <i class="fa-solid fa-tag text-slate-400 mr-1"></i>${skill}
              </span>
            `).join("")}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-100">
          <div class="flex items-center justify-between text-xs text-slate-500 font-medium mb-4">
            <span><i class="fa-regular fa-circle-question mr-1 text-indigo-500"></i>${quiz.questions.length} câu (${multiCount} Checkbox)</span>
            <span><i class="fa-regular fa-clock mr-1 text-indigo-500"></i>${mins} phút</span>
          </div>
          <button onclick="selectAndStartQuiz('${quiz.id}')"
            class="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition flex items-center justify-center gap-2">
            <span>Bắt đầu làm bài</span>
            <i class="fa-solid fa-arrow-right text-xs"></i>
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function selectAndStartQuiz(quizId) {
  localStorage.setItem("activeQuizId", quizId);
  window.location.href = "quiz.html";
}

searchInput.addEventListener("input", renderQuizCards);
topicSelect.addEventListener("change", renderQuizCards);
difficultySelect.addEventListener("change", renderQuizCards);

renderQuizCards();
