/**
 * Script để set role admin cho một user
 * 
 * Cách sử dụng:
 * node scripts/setAdminRole.js <username> [mongodb_uri]
 * 
 * Ví dụ:
 * node scripts/setAdminRole.js admin
 * node scripts/setAdminRole.js admin mongodb://localhost:27017/thansohoc
 */

const mongoose = require('mongoose');
const User = require('../src/app/models/User');

// Lấy MongoDB URI từ argument hoặc environment variable hoặc dùng default
const MONGODB_URI = process.argv[3] || process.env.MONGODB_URI || 'mongodb://localhost:27017/thansohoc';

async function setAdminRole(username) {
  try {
    console.log(`🔗 Đang kết nối database: ${MONGODB_URI}`);
    
    // Kết nối database
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Đã kết nối database thành công');

    // Tìm user
    const user = await User.getUser(username);
    
    if (!user) {
      console.error(`❌ Không tìm thấy user với username: ${username}`);
      process.exit(1);
    }

    // Kiểm tra role hiện tại
    if (user.role === 'admin') {
      console.log(`ℹ️  User "${username}" đã có role admin rồi.`);
      await mongoose.disconnect();
      process.exit(0);
    }

    // Set role admin
    user.role = 'admin';
    await user.save();

    console.log(`✅ Đã set role admin cho user: ${username}`);
    console.log(`   - Username: ${user.username}`);
    console.log(`   - Fullname: ${user.fullname || 'N/A'}`);
    console.log(`   - Email: ${user.email || 'N/A'}`);
    console.log(`   - Role: ${user.role}`);

    await mongoose.disconnect();
    console.log('✅ Đã đóng kết nối database');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    if (error.stack) {
      console.error('Chi tiết:', error.stack);
    }
    
    // Đảm bảo đóng kết nối nếu có
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

// Lấy username từ command line arguments
const username = process.argv[2];

if (!username) {
  console.error('❌ Vui lòng cung cấp username!');
  console.log('Cách sử dụng: node scripts/setAdminRole.js <username>');
  console.log('Ví dụ: node scripts/setAdminRole.js admin');
  process.exit(1);
}

setAdminRole(username);

