/**
 * Dữ liệu lời khuyên dựa trên con số năng lượng (1-9)
 * Cấu trúc: { number: { day: {...}, week: {...}, month: {...}, year: {...} } }
 */

export const dailyAdviceData = {
  1: {
    day: {
      energyNumber: 1,
      energyDescription: "Khởi đầu • Chủ động • Dám bước trước",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content: "Ngày mai mang làn sóng tươi mới và mạnh mẽ – rất hợp để bạn khởi động ý tưởng, bắt đầu dự án, hoặc ra quyết định đã suy nghĩ bấy lâu. Buổi sáng, hãy tạo 'nhịp mở đầu' thật rõ: viết một mục tiêu duy nhất, bật nhạc nhẹ, và bắt tay vào hành động đầu tiên trong 10 phút đầu ngày.",
        quickTip: "Ngày mới thực sự bắt đầu khi bạn chọn việc đầu tiên để bắt đầu.",
      },
      challenge: {
        title: "Thách thức & Cơ hội",
        challenge: "Dễ nôn nóng muốn thấy kết quả ngay, hoặc khởi động quá nhiều thứ cùng lúc làm năng lượng phân tán.",
        opportunity: "Khi tập trung vào một hướng duy nhất, bạn sẽ thấy dòng chảy thuận lợi bất ngờ - người đúng, ý tưởng đúng, thời điểm đúng.",
        reminders: [],
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng tranh cãi để chứng minh mình đúng – để kết quả nói thay bạn.",
          "Đừng ôm đồm – chọn 1 hạt giống và chăm thật tốt.",
          "Đừng bốc đồng – trước mỗi quyết định, đếm chậm 3 hơi thở.",
        ],
        actions: [
          { label: "Hít thở 3 nhịp", primary: false, onClick: () => {} },
        ],
      },
      motivation: {
        title: "Câu nói động viên",
        content:
          "Mỗi khởi đầu đều cần một người dám đứng lên trước - hôm nay, người đó chính là bạn.",
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          {
            time: "Sáng",
            text: "Liệt kê 3 việc cần khép lại; ưu tiên việc tạo tác động dây chuyền.",
          },
          {
            time: "Trưa",
            text: "Gửi 1-2 tin nhắn cảm ơn; bỏ theo dõi 1 thứ gây nhiễu.",
          },
          { time: "Chiều", text: "Dọn 15 phút: desktop, thư mục, to-do cũ." },
          {
            time: "Tối",
            text: 'Viết 5 dòng "Tôi biết ơn – Tôi buông – Tôi giữ".',
          },
        ],
      },
    },
  },
  2: {
    day: {
      energyNumber: 2,
      energyDescription: "Hợp tác • Nhạy cảm • Kiên nhẫn",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content:
          "Hôm nay là ngày của sự hợp tác và lắng nghe. Hãy dành thời gian để kết nối với người khác, lắng nghe ý kiến và tìm điểm chung. Buổi sáng, hãy bắt đầu bằng việc liệt kê 3 người bạn muốn kết nối hoặc 3 cuộc trò chuyện quan trọng cần diễn ra.",
        quickTip: "Sức mạnh của bạn nằm ở khả năng tạo sự hài hòa giữa các ý kiến khác nhau.",
      },
      challenge: {
        title: "Thách thức & Cơ hội",
        challenge:
          "Dễ bị cảm xúc chi phối hoặc trì hoãn quyết định vì sợ xung đột.",
        opportunity:
          "Khi bạn tạo được không gian an toàn cho mọi người, những giải pháp sáng tạo sẽ tự nhiên xuất hiện.",
        reminders: [],
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng tránh né xung đột – hãy đối mặt với sự khác biệt một cách nhẹ nhàng.",
          "Đừng quá phụ thuộc vào người khác – hãy tự quyết định khi cần.",
          "Đừng để cảm xúc che mờ lý trí – cân bằng giữa tim và đầu.",
        ],
        actions: [
          { label: "Thiền 5 phút", primary: false, onClick: () => {} },
        ],
      },
      motivation: {
        title: "Câu nói động viên",
        content:
          "Trong sự nhẹ nhàng và kiên nhẫn, bạn tìm thấy sức mạnh thực sự của mình.",
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          {
            time: "Sáng",
            text: "Liệt kê 3 người bạn muốn kết nối hoặc 3 cuộc trò chuyện quan trọng.",
          },
          {
            time: "Trưa",
            text: "Dành 15 phút lắng nghe ý kiến của đồng nghiệp hoặc người thân.",
          },
          {
            time: "Chiều",
            text: "Tìm điểm chung trong một cuộc thảo luận hoặc dự án.",
          },
          {
            time: "Tối",
            text:
              "Viết nhật ký về những điều bạn đã học được từ người khác hôm nay.",
          },
        ],
      },
    },
  },
  3: {
    day: {
      energyNumber: 3,
      energyDescription: "Sáng tạo • Biểu đạt • Truyền cảm hứng",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content:
          "Ngày hôm nay mang năng lượng của sự sáng tạo và niềm vui. Hãy bắt đầu buổi sáng bằng việc viết ra hoặc vẽ ý tưởng nào khiến bạn thấy hào hứng. Tìm cách đưa yếu tố vui vẻ, bất ngờ hoặc nghệ thuật vào một hoạt động thường ngày.",
        quickTip: "Cứ để ý tưởng lan tỏa; đừng chờ hoàn hảo mới chia sẻ.",
      },
      challenge: {
        title: "Thách thức & Cơ hội",
        challenge:
          "Dễ dao động cảm xúc, có lúc cảm thấy lạc lõng hoặc tự ti khi ý tưởng chưa được ghi nhận.",
        opportunity:
          "Khi bạn dám chia sẻ, lan tỏa, bạn sẽ được tiếp thêm động lực từ chính sự kết nối.",
        reminders: [],
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng tự giới hạn bản thân – hãy để mọi ý tưởng được thể hiện.",
          "Đừng so sánh sự sáng tạo của mình với người khác.",
          "Đừng nuốt lời hứa với chính mình – hãy hoàn thành ít nhất một việc nhỏ tạo niềm vui.",
        ],
        actions: [
          { label: "Viết/vẽ 5 phút", primary: false, onClick: () => {} },
        ],
      },
      motivation: {
        title: "Câu nói động viên",
        content:
          "Khi bạn vui vẻ thể hiện, thế giới sẽ lắng nghe và hưởng ứng bạn.",
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          {
            time: "Sáng",
            text: "Viết ra 1 điều muốn tạo hoặc chia sẻ hôm nay.",
          },
          {
            time: "Trưa",
            text: "Gửi tin nhắn động viên bạn thân hoặc đồng đội.",
          },
          {
            time: "Chiều",
            text: "Tạo một đoạn nghệ thuật nhỏ (vẽ, nhạc, thơ…).",
          },
          {
            time: "Tối",
            text: "Đọc lại thành quả sáng tạo, ghi nhận điều tích cực.",
          },
        ],
      },
    },
  },
  4: {
    day: {
      energyNumber: 4,
      energyDescription: "Kỷ luật • Ổn định • Kế hoạch",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content:
          "Đây là ngày để bạn củng cố nền tảng, lập kế hoạch và xây dựng kỷ luật. Buổi sáng, hãy rà soát lại mục tiêu tuần/ tháng, phân chia rõ ràng từng bước nhỏ để hành động.",
        quickTip: "Sự ổn định được tạo ra từ những thói quen nhỏ bền vững mỗi ngày.",
      },
      challenge: {
        title: "Thách thức & Cơ hội",
        challenge:
          "Dễ bị mắc kẹt vào tiểu tiết hoặc cứng nhắc, đôi khi cảm thấy thiếu tự do.",
        opportunity:
          "Khi cam kết hoàn thành từng bước nhỏ, bạn sẽ thấy nền móng vững chắc giúp mọi việc dễ dàng hơn về sau.",
        reminders: [],
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng để tính hoàn hảo cản trở việc bắt tay vào làm.",
          "Đừng ôm đồm quá nhiều – hãy ưu tiên việc trọng yếu.",
          "Đừng trì hoãn vì sợ thất bại – cứ bắt đầu từ những điều đơn giản.",
        ],
        actions: [
          {
            label: "Viết checklist từng việc trong ngày",
            primary: false,
            onClick: () => {},
          },
        ],
      },
      motivation: {
        title: "Câu nói động viên",
        content:
          "Chặng đường ngàn dặm bắt đầu bằng một bước chân vững chãi.",
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          {
            time: "Sáng",
            text: "Tạo checklist từng đầu việc nhỏ cho ngày.",
          },
          {
            time: "Trưa",
            text: "Kiểm tra tiến độ – đánh dấu mỗi việc hoàn thành.",
          },
          {
            time: "Chiều",
            text: "Sắp xếp lại không gian làm việc ngăn nắp.",
          },
          {
            time: "Tối",
            text: "Tổng kết: điều gì đã tiến bộ, điều gì cần điều chỉnh.",
          },
        ],
      },
    },
  },
  5: {
    day: {
      energyNumber: 5,
      energyDescription: "Tự do • Thay đổi • Trải nghiệm",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content:
          "Ngày hôm nay mang năng lượng đổi mới, thích hợp để thử điều gì đó bạn chưa từng làm – dù lớn hay nhỏ. Buổi sáng, bạn hãy thay đổi thói quen cũ: chọn đường đi khác, đổi chỗ ngồi, hoặc học một điều mới.",
        quickTip: "Sự linh hoạt chính là lợi thế khi mọi việc thay đổi bất ngờ.",
      },
      challenge: {
        title: "Thách thức & Cơ hội",
        challenge:
          "Dễ bị phân tán, thiếu tập trung hoặc lao vào quá nhiều trải nghiệm, bỏ dở giữa chừng.",
        opportunity:
          "Nếu chọn 1-2 trải nghiệm chủ đạo, bạn sẽ khám phá ra bản thân ở khía cạnh mới thú vị.",
        reminders: [],
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng nói “có” với mọi thứ – hãy biết từ chối đúng lúc để giữ năng lượng.",
          "Đừng bỏ dở nửa chừng – hãy dành thời gian cảm nhận trọn vẹn từng trải nghiệm.",
          "Đừng quá sợ sự thay đổi – đó chính là điều giúp bạn trưởng thành.",
        ],
        actions: [
          {
            label: "Chọn 1 điều mới để thử",
            primary: false,
            onClick: () => {},
          },
        ],
      },
      motivation: {
        title: "Câu nói động viên",
        content:
          "Trải nghiệm chính là cách bạn mở rộng giới hạn của bản thân.",
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          {
            time: "Sáng",
            text: "Đổi chỗ ngồi hoặc thay đổi trình tự công việc thường ngày.",
          },
          {
            time: "Trưa",
            text: "Trải nghiệm một món ăn hoặc nhạc mới.",
          },
          {
            time: "Chiều",
            text: "Đăng ký/ thử một hoạt động chưa từng tham gia.",
          },
          {
            time: "Tối",
            text: "Viết lại điều mới mẻ bạn học được hôm nay.",
          },
        ],
      },
    },
  },
  6: {
    day: {
      energyNumber: 6,
      energyDescription: "Yêu thương • Trách nhiệm • Cân bằng",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content:
          "Năng lượng của sự quan tâm và trách nhiệm gia tăng trong ngày này. Buổi sáng, hãy kiểm tra các kế hoạch liên quan đến gia đình, đồng nghiệp hoặc cộng đồng. Hỏi thăm ai đó bạn quan tâm và dành thời gian tạo không gian cân bằng cho bản thân.",
        quickTip:
          "Trao đi yêu thương không làm bạn mất đi gì - chỉ khiến người khác và bạn mạnh mẽ hơn.",
      },
      challenge: {
        title: "Thách thức & Cơ hội",
        challenge:
          "Có xu hướng lo lắng quá mức, ôm đồm trách nhiệm hoặc hy sinh bản thân.",
        opportunity:
          "Nếu biết chia sẻ trách nhiệm, bạn sẽ thấy mọi việc nhẹ nhàng và được hỗ trợ nhiều hơn.",
        reminders: [],
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng quên chăm sóc chính mình trong khi giúp đỡ người khác.",
          "Đừng trì hoãn việc giải quyết những rắc rối gia đình/nhóm.",
          "Đừng từ chối lời đề nghị giúp đỡ khi bạn thật sự cần.",
        ],
        actions: [
          {
            label: "Tự hỏi hôm nay chăm sóc gì cho bản thân?",
            primary: false,
            onClick: () => {},
          },
        ],
      },
      motivation: {
        title: "Câu nói động viên",
        content:
          "Sự cân bằng là khi bạn cho đi bằng tấm lòng rộng mở - nhưng vẫn biết lắng nghe nhu cầu chính mình.",
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          {
            time: "Sáng",
            text: "Hỏi thăm, gửi lời chúc cho người bạn/family.",
          },
          {
            time: "Trưa",
            text: "Tạo không gian/giờ nghỉ yên tĩnh cho mình.",
          },
          {
            time: "Chiều",
            text: "Chia sẻ, phân công lại trách nhiệm với team/nhà.",
          },
          {
            time: "Tối",
            text: "Viết điều biết ơn về gia đình/con người quanh bạn.",
          },
        ],
      },
    },
  },
  7: {
    day: {
      energyNumber: 7,
      energyDescription: "Trực giác • Chiêm nghiệm • Tri thức",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content:
          "Đây là ngày lý tưởng để bạn tĩnh lặng, quan sát sâu sắc và khám phá tri thức mới. Buổi sáng, dành vài phút thiền hoặc viết nhật ký để định tâm lại. Tìm kiếm câu trả lời từ bên trong trước khi hỏi người khác.",
        quickTip: "Câu trả lời nằm ở chính trải nghiệm cá nhân của bạn.",
      },
      challenge: {
        title: "Thách thức & Cơ hội",
        challenge:
          "Dễ rơi vào cô lập, suy nghĩ quá nhiều hoặc cảm thấy không ai hiểu mình.",
        opportunity:
          "Khi biết kết nối giữa tri thức và cảm nhận, bạn sẽ xây dựng được niềm tin nội tại mạnh mẽ.",
        reminders: [],
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng tự mình gánh vác mọi câu hỏi – hãy chia sẻ những điều bạn đang suy tư.",
          "Đừng bỏ qua quyền nghỉ ngơi, tái tạo năng lượng sau khi học tập/chìm trong suy nghĩ.",
          "Đừng sống mãi với quá khứ – đón nhận hiện tại bằng con mắt mới.",
        ],
        actions: [
          {
            label: "Thiền hoặc viết nhật ký 10 phút",
            primary: false,
            onClick: () => {},
          },
        ],
      },
      motivation: {
        title: "Câu nói động viên",
        content:
          "Trí tuệ bên trong bạn là ánh sáng soi đường cho hành trình phía trước.",
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          {
            time: "Sáng",
            text: "Dành 10 phút thiền yên tĩnh hoặc đọc sách chuyên sâu.",
          },
          {
            time: "Trưa",
            text: "Viết/ghi nhận điều tâm đắc và cảm hứng mới học.",
          },
          {
            time: "Chiều",
            text:
              "Trò chuyện với người truyền cảm hứng hoặc chia sẻ cảm nhận.",
          },
          {
            time: "Tối",
            text: "Ghi lại 1 câu hỏi lớn bạn muốn tự khám phá tiếp.",
          },
        ],
      },
    },
  },
  8: {
    day: {
      energyNumber: 8,
      energyDescription: "Thành tựu • Quyết đoán • Dẫn dắt",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content:
          "Năng lượng của thành tựu và kết quả rõ rệt giúp bạn tiến xa hôm nay. Buổi sáng, hãy xác định 1 mục tiêu cần hoàn thành và hình dung rõ kết quả (deadline, đối tác, điều kiện thành công).",
        quickTip: "Sức mạnh hành động nhất quán quyết định kết quả cuộc chơi.",
      },
      challenge: {
        title: "Thách thức & Cơ hội",
        challenge:
          "Có thể gặp áp lực, hoặc xung đột quyền lực với người khác. Dễ mải mê thành tích mà quên cân bằng.",
        opportunity:
          "Khi dùng sức mạnh cá nhân để tạo giá trị chung, bạn sẽ nhận được sự ghi nhận và hỗ trợ xứng đáng.",
        reminders: [],
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng kiểm soát thái quá – hãy tin tưởng và trao quyền khi cần thiết.",
          "Đừng hy sinh uy tín vì thành tích ngắn hạn.",
          "Đừng để áp lực làm lu mờ lòng nhân ái.",
        ],
        actions: [
          {
            label: "Viết mục tiêu/nguyên tắc thành công quan trọng",
            primary: false,
            onClick: () => {},
          },
        ],
      },
      motivation: {
        title: "Câu nói động viên",
        content:
          "Bạn mạnh mẽ hơn khi kết quả của bạn giúp ích được cho người khác.",
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          {
            time: "Sáng",
            text: "Chốt mục tiêu ưu tiên & vạch rõ tiêu chí thành công.",
          },
          {
            time: "Trưa",
            text: "Gửi lời khen/chia sẻ động lực cho team.",
          },
          {
            time: "Chiều",
            text: "Hoàn thiện 1 đầu việc trọng điểm.",
          },
          {
            time: "Tối",
            text: "Tổng kết ngày: nhìn nhận kết quả và bài học rút ra.",
          },
        ],
      },
    },
  },
  9: {
    day: {
      energyNumber: 9,
      energyDescription: "Hoàn thiện • Buông xả • Trắc ẩn",
      preparation: {
        title: "Chuẩn bị cho ngày mới",
        content:
          "Ngày hôm nay mang năng lượng hoàn thiện và buông xả. Đây là thời điểm lý tưởng để bạn khép lại những chu kỳ cũ, thanh tẩy những điều không còn phục vụ mình, và mở lòng đón nhận những điều mới. Hãy bắt đầu ngày mới với lòng biết ơn và ý định rõ ràng về những gì bạn muốn hoàn thiện.",
        quickTip:
          "Khi bạn buông điều không còn phục vụ mình, không gian mới sẽ tự mở.",
      },
      challenge: {
        title: "Thách thức & Cơ hội",
        challenge:
          "Dễ nhạy cảm, lòng trắc ẩn tăng. Có xu hướng hồi tưởng, nhìn lại hành trình. Nếu chưa khép lại việc cũ, dễ thấy nặng lòng hoặc thiếu tập trung.",
        opportunity:
          "Khi bạn khép lại với lòng biết ơn, không gian mới sẽ tự mở ra. Năng lượng số 9 giúp bạn hoàn thiện mọi thứ một cách trọn vẹn và mở lòng đón nhận điều mới.",
        reminders: [
          {
            label:
              "Mẹo giữ cân bằng: Dành 10-15' yên tĩnh, không màn hình, hít thở 4-4-6 trước quyết định quan trọng",
            onClick: () => {},
          },
        ],
      },
      mistakes: {
        title: "Hướng dẫn tránh sai lầm",
        content: [
          "Đừng cố giữ lại những gì đã không còn phục vụ bạn – hãy buông với lòng biết ơn.",
          "Đừng để cảm xúc quá khứ chi phối hiện tại – hãy nhìn mọi thứ với trái tim rộng mở.",
          "Đừng khép lại với sự miễn cưỡng – hãy khép lại với lòng biết ơn.",
        ],
        actions: [
          { label: "Hít thở 4-4-6", primary: false, onClick: () => {} },
        ],
      },
      motivation: {
        title: "Câu nói động viên",
        content:
          "Tôi biết ơn hành trình đã qua, nhẹ nhàng buông điều cũ và mở lòng đón điều mới.",
      },
      suggestedActions: {
        title: "Hành động gợi ý",
        actions: [
          {
            time: "Sáng",
            text: "Nhìn lại và liệt kê 3 việc bạn muốn hoàn thiện/khép lại.",
          },
          {
            time: "Trưa",
            text:
              "Gửi 1-2 tin nhắn cảm ơn hoặc chia sẻ điều tích cực cho ai đó.",
          },
          {
            time: "Chiều",
            text: "Dọn dẹp/giải phóng 1 khu vực/việc cũ.",
          },
          {
            time: "Tối",
            text: 'Viết 5 dòng "Tôi biết ơn – Tôi buông – Tôi giữ".',
          },
        ],
      },
    },
  },
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

