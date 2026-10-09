function Landing() {
  return (
    <div className="min-h-screen bg-[#050816] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-800">

        <div className="text-2xl font-bold tracking-wide">
          <span className="text-blue-500">NEX</span>ORA
        </div>

        <div className="hidden md:flex gap-8 text-sm text-slate-300">
          <a href="#features" className="hover:text-blue-400">
            Features
          </a>

          <a href="#about" className="hover:text-blue-400">
            About
          </a>

          <a href="/login" className="hover:text-blue-400">
            Login
          </a>
        </div>

        <a
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium"
        >
          Get Started
        </a>

      </nav>

      {/* Hero Section */}
      <section className="px-8 py-24 text-center">

        <div className="max-w-4xl mx-auto">

          <p className="text-blue-400 uppercase tracking-[0.3em] text-sm mb-5">
            Digital Risk Intelligence
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Protect Your Brand
            <br />
            <span className="text-blue-500">
              From Digital Threats
            </span>
          </h1>

          <p className="mt-7 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            NEXORA continuously monitors digital platforms to detect
            impersonation, fake accounts, malicious websites and other
            digital threats targeting your brand.
          </p>

          <div className="flex justify-center gap-4 mt-10">

            <a
              href="/login"
              className="bg-blue-600 hover:bg-blue-700 px-7 py-3 rounded-lg font-semibold"
            >
              Start Monitoring
            </a>

            <a
              href="#features"
              className="border border-slate-700 hover:border-blue-500 px-7 py-3 rounded-lg font-semibold"
            >
              Explore Features
            </a>

          </div>

        </div>

      </section>

      {/* Statistics */}
      <section className="px-8 pb-20">

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 text-center">
            <h2 className="text-4xl font-bold text-blue-400">
              127
            </h2>
            <p className="text-slate-400 mt-2">
              Threats Detected
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 text-center">
            <h2 className="text-4xl font-bold text-red-400">
              18
            </h2>
            <p className="text-slate-400 mt-2">
              Critical Threats
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-7 text-center">
            <h2 className="text-4xl font-bold text-green-400">
              96%
            </h2>
            <p className="text-slate-400 mt-2">
              Detection Accuracy
            </p>
          </div>

        </div>

      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 border-t border-slate-800">

        <div className="max-w-6xl mx-auto">

          <div className="text-center mb-14">

            <p className="text-blue-400 uppercase tracking-widest text-sm">
              Powerful Protection
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Digital Risk Intelligence
            </h2>

            <p className="text-slate-400 mt-4">
              Everything you need to monitor and protect your digital brand.
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition">
              <div className="text-3xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold">
                Threat Detection
              </h3>
              <p className="text-slate-400 mt-3 text-sm">
                Detect suspicious accounts, websites and digital activity.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition">
              <div className="text-3xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold">
                Brand Protection
              </h3>
              <p className="text-slate-400 mt-3 text-sm">
                Monitor your brand across multiple digital platforms.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold">
                Real-Time Alerts
              </h3>
              <p className="text-slate-400 mt-3 text-sm">
                Receive alerts when important threats are detected.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold">
                Risk Intelligence
              </h3>
              <p className="text-slate-400 mt-3 text-sm">
                Analyze threat severity and prioritize critical risks.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-8 py-8 text-center">

        <div className="text-xl font-bold">
          <span className="text-blue-500">NEX</span>ORA
        </div>

        <p className="text-slate-500 text-sm mt-2">
          Digital Risk Intelligence Platform
        </p>

        <p className="text-slate-600 text-xs mt-5">
          © 2026 NEXORA. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Landing;