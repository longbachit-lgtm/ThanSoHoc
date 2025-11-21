/**
 * Tính tuổi từ ngày sinh
 */
export const calculateAge = (birthDay, birthMonth, birthYear) => {
  const today = new Date();
  const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
  
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  return { years, months, days };
};

/**
 * Lấy cung hoàng đạo từ ngày sinh
 */
export const getZodiacSign = (day, month) => {
  const signs = [
    { name: "Ma Kết", start: [22, 12], end: [19, 1] },
    { name: "Bảo Bình", start: [20, 1], end: [18, 2] },
    { name: "Song Ngư", start: [19, 2], end: [20, 3] },
    { name: "Bạch Dương", start: [21, 3], end: [19, 4] },
    { name: "Kim Ngưu", start: [20, 4], end: [20, 5] },
    { name: "Song Tử", start: [21, 5], end: [20, 6] },
    { name: "Cự Giải", start: [21, 6], end: [22, 7] },
    { name: "Sư Tử", start: [23, 7], end: [22, 8] },
    { name: "Xử Nữ", start: [23, 8], end: [22, 9] },
    { name: "Thiên Bình", start: [23, 9], end: [22, 10] },
    { name: "Thần Nông", start: [23, 10], end: [21, 11] },
    { name: "Nhân Mã", start: [22, 11], end: [21, 12] }
  ];
  
  for (const sign of signs) {
    const [startDay, startMonth] = sign.start;
    const [endDay, endMonth] = sign.end;
    
    // Handle signs that span across year boundary (e.g., Ma Kết: Dec 22 - Jan 19)
    if (startMonth > endMonth) {
      if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
        return sign.name;
      }
    } else {
      // Normal case: same year
      if (month === startMonth && day >= startDay) {
        return sign.name;
      }
      if (month === endMonth && day <= endDay) {
        return sign.name;
      }
    }
  }
  
  return "Không xác định";
};

/**
 * Lấy năm con giáp từ năm sinh
 * Công thức: Thiên Can = year % 10, Địa Chi = year % 12
 */
export const getChineseZodiac = (year) => {
  // Địa Chi (12 con giáp) - thứ tự đúng: Thân, Dậu, Tuất, Hợi, Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi
  const zodiacs = [
    "Thân", "Dậu", "Tuất", "Hợi", "Tý", "Sửu",
    "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi"
  ];
  
  // Thiên Can (10 can)
  const elements = ["Canh", "Tân", "Nhâm", "Quý", "Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ"];
  
  // Công thức đúng: không trừ 4
  const zodiacIndex = year % 12;
  const elementIndex = year % 10;
  
  return `${elements[elementIndex]} ${zodiacs[zodiacIndex]}`;
};

/**
 * Chuyển đổi ngày dương lịch sang âm lịch (simplified)
 * Note: Đây là phiên bản đơn giản, để chính xác cần sử dụng thư viện chuyên dụng
 */
export const getLunarDate = (day, month, year) => {
  // Simplified conversion - in production, use a proper lunar calendar library
  // For now, return a placeholder
  return `${day}/${month}/${year}`;
};

