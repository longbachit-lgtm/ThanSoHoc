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
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          { time: "Sáng", text: "Liệt kê 3 việc cần khép lại; ưu tiên việc tạo tác động dây chuyền." },
          { time: "Trưa", text: "Gửi 1-2 tin nhắn cảm ơn; bỏ theo dõi 1 thứ gây nhiễu." },
          { time: "Chiều", text: "Dọn 15 phút: desktop, thư mục, to-do cũ." },
          { time: "Tối", text: 'Viết 5 dòng "Tôi biết ơn – Tôi buông – Tôi giữ".' }
        ]
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
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          { time: "Sáng", text: "Liệt kê 3 người bạn muốn kết nối hoặc 3 cuộc trò chuyện quan trọng." },
          { time: "Trưa", text: "Dành 15 phút lắng nghe ý kiến của đồng nghiệp hoặc người thân." },
          { time: "Chiều", text: "Tìm điểm chung trong một cuộc thảo luận hoặc dự án." },
          { time: "Tối", text: "Viết nhật ký về những điều bạn đã học được từ người khác hôm nay." }
        ]
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
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          { time: "Sáng", text: "Liệt kê 3 việc cần khép lại; ưu tiên việc tạo tác động dây chuyền." },
          { time: "Trưa", text: "Gửi 1-2 tin nhắn cảm ơn; bỏ theo dõi 1 thứ gây nhiễu." },
          { time: "Chiều", text: "Dọn 15 phút: desktop, thư mục, to-do cũ." },
          { time: "Tối", text: 'Viết 5 dòng "Tôi biết ơn – Tôi buông – Tôi giữ".' }
        ]
      }
    }
  },
  9: {
    day: {
      energyNumber: 9,
      energyDescription: "Hoàn thiện • Buông xả • Trắc ẩn",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content: "Ngày hôm nay mang năng lượng hoàn thiện và buông xả. Đây là thời điểm lý tưởng để bạn khép lại những chu kỳ cũ, thanh tẩy những điều không còn phục vụ mình, và mở lòng đón nhận những điều mới. Hãy bắt đầu ngày mới với lòng biết ơn và ý định rõ ràng về những gì bạn muốn hoàn thiện.",
        quickTip: "Khi bạn buông điều không còn phục vụ mình, không gian mới sẽ tự mở.",
        actions: [
          { label: "Lưu mục tiêu", primary: true, onClick: () => {} },
          { label: "Chia sẻ", primary: false, onClick: () => {} }
        ]
      },
      challenge: {
        title: "Thách thức & cơ hội",
        challenge: "Dễ nhạy cảm, lòng trắc ẩn tăng. Có xu hướng hồi tưởng, nhìn lại hành trình. Nếu chưa khép lại việc cũ, dễ thấy nặng lòng hoặc thiếu tập trung.",
        opportunity: "Khi bạn khép lại với lòng biết ơn, không gian mới sẽ tự mở ra. Năng lượng số 9 giúp bạn hoàn thiện mọi thứ một cách trọn vẹn và mở lòng đón nhận điều mới.",
        reminders: [
          { label: 'Mẹo giữ cân bằng: Dành 10-15\' yên tĩnh, không màn hình, hít thở 4-4-6 trước quyết định quan trọng', onClick: () => {} }
        ]
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng cố giữ lại những gì đã không còn phục vụ bạn – hãy buông với lòng biết ơn.",
          "Đừng để cảm xúc quá khứ chi phối hiện tại – hãy nhìn mọi thứ với trái tim rộng mở.",
          "Đừng khép lại với sự miễn cưỡng – hãy khép lại với lòng biết ơn."
        ],
        actions: [
          { label: "Hít thở 4-4-6", primary: false, onClick: () => {} }
        ]
      },
      motivation: {
        title: "Câu nói động viên",
        content: "Tôi biết ơn hành trình đã qua, nhẹ nhàng buông điều cũ và mở lòng đón điều mới."
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          { time: "Sáng", text: "Liệt kê 3 việc cần khép lại; ưu tiên việc tạo tác động dây chuyền." },
          { time: "Trưa", text: "Gửi 1-2 tin nhắn cảm ơn; bỏ theo dõi 1 thứ gây nhiễu." },
          { time: "Chiều", text: "Dọn 15 phút: desktop, thư mục, to-do cũ." },
          { time: "Tối", text: 'Viết 5 dòng "Tôi biết ơn – Tôi buông – Tôi giữ".' }
        ]
      }
    }
  }
};

/**
 * Generate suggested actions based on other advice sections
 */
const generateSuggestedActions = (advice) => {
  const actions = [];
  
  // Extract from preparation
  if (advice.preparation && advice.preparation.content) {
    const prepContent = advice.preparation.content;
    // Try to extract actionable items
    if (prepContent.includes("Buổi sáng") || prepContent.includes("Sáng")) {
      const morningMatch = prepContent.match(/(?:Buổi sáng|Sáng)[^.!?]*[.!?]/);
      if (morningMatch) {
        actions.push({ time: "Sáng", text: morningMatch[0].replace(/^(?:Buổi sáng|Sáng)[:\s]*/i, "").trim() });
      }
    }
  }
  
  // If we don't have enough actions, create generic ones
  if (actions.length < 4) {
    const defaultActions = [
      { time: "Sáng", text: "Liệt kê 3 việc quan trọng cần làm hôm nay." },
      { time: "Trưa", text: "Dành 15 phút nghỉ ngơi và tái tạo năng lượng." },
      { time: "Chiều", text: "Hoàn thành ít nhất một nhiệm vụ quan trọng." },
      { time: "Tối", text: "Viết nhật ký về những điều bạn biết ơn hôm nay." }
    ];
    
    // Fill missing actions
    for (let i = actions.length; i < 4; i++) {
      actions.push(defaultActions[i]);
    }
  }
  
  return {
    title: "Hành động gợi ý",
    actions: actions.slice(0, 4)
  };
};

/**
 * Lấy lời khuyên dựa trên số năng lượng và khoảng thời gian
 */
export const getAdviceByNumber = (number, period = 'day') => {
  const numberData = dailyAdviceData[number] || dailyAdviceData[1];
  const advice = numberData[period] || numberData.day;
  
  // If no suggestedActions, generate them
  if (!advice.suggestedActions) {
    advice.suggestedActions = generateSuggestedActions(advice);
  }
  
  return advice;
};

