/**
 * THÀNH VIÊN 1: DỮ LIỆU NGÂN HÀNG CÂU HỎI JSON & HÀM TIỆN ÍCH DÙNG CHUNG
 * File: data.js
 */

const QUIZZES_DATA = [
  {
    id: "quiz-html-css",
    title: "Kiến thức Nền tảng HTML5 & CSS3 Layout",
    topic: "HTML5 & CSS3",
    difficulty: "Dễ",
    durationMinutes: 5,
    description: "Đánh giá kỹ năng sử dụng thẻ ngữ nghĩa HTML5, CSS Box Model và bố cục Flexbox/Grid hiện đại.",
    questions: [
      {
        id: 101,
        type: "single",
        skill: "HTML5 Semantics",
        question: "Thẻ HTML5 ngữ nghĩa (Semantic) nào phù hợp nhất để chứa phần điều hướng chính (menu liên kết) của trang web?",
        options: [
          "<section>",
          "<nav>",
          "<aside>",
          "<article>"
        ],
        correct: [1],
        explanation: "Thẻ <nav> (Navigation) được thiết kế chuyên biệt trong HTML5 để định nghĩa khu vực chứa các liên kết điều hướng chính của website, giúp công cụ tìm kiếm (SEO) và trình đọc màn hình nhận diện dễ dàng."
      },
      {
        id: 102,
        type: "single",
        skill: "Flexbox & Grid",
        question: "Trong CSS Flexbox, thuộc tính nào dùng để căn chỉnh các phần tử con dọc theo trục chính (Main Axis)?",
        options: [
          "align-items",
          "justify-content",
          "align-content",
          "flex-wrap"
        ],
        correct: [1],
        explanation: "Thuộc tính 'justify-content' điều khiển việc phân bổ khoảng trống và căn chỉnh các flex items dọc theo trục chính (main axis), trong khi 'align-items' căn chỉnh theo trục vuông góc (cross axis)."
      },
      {
        id: 103,
        type: "multiple",
        skill: "HTML5 Semantics",
        question: "Những thuộc tính nào sau đây hỗ trợ kiểm tra hợp lệ dữ liệu (Form Validation) trực tiếp bằng HTML5 mà chưa cần dùng JavaScript? (Chọn nhiều đáp án)",
        options: [
          "required",
          "pattern",
          "minlength / maxlength",
          "onclick"
        ],
        correct: [0, 1, 2],
        explanation: "Các thuộc tính 'required' (bắt buộc nhập), 'pattern' (kiểm tra biểu thức chính quy Regex) và 'minlength/maxlength' đều là thuộc tính xác thực dữ liệu tích hợp sẵn của HTML5. 'onclick' là sự kiện JavaScript."
      },
      {
        id: 104,
        type: "single",
        skill: "CSS Box Model",
        question: "Khi khai báo thuộc tính 'box-sizing: border-box;' cho một phần tử có width: 300px, padding: 20px và border: 5px solid, chiều rộng thực tế hiển thị của phần tử đó là bao nhiêu?",
        options: [
          "350px",
          "325px",
          "300px",
          "250px"
        ],
        correct: [2],
        explanation: "Với 'box-sizing: border-box', kích thước width (300px) đã bao gồm cả phần content, padding (20px*2) và border (5px*2). Do đó tổng chiều rộng phần tử chiếm chỗ trên màn hình vẫn đúng bằng 300px."
      },
      {
        id: 105,
        type: "multiple",
        skill: "Flexbox & Grid",
        question: "Để tạo một bố cục lưới gồm 3 cột bằng nhau trong CSS Grid, những khai báo nào sau đây là hợp lệ? (Chọn nhiều đáp án)",
        options: [
          "grid-template-columns: repeat(3, 1fr);",
          "grid-template-columns: 1fr 1fr 1fr;",
          "grid-template-columns: 33.33% 33.33% 33.33%;",
          "flex-direction: column-3;"
        ],
        correct: [0, 1, 2],
        explanation: "Cả 3 cách đầu tiên đều tạo ra 3 cột có độ rộng tương đương trong CSS Grid. 'flex-direction: column-3' là cú pháp không tồn tại trong CSS."
      },
      {
        id: 106,
        type: "single",
        skill: "CSS Selectors",
        question: "Bộ chọn (Selector) CSS nào có độ ưu tiên (Specificity) cao nhất trong các phương án dưới đây?",
        options: [
          ".nav-menu .item a",
          "#main-header",
          "header nav ul li a",
          "div[data-active='true']"
        ],
        correct: [1],
        explanation: "Bộ chọn ID (#main-header) có trọng số độ ưu tiên là (0, 1, 0, 0), cao hơn mọi tổ hợp chỉ gồm các Class selector (0, 0, n, 0) hoặc Tag selector (0, 0, 0, n)."
      }
    ]
  },
  {
    id: "quiz-js-dom",
    title: "Lập trình JavaScript, DOM & Xử lý JSON",
    topic: "JavaScript",
    difficulty: "Trung bình",
    durationMinutes: 6,
    description: "Kiểm tra kỹ năng thao tác DOM, lắng nghe sự kiện (Event Handling), xử lý mảng và chuyển đổi dữ liệu JSON.",
    questions: [
      {
        id: 201,
        type: "single",
        skill: "JSON & Data",
        question: "Phương thức nào dùng để chuyển đổi một chuỗi JSON (JSON string) nhận từ máy chủ thành đối tượng JavaScript (Object) để sử dụng?",
        options: [
          "JSON.stringify()",
          "JSON.parse()",
          "JSON.toObject()",
          "Object.fromJSON()"
        ],
        correct: [1],
        explanation: "JSON.parse() dùng để phân tích cú pháp một chuỗi JSON thành đối tượng hoặc mảng JavaScript. Ngược lại, JSON.stringify() chuyển đối tượng JS thành chuỗi JSON."
      },
      {
        id: 202,
        type: "multiple",
        skill: "DOM Manipulation",
        question: "Những phương thức nào sau đây dùng để truy vấn phần tử DOM trong JavaScript? (Chọn nhiều đáp án)",
        options: [
          "document.getElementById()",
          "document.querySelector()",
          "document.querySelectorAll()",
          "document.parseElement()"
        ],
        correct: [0, 1, 2],
        explanation: "getElementById, querySelector và querySelectorAll là các API chuẩn của DOM để tìm kiếm phần tử HTML. 'document.parseElement()' không tồn tại."
      },
      {
        id: 203,
        type: "single",
        skill: "ES6 & Array Methods",
        question: "Để lọc ra danh sách các đề thi có độ khó 'Khó' từ mảng quizzes mà KHÔNG làm thay đổi mảng gốc, ta dùng phương thức nào?",
        options: [
          "quizzes.filter(q => q.difficulty === 'Khó')",
          "quizzes.forEach(q => q.difficulty === 'Khó')",
          "quizzes.splice(0, 1)",
          "quizzes.map(q => q.difficulty === 'Khó')"
        ],
        correct: [0],
        explanation: "Array.prototype.filter() tạo ra một mảng mới chứa tất cả các phần tử thỏa mãn điều kiện trong hàm callback mà không làm biến đổi mảng ban đầu."
      },
      {
        id: 204,
        type: "multiple",
        skill: "DOM Events",
        question: "Khi xử lý sự kiện gửi biểu mẫu (Form Submit) bằng JavaScript, những phát biểu nào sau đây là ĐÚNG? (Chọn nhiều đáp án)",
        options: [
          "Gọi event.preventDefault() giúp ngăn trình duyệt tải lại trang mặc định.",
          "Có thể gắn sự kiện qua formElement.addEventListener('submit', callback).",
          "Sự kiện submit chỉ kích hoạt được trên thẻ <div class='form'>.",
          "Có thể lấy giá trị ô nhập liệu qua thuộc tính inputElement.value."
        ],
        correct: [0, 1, 3],
        explanation: "Sự kiện 'submit' chỉ kích hoạt trên phần tử <form>, không kích hoạt trên thẻ <div>. Sử dụng event.preventDefault() là kỹ thuật cốt lõi trong Single Page App để chấm điểm mà không tải lại trang."
      },
      {
        id: 205,
        type: "single",
        skill: "Web Storage & Timer",
        question: "Để tạo đồng hồ đếm ngược chạy lặp lại sau mỗi 1 giây (1000ms) và dừng lại khi hết giờ, cặp hàm nào được sử dụng?",
        options: [
          "setTimeout() và clearTimeout()",
          "setInterval() và clearInterval()",
          "requestAnimationFrame() và stopAnimation()",
          "localStorage.setItem() và localStorage.removeItem()"
        ],
        correct: [1],
        explanation: "setInterval(fn, 1000) thực thi hàm lặp lại sau mỗi 1000ms (1 giây) và trả về một ID. Khi thời gian về 0 hoặc nộp bài, ta gọi clearInterval(id) để dừng bộ đếm."
      },
      {
        id: 206,
        type: "single",
        skill: "Web Storage & Timer",
        question: "Dữ liệu được lưu vào 'localStorage' trong trình duyệt có đặc điểm gì?",
        options: [
          "Tự động bị xóa ngay khi đóng tab trình duyệt.",
          "Tồn tại bền vững ngay cả khi đóng và mở lại trình duyệt cho đến khi được xóa chủ động.",
          "Tự động gửi kèm trong mọi HTTP Header lên máy chủ.",
          "Có dung lượng lưu trữ tối đa chỉ 4KB."
        ],
        correct: [1],
        explanation: "localStorage lưu trữ dữ liệu không giới hạn thời gian (khoảng 5MB) trên trình duyệt của người dùng, rất thích hợp để lưu lịch sử làm bài và điểm số giữa các trang."
      }
    ]
  },
  {
    id: "quiz-responsive-ui",
    title: "Thiết kế Web Đáp ứng (Responsive) & UI/UX",
    topic: "Responsive & UI/UX",
    difficulty: "Trung bình",
    durationMinutes: 5,
    description: "Kiểm tra kiến thức về Media Queries, Mobile-first, đơn vị tương đối (rem, vw, %) và khả năng tiếp cận (Accessibility).",
    questions: [
      {
        id: 301,
        type: "single",
        skill: "Responsive Design",
        question: "Thẻ <meta> nào bắt buộc phải có trong phần <head> để giao diện đáp ứng (Responsive) hoạt động đúng tỷ lệ trên thiết bị di động?",
        options: [
          "<meta charset='UTF-8'>",
          "<meta name='viewport' content='width=device-width, initial-scale=1.0'>",
          "<meta http-equiv='responsive' content='true'>",
          "<meta name='mobile-web-app-capable' content='yes'>"
        ],
        correct: [1],
        explanation: "Thẻ meta viewport với 'width=device-width, initial-scale=1.0' báo cho trình duyệt di động khớp chiều rộng trang với chiều rộng màn hình thiết bị thay vì thu nhỏ trang desktop."
      },
      {
        id: 302,
        type: "multiple",
        skill: "Responsive Design",
        question: "Theo triết lý thiết kế 'Mobile-First', những nguyên tắc nào sau đây được áp dụng? (Chọn nhiều đáp án)",
        options: [
          "Viết CSS mặc định dành cho màn hình nhỏ (điện thoại) trước.",
          "Sử dụng truy vấn @media (min-width: ...) để mở rộng bố cục cho màn hình lớn hơn (Tablet, Desktop).",
          "Ưu tiên tải các thành phần nội dung cốt lõi và tối ưu hiệu năng cho thiết bị di động.",
          "Luôn cố định chiều rộng phần tử bằng đơn vị pixel (ví dụ: width: 1200px)."
        ],
        correct: [0, 1, 2],
        explanation: "Mobile-First bắt đầu từ thiết bị màn hình nhỏ rồi nâng cấp dần bằng @media (min-width: ...). Việc dùng kích thước pixel cố định lớn (1200px) sẽ gây tràn ngang trên điện thoại."
      },
      {
        id: 303,
        type: "single",
        skill: "CSS Units & Typography",
        question: "Đơn vị kích thước 'rem' trong CSS được tính dựa trên giá trị font-size của phần tử nào?",
        options: [
          "Phần tử cha trực tiếp của nó",
          "Phần tử gốc <html> (Root element)",
          "Phần tử <body>",
          "Chiều rộng của màn hình (Viewport width)"
        ],
        correct: [1],
        explanation: "'rem' (Root EM) luôn tỷ lệ theo kích thước chữ (font-size) của phần tử gốc <html> (mặc định thường là 16px, nên 1rem = 16px), giúp đồng bộ tỷ lệ chữ và khoảng cách trên toàn trang."
      },
      {
        id: 304,
        type: "multiple",
        skill: "Web Accessibility (UI/UX)",
        question: "Khi thiết kế giao diện câu hỏi trắc nghiệm (Radio/Checkbox), làm thế nào để tăng trải nghiệm người dùng (UX) và khả năng tiếp cận? (Chọn nhiều đáp án)",
        options: [
          "Bọc input trong thẻ <label> hoặc liên kết qua thuộc tính 'for' và 'id' để người dùng bấm vào chữ cũng chọn được đáp án.",
          "Đảm bảo độ tương phản màu sắc rõ ràng giữa văn bản và nền.",
          "Thiết kế vùng chạm (Touch target) đủ lớn trên màn hình cảm ứng.",
          "Ẩn hoàn toàn trạng thái focus khi dùng bàn phím."
        ],
        correct: [0, 1, 2],
        explanation: "Liên kết <label> với <input>, đảm bảo độ tương phản màu và kích thước vùng bấm tối thiểu (khoảng 44x44px) giúp người dùng thao tác dễ dàng trên cả chuột, cảm ứng và bàn phím."
      }
    ]
  },
  {
    id: "quiz-advanced-fullstack",
    title: "Thử thách Nâng cao: Kiến trúc Frontend & Bất đồng bộ",
    topic: "Tổng hợp",
    difficulty: "Khó",
    durationMinutes: 8,
    description: "Đề thi phân loại nâng cao gồm kiến thức Fetch API, Promise/Async-Await, Event Delegation, Bảo mật XSS và Tối ưu hiệu năng.",
    questions: [
      {
        id: 401,
        type: "single",
        skill: "Async & Fetch API",
        question: "Khi sử dụng hàm fetch('questions.json') kết hợp với async/await, đoạn mã nào lấy dữ liệu JSON đúng chuẩn?",
        options: [
          "const data = await fetch('questions.json').json();",
          "const res = await fetch('questions.json'); const data = await res.json();",
          "const data = JSON.parse(fetch('questions.json'));",
          "const res = fetch('questions.json'); const data = res.text();"
        ],
        correct: [1],
        explanation: "fetch() trả về một Promise giải quyết thành đối tượng Response. Phương thức res.json() cũng là một tiến trình bất đồng bộ trả về Promise, nên cần dùng 'await' ở cả hai bước."
      },
      {
        id: 402,
        type: "multiple",
        skill: "DOM Events",
        question: "Kỹ thuật 'Event Delegation' (Ủy quyền sự kiện) trong JavaScript mang lại những lợi ích gì khi làm danh sách câu hỏi động? (Chọn nhiều đáp án)",
        options: [
          "Tiết kiệm bộ nhớ vì chỉ cần gắn 1 trình lắng nghe sự kiện lên phần tử cha thay vì hàng trăm phần tử con.",
          "Tự động hoạt động với cả các phần tử con được thêm mới vào DOM sau này bằng JavaScript.",
          "Dựa trên cơ chế nổi bọt sự kiện (Event Bubbling) trong DOM.",
          "Ngăn chặn hoàn toàn mọi lỗi cú pháp JavaScript."
        ],
        correct: [0, 1, 2],
        explanation: "Event Delegation tận dụng cơ chế Event Bubbling: sự kiện click ở phần tử con sẽ nổi bọt lên phần tử cha, giúp quản lý các danh sách render động cực kỳ hiệu quả."
      },
      {
        id: 403,
        type: "single",
        skill: "Web Security & Performance",
        question: "Khi hiển thị nội dung văn bản có chứa các thẻ như '<nav>' hoặc '<script>' lên giao diện trắc nghiệm, vì sao nên ưu tiên dùng 'textContent' hoặc mã hóa HTML thay vì gán thẳng vào 'innerHTML'?",
        options: [
          "Vì innerHTML không hoạt động trên trình duyệt Chrome.",
          "Để tránh trình duyệt hiểu nhầm chuỗi văn bản là thẻ HTML thật cần thực thi và phòng chống lỗ hổng XSS (Cross-Site Scripting).",
          "Vì textContent tự động dịch tiếng Anh sang tiếng Việt.",
          "Vì innerHTML chỉ nhận giá trị kiểu số nguyên."
        ],
        correct: [1],
        explanation: "Nếu câu hỏi có chứa chuỗi '<nav>' mà gán thẳng vào innerHTML không qua xử lý (escape HTML), trình duyệt sẽ biến nó thành thẻ <nav> ẩn thay vì hiển thị chữ '<nav>', đồng thời tiềm ẩn nguy cơ tấn công XSS."
      },
      {
        id: 404,
        type: "multiple",
        skill: "ES6 & Array Methods",
        question: "Để kiểm tra xem mảng đáp án người dùng chọn (userAns) có trùng khớp hoàn toàn với mảng đáp án đúng (correctAns) trong câu hỏi Checkbox hay không, cách tiếp cận nào là chính xác? (Chọn nhiều đáp án)",
        options: [
          "Sắp xếp cả 2 mảng tăng dần, kiểm tra cùng độ dài (length) và dùng .every((val, idx) => val === correctAns[idx]).",
          "Sắp xếp cả 2 mảng theo cùng thứ tự rồi so sánh chuỗi JSON.stringify(userAns) === JSON.stringify(correctAns).",
          "Chỉ cần kiểm tra userAns.length === correctAns.length là đủ.",
          "Dùng toán tử so sánh trực tiếp: userAns === correctAns."
        ],
        correct: [0, 1],
        explanation: "Trong JavaScript, hai mảng độc lập không thể so sánh trực tiếp bằng '===' (vì chúng khác địa chỉ tham chiếu). Ta cần sắp xếp (sort) cả hai mảng rồi so sánh từng phần tử bằng .every() hoặc qua JSON.stringify()."
      }
    ]
  }
];

