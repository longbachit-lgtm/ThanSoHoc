import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    // TODO: xử lý đăng nhập
    alert("Đăng nhập demo!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* khung mobile */}
      <div
        className=" rounded-3xl border border-[#e9dccb] shadow-soft overflow-hidden relative px-4 pt-6 pb-7"
        style={{
          background: "#fdf4e8",
        }}
      >
        {/* logo text */}

        {/* thẻ login */}
        <main className="mt-4 bg-cream-200/100 rounded-xl2 border border-[#d9c7b5] shadow-card p-5">
          <h1 className="text-center text-[20px] font-extrabold text-gold-700">
            ĐĂNG NHẬP
          </h1>

          <form onSubmit={submit} className="mt-3 flex flex-col gap-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-xl border-2 border-gold-300 bg-white px-4 text-[15px] placeholder:text-[#b9a38f] outline-none focus:border-gold-600 focus:ring-4 focus:ring-[rgba(199,154,75,.18)]"
              required
            />
            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-xl border-2 border-gold-300 bg-white px-4 text-[15px] placeholder:text-[#b9a38f] outline-none focus:border-gold-600 focus:ring-4 focus:ring-[rgba(199,154,75,.18)]"
              required
            />

            {/* nút oval có mũi tên */}
            <button
              type="submit"
              aria-label="Đăng nhập"
              className="mt-1 self-center h-11 w-[74px] rounded-full bg-gold-600 shadow-[inset_0_-3px_0_rgba(0,0,0,.08),0_6px_14px_rgba(199,154,75,.28)] active:translate-y-px hover:brightness-105 transition"
            >
              <span className="inline-block w-[18px] h-[18px] border-r-[3px] border-b-[3px] border-white rotate-[-45deg] align-middle translate-y-[2px]" />
            </button>
          </form>

          <div className="mt-3 mb-1 flex items-center justify-center gap-2 text-[14px]">
            <a href="#signup" className="text-[#2b7fff] hover:underline">
              Đăng kí.
            </a>
            <button
              type="button"
              className="text-[#6e645b] hover:text-[#584f47]"
              onClick={() => alert("Bỏ qua đăng nhập (demo)")}
            >
              Bỏ qua bước đăng nhập
            </button>
          </div>
        </main>

        {/* cụm chấm tròn */}
        <footer className="absolute left-0 right-0 bottom-5 flex items-center justify-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-gold-600" />
          <span className="w-3 h-3 rounded-full bg-[#d6c0a1] opacity-60" />
          <span className="w-3 h-3 rounded-full bg-[#d6c0a1] opacity-60" />
          <span className="w-3 h-3 rounded-full bg-[#d6c0a1] opacity-60" />
          <span className="w-6 h-6 rounded-full border-2 border-gold-600 ring-2 ring-[#f5e6cf]" />
        </footer>
      </div>
    </div>
  );
}
