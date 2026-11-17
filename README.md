# Adaptive Quiz System - Hệ thống Luyện tập & Kiểm tra Thích ứng

Ứng dụng web luyện tập và kiểm tra trắc nghiệm thích ứng, tích hợp đồng hồ đếm ngược, thanh tiến độ (Progress Bar), chấm điểm tự động kèm giải thích từ dữ liệu JSON và phân tích kỹ năng còn yếu.

## Cấu trúc dự án & Phân công 4 thành viên
- **Thành viên 1 (`data.js`, `README.md`)**: Xây dựng ngân hàng câu hỏi chuẩn JSON (`QUIZZES_DATA`), từ điển lộ trình ôn tập kỹ năng và các hàm điều hướng dùng chung.
- **Thành viên 2 (`index.html`)**: Thiết kế giao diện toàn hệ thống với HTML5 & Tailwind CSS, xây dựng Trang 1 (Danh sách đề thi, bộ lọc đa năng theo chủ đề/độ khó/từ khóa).
- **Thành viên 3 (`quiz.js`)**: Xây dựng Trang 2 (Giao diện làm bài tương tác Radio/Checkbox, thanh tiến độ, đồng hồ đếm ngược, đánh dấu câu hỏi & giám sát rời tab).
- **Thành viên 4 (`result.js`)**: Xây dựng Trang 3 (Chấm điểm tự động, phân tích kỹ năng yếu, gợi ý lộ trình bù đắp, đối chiếu câu sai từ JSON & Modal xem dữ liệu JSON).
