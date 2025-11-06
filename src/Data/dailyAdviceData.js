/**
 * Dữ liệu lời khuyên dựa trên con số năng lượng
 * Cấu trúc: { number: { day: {...}, week: {...}, month: {...}, year: {...} } }
 */

export const dailyAdviceData = {
  1: {
    day: {
      energyNumber: 1,
      energyDescription: "Khởi đầu - Chủ động - Dám bước trước",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content: "Ngày mai mang làn sóng tươi mới và mạnh mẽ – rất hợp để bạn khởi động ý tưởng, bắt đầu dự án, hoặc ra quyết định đã suy nghĩ bấy lâu. Buổi sáng, hãy tạo 'nhịp mở đầu' thật rõ: viết một mục tiêu duy nhất, bật nhạc nhẹ, và bắt tay vào hành động đầu tiên trong 10 phút đầu ngày.",
        quickTip: "Ngày mới thực sự bắt đầu khi bạn chọn việc đầu tiên để bắt đầu.",
        actions: [
          { label: "Lưu mục tiêu", primary: true, onClick: () => {} },
          { label: "Chia sẻ", primary: false, onClick: () => {} }
        ]
      },
      challenge: {
        title: "Thách thức & cơ hội",
        challenge: "Dễ nôn nóng muốn thấy kết quả ngay, hoặc khởi động quá nhiều thứ cùng lúc làm năng lượng phân tán.",
        opportunity: "Khi tập trung vào một hướng duy nhất, bạn sẽ thấy dòng chảy thuận lợi bất ngờ - người đúng, ý tưởng đúng, thời điểm đúng.",
        reminders: [
          { label: 'Hẹn nhắc 14:00: "Kiểm tra nhịp độ"', onClick: () => {} },
          { label: "Thêm nhắc 14:00", onClick: () => {} }
        ]
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng tranh cãi để chứng minh mình đúng – để kết quả nói thay bạn.",
          "Đừng ôm đồm – chọn 1 hạt giống và chăm thật tốt.",
          "Đừng bốc đồng – trước mỗi quyết định, đếm chậm 3 hơi thở."
        ],
        actions: [
          { label: "Hít thở 3 nhịp", primary: false, onClick: () => {} }
        ]
      },
      motivation: {
        title: "Câu nói động viên",
        content: "Mỗi khởi đầu điều cần một người dám đứng lên trước - hôm nay, người đó chính là bạn."
      }
    }
  },
  2: {
    day: {
      energyNumber: 2,
      energyDescription: "Hợp tác - Nhạy cảm - Kiên nhẫn",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content: "Hôm nay là ngày của sự hợp tác và lắng nghe. Hãy dành thời gian để kết nối với người khác, lắng nghe ý kiến và tìm điểm chung. Buổi sáng, hãy bắt đầu bằng việc liệt kê 3 người bạn muốn kết nối hoặc 3 cuộc trò chuyện quan trọng cần diễn ra.",
        quickTip: "Sức mạnh của bạn nằm ở khả năng tạo sự hài hòa giữa các ý kiến khác nhau.",
        actions: [
          { label: "Lưu mục tiêu", primary: true, onClick: () => {} },
          { label: "Chia sẻ", primary: false, onClick: () => {} }
        ]
      },
      challenge: {
        title: "Thách thức & cơ hội",
        challenge: "Dễ bị cảm xúc chi phối hoặc trì hoãn quyết định vì sợ xung đột.",
        opportunity: "Khi bạn tạo được không gian an toàn cho mọi người, những giải pháp sáng tạo sẽ tự nhiên xuất hiện.",
        reminders: [
          { label: 'Hẹn nhắc 15:00: "Kiểm tra cảm xúc"', onClick: () => {} }
        ]
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng tránh né xung đột – hãy đối mặt với sự khác biệt một cách nhẹ nhàng.",
          "Đừng quá phụ thuộc vào người khác – hãy tự quyết định khi cần.",
          "Đừng để cảm xúc che mờ lý trí – cân bằng giữa tim và đầu."
        ],
        actions: [
          { label: "Thiền 5 phút", primary: false, onClick: () => {} }
        ]
      },
      motivation: {
        title: "Câu nói động viên",
        content: "Trong sự nhẹ nhàng và kiên nhẫn, bạn tìm thấy sức mạnh thực sự của mình."
      }
    }
  },
  6: {
    day: {
      energyNumber: 6,
      energyDescription: "Khởi đầu - Chủ động - Dám bước trước",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content: "Ngày mai mang làn sóng tươi mới và mạnh mẽ – rất hợp để bạn khởi động ý tưởng, bắt đầu dự án, hoặc ra quyết định đã suy nghĩ bấy lâu. Buổi sáng, hãy tạo 'nhịp mở đầu' thật rõ: viết một mục tiêu duy nhất, bật nhạc nhẹ, và bắt tay vào hành động đầu tiên trong 10 phút đầu ngày.",
        quickTip: "Ngày mới thực sự bắt đầu khi bạn chọn việc đầu tiên để bắt đầu.",
        actions: [
          { label: "Lưu mục tiêu", primary: true, onClick: () => {} },
          { label: "Chia sẻ", primary: false, onClick: () => {} }
        ]
      },
      challenge: {
        title: "Thách thức & cơ hội",
        challenge: "Dễ nôn nóng muốn thấy kết quả ngay, hoặc khởi động quá nhiều thứ cùng lúc làm năng lượng phân tán.",
        opportunity: "Khi tập trung vào một hướng duy nhất, bạn sẽ thấy dòng chảy thuận lợi bất ngờ - người đúng, ý tưởng đúng, thời điểm đúng.",
        reminders: [
          { label: 'Hẹn nhắc 14:00: "Kiểm tra nhịp độ"', onClick: () => {} },
          { label: "Thêm nhắc 14:00", onClick: () => {} }
        ]
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng tranh cãi để chứng minh mình đúng – để kết quả nói thay bạn.",
          "Đừng ôm đồm – chọn 1 hạt giống và chăm thật tốt.",
          "Đừng bốc đồng – trước mỗi quyết định, đếm chậm 3 hơi thở."
        ],
        actions: [
          { label: "Hít thở 3 nhịp", primary: false, onClick: () => {} }
        ]
      },
      motivation: {
        title: "Câu nói động viên",
        content: "Mỗi khởi đầu điều cần một người dám đứng lên trước - hôm nay, người đó chính là bạn."
      }
    }
  }
};

/**
 * Lấy lời khuyên dựa trên số năng lượng và khoảng thời gian
 */
export const getAdviceByNumber = (number, period = 'day') => {
  const numberData = dailyAdviceData[number] || dailyAdviceData[1];
  return numberData[period] || numberData.day;
};

