/**
 * Script để tạo tài khoản admin đầu tiên
 * Script sẽ kiểm tra xem đã có tài khoản admin nào chưa
 * Nếu chưa có, sẽ tạo một tài khoản admin mới
 * 
 * Cách sử dụng:
 * node scripts/createAdminAccount.js [username] [password] [email] [fullname]
 * 
 * Ví dụ:
 * node scripts/createAdminAccount.js
 * node scripts/createAdminAccount.js admin admin123
 * node scripts/createAdminAccount.js admin admin123 admin@example.com "Admin User"
 * 
 * Lưu ý: MongoDB URI sẽ được lấy từ environment variable MONGODB_URI 
 * hoặc mặc định là mongodb://localhost:27017/thansohoc
 */

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') }); // Load .env from backend root
const User = require('../src/app/models/User');
const readline = require('readline');
const { SALT_ROUNDS } = require('../src/variables/auth');

// MongoDB URI sẽ được đọc từ environment variable hoặc dùng default
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/thansohoc';

// Tạo readline interface để nhập dữ liệu từ console
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper function để nhập dữ liệu từ console
function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Helper function để validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Helper function để validate username
function isValidUsername(username) {
  return /^[a-z0-9_]{3,30}$/.test(username.toLowerCase());
}

async function checkAdminExists() {
  try {
    const adminCount = await User.countDocuments({ role: 'admin', deletedAt: null });
    return adminCount > 0;
  } catch (error) {
    console.error('❌ Lỗi khi kiểm tra admin:', error.message);
    return false;
  }
}

async function createAdminAccount(userData) {
  try {
    const { username, password, email, fullname } = userData;

    // Validate username
    if (!isValidUsername(username)) {
      throw new Error('Username không hợp lệ. Phải từ 3-30 ký tự, chỉ chứa chữ cái thường, số và dấu gạch dưới.');
    }

    // Validate password
    if (!password || password.length < 6) {
      throw new Error('Mật khẩu phải có ít nhất 6 ký tự.');
    }

    // Validate email (nếu có)
    if (email && !isValidEmail(email)) {
      throw new Error('Email không hợp lệ.');
    }

    // Kiểm tra username đã tồn tại chưa
    const existingUser = await User.getUser(username);
    if (existingUser) {
      throw new Error(`Username "${username}" đã tồn tại. Vui lòng chọn username khác.`);
    }

    // Kiểm tra email đã tồn tại chưa (nếu có email)
    if (email) {
      const existingEmail = await User.findOne({
        email: email.toLowerCase().trim(),
        deletedAt: null
      });
      if (existingEmail) {
        throw new Error(`Email "${email}" đã được sử dụng.`);
      }
    }

    // Hash password
    const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);

    // Tạo user admin
    const newAdmin = new User({
      username: username.toLowerCase().trim(),
      password: hashPassword,
      fullname: fullname?.trim() || null,
      email: email?.toLowerCase().trim() || null,
      role: 'admin'
    });

    await newAdmin.save();

    return newAdmin;
  } catch (error) {
    throw error;
  }
}

async function getAdminDataFromArgs() {
  const username = process.argv[2]?.trim();
  const password = process.argv[3]?.trim();
  const email = process.argv[4]?.trim();
  const fullname = process.argv[5]?.trim();

  // Nếu có đủ thông tin từ arguments, trả về luôn
  if (username && password) {
    return {
      username,
      password,
      email: email || null,
      fullname: fullname || null
    };
  }

  return null;
}

async function getAdminDataFromInput() {
  console.log('\n📝 Vui lòng nhập thông tin tài khoản admin:\n');

  let username;
  while (!username || !isValidUsername(username)) {
    username = await question('Username (3-30 ký tự, chữ thường, số, dấu gạch dưới): ');
    username = username.trim();

    if (!username) {
      console.log('⚠️  Username là bắt buộc!');
      continue;
    }

    if (!isValidUsername(username)) {
      console.log('⚠️  Username không hợp lệ. Phải từ 3-30 ký tự, chỉ chứa chữ cái thường, số và dấu gạch dưới.');
      username = null;
    }
  }

  let password;
  while (!password || password.length < 6) {
    password = await question('Password (ít nhất 6 ký tự): ');
    password = password.trim();

    if (!password || password.length < 6) {
      console.log('⚠️  Mật khẩu phải có ít nhất 6 ký tự!');
    }
  }

  const email = await question('Email (optional, Enter để bỏ qua): ');
  const emailValue = email.trim() || null;

  if (emailValue && !isValidEmail(emailValue)) {
    console.log('⚠️  Email không hợp lệ, sẽ bỏ qua email này.');
  }

  const fullname = await question('Fullname (optional, Enter để bỏ qua): ');
  const fullnameValue = fullname.trim() || null;

  return {
    username,
    password,
    email: emailValue && isValidEmail(emailValue) ? emailValue : null,
    fullname: fullnameValue || null
  };
}

async function main() {
  try {
    console.log('🔗 Đang kết nối database...');
    console.log(`   URI: ${MONGODB_URI}\n`);

    // Kết nối database
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Đã kết nối database thành công\n');

    // Kiểm tra đã có admin chưa
    console.log('🔍 Đang kiểm tra tài khoản admin...');
    const hasAdmin = await checkAdminExists();

    if (hasAdmin) {
      const adminCount = await User.countDocuments({ role: 'admin', deletedAt: null });
      console.log(`⚠️  Đã có ${adminCount} tài khoản admin trong hệ thống.`);
      console.log('⚠️  Bạn vẫn có thể tạo thêm admin mới.\n');

      // Hỏi xác nhận nếu chạy ở interactive mode
      if (!process.argv[2] || !process.argv[3]) {
        const confirm = await question('Bạn có muốn tiếp tục tạo admin mới? (y/n): ');
        if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 'yes') {
          console.log('❌ Đã hủy tạo admin.');
          await mongoose.disconnect();
          rl.close();
          process.exit(0);
        }
        console.log('');
      }
    } else {
      console.log('ℹ️  Chưa có tài khoản admin nào trong hệ thống.\n');
    }

    // Lấy thông tin admin
    let adminData = await getAdminDataFromArgs();

    if (!adminData) {
      adminData = await getAdminDataFromInput();
    }

    // Tạo tài khoản admin
    console.log('\n⏳ Đang tạo tài khoản admin...');
    const newAdmin = await createAdminAccount(adminData);

    console.log('\n✅ Tạo tài khoản admin thành công!');
    console.log('\n📋 Thông tin tài khoản:');
    console.log(`   - Username: ${newAdmin.username}`);
    console.log(`   - Fullname: ${newAdmin.fullname || 'N/A'}`);
    console.log(`   - Email: ${newAdmin.email || 'N/A'}`);
    console.log(`   - Role: ${newAdmin.role}`);
    console.log(`   - Created At: ${newAdmin.createdAt}`);

    console.log('\n⚠️  LƯU Ý: Vui lòng lưu lại thông tin đăng nhập!');
    console.log(`   Username: ${newAdmin.username}`);
    console.log(`   Password: [Đã được nhập ở trên]`);

    await mongoose.disconnect();
    console.log('\n✅ Đã đóng kết nối database');

    rl.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Lỗi:', error.message);
    if (error.stack) {
      console.error('Chi tiết:', error.stack);
    }

    // Đảm bảo đóng kết nối nếu có
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }

    rl.close();
    process.exit(1);
  }
}

// Chạy script
main();

