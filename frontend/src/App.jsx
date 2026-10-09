import { useEffect, useMemo, useState } from "react";

const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API = configuredApiUrl
  ? `${configuredApiUrl.startsWith("http") ? "" : "https://"}${configuredApiUrl}`.replace(/\/+$/, "")
  : "http://127.0.0.1:8000";

const brands = [
  {
    id: 1,
    name: "Google",
    logo: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    description: "Official Google brand profile",
    trusted: true,
    apps: 5,
    social: 5,
  },
  {
    id: 2,
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    description: "Official Microsoft brand profile",
    trusted: true,
    apps: 4,
    social: 5,
  },
  {
    id: 3,
    name: "Amazon",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    description: "Official Amazon brand profile",
    trusted: true,
    apps: 3,
    social: 5,
  },
];

function ResultBadge({ label, tone = "neutral" }) {
  return <span className={`result-badge ${tone}`}>{label}</span>;
}

function App() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [apiStatus, setApiStatus] = useState("Checking...");

  const [appForm, setAppForm] = useState({
    app_name: "",
    developer: "",
    package_id: "",
    description: "",
  });
  const [appResult, setAppResult] = useState(null);
  const [appLoading, setAppLoading] = useState(false);
  const [appError, setAppError] = useState("");

  const [socialForm, setSocialForm] = useState({
    platform: "Instagram",
    official_username: "",
    official_display_name: "",
    official_bio: "",
    candidate_username: "",
    candidate_display_name: "",
    candidate_bio: "",
    official_logo: "",
    candidate_logo: "",
  });
  const [socialResult, setSocialResult] = useState(null);
  const [socialLoading, setSocialLoading] = useState(false);
  const [socialError, setSocialError] = useState("");
  const emptyPublicProfile = { username: "", display_name: "", bio: "", profile_url: "", verified_badge_observed: false, linked_from_official_website: false, followers: "", following: "", posts: "" };
  const [publicCompare, setPublicCompare] = useState({ profile_a: { ...emptyPublicProfile }, profile_b: { ...emptyPublicProfile } });
  const [publicCompareResult, setPublicCompareResult] = useState(null);
  const [publicCompareLoading, setPublicCompareLoading] = useState(false);
  const [publicCompareError, setPublicCompareError] = useState("");

  const filteredBrands = useMemo(
    () => brands.filter((brand) => brand.name.toLowerCase().includes(search.toLowerCase())),
    [search]
  );

  const totalApps = brands.reduce((sum, b) => sum + b.apps, 0);
  const totalAccounts = brands.reduce((sum, b) => sum + b.social, 0);

  const checkApi = async () => {
    try {
      const response = await fetch(`${API}/health`);
      if (!response.ok) throw new Error();
      setApiStatus("Online");
    } catch {
      setApiStatus("Offline");
    }
  };

  useEffect(() => {
    checkApi();
  }, []);

  const scanApp = async (event) => {
    event.preventDefault();
    setAppError("");
    setAppResult(null);
    setAppLoading(true);
    try {
      const response = await fetch(`${API}/apps/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appForm),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.detail || "App scan failed");
      setAppResult(payload.data);
    } catch (error) {
      setAppError(`${error.message}. Make sure the NEXORA backend is running on port 8000.`);
    } finally {
      setAppLoading(false);
    }
  };

  const scanSocial = async (event) => {
    event.preventDefault();
    setSocialError("");
    setSocialResult(null);
    setSocialLoading(true);
    try {
      const response = await fetch(`${API}/social/scan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(socialForm),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.detail || "Social scan failed");
      setSocialResult(payload);
    } catch (error) {
      setSocialError(`${error.message}. Make sure the NEXORA backend is running on port 8000.`);
    } finally {
      setSocialLoading(false);
    }
  };

  const updateApp = (key, value) => setAppForm((old) => ({ ...old, [key]: value }));
  const updateSocial = (key, value) => setSocialForm((old) => ({ ...old, [key]: value }));

  const updatePublicProfile = (which, key, value) => setPublicCompare((old) => ({ ...old, [which]: { ...old[which], [key]: value } }));
  const comparePublicProfiles = async (event) => {
    event.preventDefault(); setPublicCompareError(""); setPublicCompareResult(null); setPublicCompareLoading(true);
    const cleanProfile = (profile) => ({ ...profile, followers: profile.followers === "" ? null : Number(profile.followers), following: profile.following === "" ? null : Number(profile.following), posts: profile.posts === "" ? null : Number(profile.posts) });
    try {
      const response = await fetch(`${API}/social/compare`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ platform: "Instagram", profile_a: cleanProfile(publicCompare.profile_a), profile_b: cleanProfile(publicCompare.profile_b) }) });
      const payload = await response.json(); if (!response.ok) throw new Error(payload.detail ? JSON.stringify(payload.detail) : "Comparison failed"); setPublicCompareResult(payload);
    } catch (error) { setPublicCompareError(`${error.message}. Make sure the NEXORA backend is running on port 8000.`); }
    finally { setPublicCompareLoading(false); }
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="brand-title">NEXORA</div>
          <div className="brand-subtitle">Digital Risk Protection Platform</div>
        </div>
        <div className="api-pill">
          <span className={apiStatus === "Online" ? "dot online" : "dot"} />
          API {apiStatus}
        </div>
      </header>

      <nav className="nav-tabs">
        <button className={activeTab === "dashboard" ? "active" : ""} onClick={() => setActiveTab("dashboard")}>Dashboard</button>
        <button className={activeTab === "apps" ? "active" : ""} onClick={() => setActiveTab("apps")}>App Risk Scanner</button>
        <button className={activeTab === "social" ? "active" : ""} onClick={() => setActiveTab("social")}>Social Account Scanner</button>
      </nav>

      {activeTab === "dashboard" && (
        <main>
          <section className="hero">
            <div>
              <span className="eyebrow">DIGITAL RISK PROTECTION</span>
              <h1>Monitor brands, apps and social identities.</h1>
              <p>Use NEXORA to inspect app risk indicators and detect possible social impersonation from one dashboard.</p>
            </div>
            <div className="hero-actions">
              <button className="primary" onClick={() => setActiveTab("apps")}>Scan an App</button>
              <button className="secondary" onClick={() => setActiveTab("social")}>Check Social Account</button>
            </div>
          </section>

          <section className="stats-grid">
            <div className="card"><span>Total Brands</span><strong>{brands.length}</strong></div>
            <div className="card"><span>Trusted Brands</span><strong>{brands.filter((b) => b.trusted).length}</strong></div>
            <div className="card"><span>Official Apps</span><strong>{totalApps}</strong></div>
            <div className="card"><span>Verified Accounts</span><strong>{totalAccounts}</strong></div>
          </section>

          <section className="scanner-shortcuts">
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h2>App Risk Scanner</h2>
              <p>Enter app identity details and send them to the NEXORA app-detection engine.</p>
              <button className="primary full" onClick={() => setActiveTab("apps")}>Open App Scanner</button>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👤</div>
              <h2>Social Account Scanner</h2>
              <p>Compare a candidate account against an official profile and inspect impersonation signals.</p>
              <button className="primary full" onClick={() => setActiveTab("social")}>Open Social Scanner</button>
            </div>
          </section>

          <section className="brand-section">
            <div className="section-heading">
              <div><span className="eyebrow">KNOWN ENTITIES</span><h2>Brand Profiles</h2></div>
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search brand..." />
            </div>
            <div className="brand-grid">
              {filteredBrands.map((brand) => (
                <div className="brand-card" key={brand.id}>
                  <img src={brand.logo} alt={brand.name} />
                  <h2>{brand.name}</h2>
                  <ResultBadge label="✓ Trusted Brand" tone="safe" />
                  <p>{brand.description}</p>
                  <hr />
                  <p>📱 Official Apps: {brand.apps}</p>
                  <p>🌐 Official Accounts: {brand.social}</p>
                  <button className="secondary full" onClick={() => setActiveTab("apps")}>Scan Related App</button>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {activeTab === "apps" && (
        <main className="scanner-page">
          <section className="page-heading">
            <span className="eyebrow">APP SECURITY</span>
            <h1>App Risk Scanner</h1>
            <p>Analyze an app using its name, developer, package ID and description. The backend returns the risk indicators it can determine from its current data sources.</p>
          </section>
          <div className="scanner-layout">
            <form className="form-card" onSubmit={scanApp}>
              <h2>App details</h2>
              <label>App name<input required value={appForm.app_name} onChange={(e) => updateApp("app_name", e.target.value)} placeholder="e.g. WhatsApp" /></label>
              <label>Developer<input required value={appForm.developer} onChange={(e) => updateApp("developer", e.target.value)} placeholder="e.g. Meta Platforms, Inc." /></label>
              <label>Package ID<input required value={appForm.package_id} onChange={(e) => updateApp("package_id", e.target.value)} placeholder="e.g. com.whatsapp" /></label>
              <label>Description<textarea value={appForm.description} onChange={(e) => updateApp("description", e.target.value)} placeholder="Paste the app description or store text if available." /></label>
              <button className="primary full" disabled={appLoading}>{appLoading ? "Scanning..." : "Scan App"}</button>
              {appError && <div className="error-box">{appError}</div>}
            </form>
            <div className="result-card">
              <h2>Scan result</h2>
              {!appResult && <div className="empty-state">Enter the app details and click <b>Scan App</b>.</div>}
              {appResult && (
                <>
                  <div className="result-header">
                    <div><span className="muted">App</span><h2>{appResult.scanned_app || appForm.app_name}</h2></div>
                    <ResultBadge
                      label={appResult.status || appResult.risk_level || "ANALYZED"}
                      tone={appResult.status === "OFFICIAL" ? "safe" : appResult.status === "SUSPICIOUS" || appResult.risk_level === "HIGH" ? "danger" : "warning"}
                    />
                  </div>
                  {appResult.target_brand && (
                    <div className="match-summary">
                      <div><span className="muted">Matched official brand</span><strong>{appResult.target_brand}</strong></div>
                      <div><span className="muted">Official package</span><code>{appResult.matched_package_id}</code></div>
                      <div><span className="muted">Confidence</span><strong>{appResult.confidence ?? "N/A"}%</strong></div>
                    </div>
                  )}
                  <div className="score-box"><span>Risk score</span><strong>{appResult.risk_score ?? appResult.score ?? "N/A"}</strong></div>
                  <pre className="json-box">{JSON.stringify(appResult, null, 2)}</pre>
                  <p className="disclaimer">{appResult.verification_note || "A scan result is a risk assessment, not a guarantee that an app is fake or genuine. Verify the official store listing, developer identity and APK signature before trusting an app."}</p>
                </>
              )}
            </div>
          </div>
        </main>
      )}

      {activeTab === "social" && (
        <main className="scanner-page">
          <section className="page-heading">
            <span className="eyebrow">IDENTITY PROTECTION · INSTAGRAM</span>
            <h1>Public Profile Comparison</h1>
            <p>Compare two public Instagram profiles using details you can see. NEXORA does not log in to Instagram or scrape profiles; only details you enter are analyzed.</p>
          </section>
          <form className="social-form" onSubmit={comparePublicProfiles}>
            {[['profile_a','Profile A'],['profile_b','Profile B']].map(([which,title]) => (
              <div className="form-column" key={which}>
                <h2>{title}</h2>
                <label>Username *<input required value={publicCompare[which].username} onChange={(e) => updatePublicProfile(which,'username',e.target.value.replace(/^@/,''))} placeholder="username" /></label>
                <label>Profile URL (optional)<input value={publicCompare[which].profile_url} onChange={(e) => updatePublicProfile(which,'profile_url',e.target.value)} placeholder="https://www.instagram.com/username/" /></label>
                <label>Display name<input value={publicCompare[which].display_name} onChange={(e) => updatePublicProfile(which,'display_name',e.target.value)} placeholder="Name shown on profile" /></label>
                <label>Bio<textarea value={publicCompare[which].bio} onChange={(e) => updatePublicProfile(which,'bio',e.target.value)} placeholder="Public bio text" /></label>
                <label>Followers<input type="number" min="0" value={publicCompare[which].followers} onChange={(e) => updatePublicProfile(which,'followers',e.target.value)} placeholder="If visible" /></label>
                <label>Following<input type="number" min="0" value={publicCompare[which].following} onChange={(e) => updatePublicProfile(which,'following',e.target.value)} placeholder="If visible" /></label>
                <label>Posts<input type="number" min="0" value={publicCompare[which].posts} onChange={(e) => updatePublicProfile(which,'posts',e.target.value)} placeholder="If visible" /></label>
                <label className="check-label"><input type="checkbox" checked={publicCompare[which].verified_badge_observed} onChange={(e) => updatePublicProfile(which,'verified_badge_observed',e.target.checked)} /> I can see a verification badge</label>
                <label className="check-label"><input type="checkbox" checked={publicCompare[which].linked_from_official_website} onChange={(e) => updatePublicProfile(which,'linked_from_official_website',e.target.checked)} /> I independently found this profile linked from the person's/brand's official website</label>
              </div>
            ))}
            <div className="compare-submit"><button className="primary full" disabled={publicCompareLoading}>{publicCompareLoading ? "Comparing public evidence…" : "Compare Profiles"}</button>{publicCompareError && <div className="error-box">{publicCompareError}</div>}</div>
          </form>
          {publicCompareResult && (
            <section className="social-result">
              <div className="result-header"><div><span className="muted">Instagram · evidence-based heuristic</span><h2>Comparison results</h2></div><ResultBadge label={`Confidence: ${publicCompareResult.confidence}`} tone={publicCompareResult.confidence === "moderate" ? "warning" : "neutral"} /></div>
              <div className="verdict-grid">
                {[['profile_a','PROFILE A'],['profile_b','PROFILE B']].map(([key,title]) => { const profile = publicCompareResult[key]; return <div className={`verdict-card ${profile.risk_score >= 35 ? "suspicious" : "unclear"}`} key={key}><span className="muted">{title}</span><h3>{profile.verdict}</h3><p>@{profile.username}</p><div className="metric"><span>Heuristic risk indicator (not probability)</span><strong>{profile.risk_score}/100</strong></div><h4>Reasons</h4><ul className="reason-list">{(profile.reasons.length ? profile.reasons : ["No strong suspicious signals found in the entered details."]).map((reason,i)=><li key={i}>{reason}</li>)}</ul>{profile.supporting_evidence.length > 0 && <><h4>Supporting evidence reported</h4><ul className="reason-list">{profile.supporting_evidence.map((reason,i)=><li key={i}>{reason}</li>)}</ul></>}</div>; })}
              </div>
              <h3>Comparison notes</h3><ul className="reason-list">{publicCompareResult.comparison_reasons.map((r,i)=><li key={i}>{r}</li>)}</ul>
              <h3>Limitations & next checks</h3><ul className="reason-list">{publicCompareResult.limitations.map((r,i)=><li key={i}>{r}</li>)}</ul>
              <p className="disclaimer">This tool does not independently fetch or verify Instagram data. Checkbox selections and counts are user-reported, not validated. If neither profile has trustworthy external evidence, the correct result may be “Insufficient evidence”—not a guess.</p>
            </section>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