const SKILL_RECOMMENDATIONS = {
  "HTML5 Semantics": "Ôn tập ý nghĩa các thẻ bố cục HTML5 (<header>, <nav>, <main>, <article>, <section>, <footer>) và các thuộc tính xác thực biểu mẫu (required, pattern, type).",
  "Flexbox & Grid": "Thực hành lại hệ trục Main Axis / Cross Axis trong Flexbox (justify-content, align-items) và cách chia cột với grid-template-columns: repeat(n, 1fr).",
  "CSS Box Model": "Nắm vững sự khác biệt giữa 'box-sizing: content-box' và 'border-box', cách tính tổng kích thước phần tử gồm content + padding + border.",
  "CSS Selectors": "Xem lại quy tắc tính trọng số độ ưu tiên (Specificity): Inline style > ID (#) > Class (.) / Attribute / Pseudo-class > Element tag.",
  "JSON & Data": "Củng cố hai phương thức cốt lõi: JSON.parse() (Chuỗi -> Object) và JSON.stringify() (Object -> Chuỗi).",
  "DOM Manipulation": "Luyện tập truy vấn phần tử với querySelector, querySelectorAll và cách cập nhật nội dung an toàn bằng textContent / classList.",
  "ES6 & Array Methods": "Ôn tập các hàm xử lý mảng không biến đổi (filter, map, every, includes) để lọc đề thi và chấm điểm tự động.",
  "DOM Events": "Thực hành addEventListener, event.preventDefault() trong Form và kỹ thuật Event Delegation (Ủy quyền sự kiện).",
  "Web Storage & Timer": "Ôn lại vòng đời của setInterval / clearInterval để làm đồng hồ đếm ngược và cách lưu trạng thái vào localStorage.",
  "Responsive Design": "Kiểm tra lại thẻ meta viewport và cách viết @media (min-width: ...) theo hướng tiếp cận Mobile-First.",
  "CSS Units & Typography": "Phân biệt rõ đơn vị tương đối 'rem' (theo thẻ gốc html), 'em' (theo phần tử cha) và 'vw/vh' (theo khung nhìn).",
  "Web Accessibility (UI/UX)": "Chú ý liên kết thẻ <label> với <input>, đảm bảo độ tương phản màu sắc và kích thước vùng chạm trên di động.",
  "Async & Fetch API": "Xem lại luồng xử lý bất đồng bộ với Promise, cú pháp async/await và hai bước giải mã dữ liệu từ fetch().",
  "Web Security & Performance": "Hiểu rõ cách phòng chống lỗi hiển thị thẻ HTML và lỗ hổng XSS bằng cách escape ký tự đặc biệt (<, >, &)."
};

