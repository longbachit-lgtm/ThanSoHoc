/**
 * Script để kiểm tra danh sách users trong database
 * 
 * Cách sử dụng:
 * node scripts/checkUsers.js
 */

const mongoose = require('mongoose');
const User = require('../src/app/models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thansohoc';

async function checkUsers() {
  try {
    console.log('🔗 Đang kết nối database...');
    console.log(`   URI: ${MONGODB_URI}\n`);
    
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Đã kết nối database thành công\n');

    // Đếm tổng số users
    const totalUsers = await User.countDocuments({ deletedAt: null });
    console.log(`📊 Tổng số users: ${totalUsers}\n`);

    // Đếm số admin
    const adminCount = await User.countDocuments({ role: 'admin', deletedAt: null });
    console.log(`👑 Số tài khoản admin: ${adminCount}\n`);

    // Đếm số user thường
    const userCount = await User.countDocuments({ role: { $ne: 'admin' }, deletedAt: null });
    console.log(`👤 Số tài khoản user: ${userCount}\n`);

    // Lấy danh sách tất cả users
    const users = await User.find({ deletedAt: null })
      .select('username email fullname role createdAt')
      .sort({ createdAt: -1 });

    if (users.length === 0) {
      console.log('ℹ️  Không có user nào trong database.');
    } else {
      console.log('📋 Danh sách users:\n');
      console.log('─'.repeat(100));
      console.log(
        'Username'.padEnd(20) + 
        'Email'.padEnd(30) + 
        'Fullname'.padEnd(25) + 
        'Role'.padEnd(10) + 
        'Created At'
      );
      console.log('─'.repeat(100));

      users.forEach(user => {
        const username = (user.username || 'N/A').padEnd(20);
        const email = (user.email || 'N/A').padEnd(30);
        const fullname = (user.fullname || 'N/A').padEnd(25);
        const role = (user.role || 'user').padEnd(10);
        const createdAt = user.createdAt ? new Date(user.createdAt).toLocaleString('vi-VN') : 'N/A';
        
        console.log(`${username}${email}${fullname}${role}${createdAt}`);
      });

      console.log('─'.repeat(100));
      console.log(`\nTổng: ${users.length} user(s)`);
    }

    // Chi tiết admin
    if (adminCount > 0) {
      console.log('\n👑 Chi tiết tài khoản admin:\n');
      const admins = await User.find({ role: 'admin', deletedAt: null })
        .select('username email fullname role createdAt');
      
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. ${admin.username}`);
        console.log(`   - Email: ${admin.email || 'N/A'}`);
        console.log(`   - Fullname: ${admin.fullname || 'N/A'}`);
        console.log(`   - Created: ${admin.createdAt ? new Date(admin.createdAt).toLocaleString('vi-VN') : 'N/A'}`);
        console.log('');
      });
    }

    await mongoose.disconnect();
    console.log('✅ Đã đóng kết nối database');
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi:', error.message);
    if (error.stack) {
      console.error('Chi tiết:', error.stack);
    }
    
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

checkUsers();

