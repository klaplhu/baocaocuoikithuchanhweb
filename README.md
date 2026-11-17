# Adaptive Quiz System - Hệ thống Luyện tập & Kiểm tra Thích ứng

Ứng dụng web luyện tập và kiểm tra trắc nghiệm thích ứng, tích hợp đồng hồ đếm ngược, thanh tiến độ (Progress Bar), chấm điểm tự động kèm giải thích từ dữ liệu JSON và phân tích kỹ năng còn yếu.

## Cấu trúc các trang chức năng
1. **Trang Danh sách đề thi (`index.html`)**: Phân loại và lọc đề thi theo độ khó, chủ đề hoặc từ khóa kỹ năng.
2. **Trang Làm bài (`quiz.html`)**: Giao diện câu hỏi tương tác (Radio, Checkbox), thanh tiến độ, đồng hồ đếm ngược và giám sát chuyển tab.
3. **Trang Kết quả (`result.html`)**: Thống kê điểm số, hiển thị danh sách câu sai kèm giải thích từ JSON, phân tích kỹ năng còn yếu và tự động sinh đề luyện tập bù đắp.

## Phân công nhiệm vụ nhóm (4 Thành viên)
- **Thành viên 1**: Xây dựng cấu trúc dữ liệu `data/questions.json`, `js/data.js`, `css/style.css` và tài liệu `README.md`.
- **Thành viên 2**: Xây dựng Trang Danh sách đề thi (`index.html`, `js/exam-list.js`) với bộ lọc chủ đề, độ khó và tìm kiếm.
- **Thành viên 3**: Xây dựng Trang Làm bài (`quiz.html`, `js/quiz.js`) với câu hỏi Radio/Checkbox, thanh tiến độ, đồng hồ đếm ngược và giám sát rời tab.
- **Thành viên 4**: Xây dựng Trang Kết quả (`result.html`, `js/result.js`) với thống kê điểm số, phân tích kỹ năng yếu và tạo đề ôn tập thích ứng.