// ==================== BIẾN TRẠNG THÁI TOÀN CỤC ====================
let currentView = "list";
let activeQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = {};
let flaggedQuestions = new Set();
let timerInterval = null;
let remainingSeconds = 0;
let totalQuizSeconds = 0;
let tabSwitchCount = 0;

let lastResult = null;
let reviewFilterMode = "wrong";
let quizHistory = {};
let globalWeakSkills = new Set();

// ==================== HÀM TIỆN ÍCH DÙNG CHUNG ====================
function escapeHTML(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatTime(seconds) {
  const safeSecs = Math.max(0, seconds);
  const mins = String(Math.floor(safeSecs / 60)).padStart(2, "0");
  const secs = String(safeSecs % 60).padStart(2, "0");
  return `${mins}:${secs}`;
}

function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  const icon = document.getElementById("toast-icon");
  const msg = document.getElementById("toast-message");

  msg.textContent = message;
  icon.className =
    type === "warning"
      ? "fa-solid fa-triangle-exclamation text-amber-400"
      : type === "error"
      ? "fa-solid fa-circle-xmark text-rose-400"
      : "fa-solid fa-circle-check text-emerald-400";

  toast.classList.remove("hidden");
  toast.classList.add("flex");

  clearTimeout(window.toastTimeout);
  window.toastTimeout = setTimeout(() => {
    toast.classList.add("hidden");
    toast.classList.remove("flex");
  }, 3200);
}

function switchView(viewName) {
  if (viewName === "quiz" && !activeQuiz) {
    if (typeof startQuizById === "function") {
      startQuizById(QUIZZES_DATA[0].id, false);
    }
    return;
  }

  if (viewName === "result" && !lastResult) {
    showToast("Hãy hoàn thành và nộp một bài thi để xem thống kê chi tiết!", "warning");
    if (!activeQuiz && typeof startQuizById === "function") {
      startQuizById(QUIZZES_DATA[0].id, false);
    } else {
      switchView("quiz");
    }
    return;
  }

  currentView = viewName;

  document.getElementById("view-list").classList.toggle("hidden", viewName !== "list");
  document.getElementById("view-quiz").classList.toggle("hidden", viewName !== "quiz");
  document.getElementById("view-result").classList.toggle("hidden", viewName !== "result");

  const navButtons = {
    list: document.getElementById("nav-list"),
    quiz: document.getElementById("nav-quiz"),
    result: document.getElementById("nav-result")
  };

  Object.keys(navButtons).forEach(key => {
    const btn = navButtons[key];
    if (key === viewName) {
      btn.className = "nav-tab flex-1 md:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all bg-white text-indigo-600 shadow-sm";
    } else {
      btn.className = "nav-tab flex-1 md:flex-initial flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all text-slate-600 hover:text-slate-900";
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}
