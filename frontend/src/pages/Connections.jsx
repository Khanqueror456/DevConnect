import { useState } from "react";

const SUGGESTIONS = [
  {
    id: 1,
    name: "Patrick Lyons",
    role: "Lead Product Manager | 5+ yrs exp.",
    initials: "PL",
    avatarStyle: { background: "linear-gradient(135deg, #2563eb, #06b6d4)" },
    bannerStyle: { background: "linear-gradient(135deg, #0c1a3a, #0f172a)" },
    tags: [{ label: "Product", color: "blue" }, { label: "Agile", color: "purple" }],
    mutual: null,
    online: false,
  },
  {
    id: 2,
    name: "Fazli Subhan",
    role: "Senior Blockchain & Web3 Specialist",
    initials: "FS",
    avatarStyle: { background: "linear-gradient(135deg, #7c3aed, #4c1d95)" },
    bannerStyle: { background: "linear-gradient(135deg, #1a0a3a, #130d2e)" },
    tags: [{ label: "Web3", color: "purple" }, { label: "Solidity", color: "cyan" }],
    mutual: null,
    online: false,
  },
  {
    id: 3,
    name: "Rajan Maurya",
    role: "Engineering Manager | Kotlin Multiplatform",
    initials: "RM",
    avatarStyle: { background: "linear-gradient(135deg, #059669, #0891b2)" },
    bannerStyle: { background: "linear-gradient(135deg, #032a1a, #042a30)" },
    tags: [{ label: "Kotlin", color: "green" }, { label: "Android", color: "blue" }],
    mutual: "Abhi +2 mutual",
    online: true,
  },
  {
    id: 4,
    name: "Yajat Pahuja",
    role: "Computer Engineer | Open to Work",
    initials: "YP",
    avatarStyle: { background: "linear-gradient(135deg, #db2777, #7c3aed)" },
    bannerStyle: { background: "linear-gradient(135deg, #1e0a30, #0f0a1e)" },
    tags: [{ label: "C++", color: "blue" }, { label: "Systems", color: "purple" }],
    mutual: null,
    online: false,
  },
  {
    id: 5,
    name: "Subham Mahato",
    role: "SDE Intern @Attack Capital (YC W22)",
    initials: "SM",
    avatarStyle: { background: "linear-gradient(135deg, #d97706, #dc2626)" },
    bannerStyle: { background: "linear-gradient(135deg, #2a1500, #2a0a0a)" },
    tags: [{ label: "React", color: "cyan" }, { label: "Node", color: "green" }],
    mutual: "Ayush is mutual",
    online: true,
  },
  {
    id: 6,
    name: "Michelle Jacob",
    role: "Senior Software Engineer | C/C++ Embedded",
    initials: "MJ",
    avatarStyle: { background: "linear-gradient(135deg, #475569, #1e293b)" },
    bannerStyle: { background: "linear-gradient(135deg, #111827, #0a0f1e)" },
    tags: [{ label: "C++", color: "blue" }, { label: "Embedded", color: "green" }],
    mutual: null,
    online: false,
  },
];

const REQUESTS = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Senior Frontend Engineer @ Swiggy",
    initials: "AS",
    avatarStyle: { background: "linear-gradient(135deg, #2563eb, #06b6d4)" },
    mutual: "Rohan and 4 mutual connections",
  },
  {
    id: 2,
    name: "Karan Mehta",
    role: "ML Engineer @ Google DeepMind",
    initials: "KM",
    avatarStyle: { background: "linear-gradient(135deg, #7c3aed, #db2777)" },
    mutual: "Priya and 11 mutual connections",
  },
  {
    id: 3,
    name: "Sofia Nguyen",
    role: "Product Designer @ Figma",
    initials: "SN",
    avatarStyle: { background: "linear-gradient(135deg, #d97706, #dc2626)" },
    mutual: "2 mutual connections",
  },
];

const MY_CONNECTIONS = [
  {
    id: 1,
    name: "Dev Patel",
    role: "Full Stack Engineer @ Razorpay",
    initials: "DP",
    avatarStyle: { background: "linear-gradient(135deg, #2563eb, #06b6d4)" },
    tags: [{ label: "React", color: "blue" }, { label: "Go", color: "cyan" }],
    online: true,
  },
  {
    id: 2,
    name: "Priya Krishnamurthy",
    role: "AI/ML Lead @ Microsoft Research",
    initials: "PK",
    avatarStyle: { background: "linear-gradient(135deg, #7c3aed, #db2777)" },
    tags: [{ label: "PyTorch", color: "purple" }, { label: "LLMs", color: "blue" }],
    online: false,
  },
  {
    id: 3,
    name: "Hitesh Agarwal",
    role: "DevOps Engineer @ Flipkart",
    initials: "HA",
    avatarStyle: { background: "linear-gradient(135deg, #059669, #0891b2)" },
    tags: [{ label: "K8s", color: "green" }, { label: "AWS", color: "cyan" }],
    online: true,
  },
  {
    id: 4,
    name: "Navaneeswar Reddy",
    role: "Software Developer @ IBM ISL",
    initials: "NR",
    avatarStyle: { background: "linear-gradient(135deg, #d97706, #ea580c)" },
    tags: [{ label: "Java", color: "blue" }, { label: "Spring", color: "green" }],
    online: false,
  },
];

const TAG_COLORS = {
  blue:   { background: "rgba(59,130,246,0.12)",  border: "1px solid rgba(59,130,246,0.28)",  color: "#60a5fa" },
  purple: { background: "rgba(139,92,246,0.12)",  border: "1px solid rgba(139,92,246,0.28)",  color: "#a78bfa" },
  cyan:   { background: "rgba(6,182,212,0.12)",   border: "1px solid rgba(6,182,212,0.28)",   color: "#22d3ee" },
  green:  { background: "rgba(16,185,129,0.12)",  border: "1px solid rgba(16,185,129,0.28)",  color: "#34d399" },
};

const FILTERS = ["All", "Frontend", "Backend", "Full Stack", "ML / AI", "DevOps", "Product"];
const COUNTS  = [247, 68, 54, 41, 33, 27, 24];

function Tag({ label, color }) {
  return (
    <span
      className="text-[0.6rem] font-semibold px-2 py-0.5 rounded-full"
      style={TAG_COLORS[color]}
    >
      {label}
    </span>
  );
}

function OnlineDot({ borderColor = "#111827" }) {
  return (
    <span
      className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
      style={{ backgroundColor: "#34d399", border: `2px solid ${borderColor}` }}
    />
  );
}

export default function Connections() {
  const [suggestions, setSuggestions]   = useState(SUGGESTIONS);
  const [requests, setRequests]         = useState(REQUESTS);
  const [connections, setConnections]   = useState(MY_CONNECTIONS);
  const [sentIds, setSentIds]           = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch]             = useState("");

  const dismissSuggestion = (id) => setSuggestions((p) => p.filter((s) => s.id !== id));
  const toggleConnect     = (id) => setSentIds((p) => p.includes(id) ? p.filter((i) => i !== id) : [...p, id]);
  const acceptRequest     = (id) => setRequests((p) => p.filter((r) => r.id !== id));
  const declineRequest    = (id) => setRequests((p) => p.filter((r) => r.id !== id));
  const removeConnection  = (id) => setConnections((p) => p.filter((c) => c.id !== id));

  const filteredConnections = connections.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="min-h-screen text-slate-100"
      style={{
        backgroundColor: "#0a0f1e",
        backgroundImage:
          "radial-gradient(ellipse 60% 40% at 80% -10%, rgba(59,130,246,0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 0% 80%, rgba(139,92,246,0.06) 0%, transparent 50%)",
      }}
    >
      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 backdrop-blur-xl"
        style={{
          backgroundColor: "rgba(10,15,30,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-14">
          <span
            className="font-bold text-lg tracking-tight bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg,#60a5fa,#22d3ee)" }}
          >
            DevConnect
          </span>
          <div className="flex items-center gap-1">
            {["Feed", "Connections", "Profile"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium px-3 py-1.5 rounded-lg transition-all"
                style={
                  link === "Connections"
                    ? {
                        color: "#f1f5f9",
                        backgroundColor: "rgba(59,130,246,0.12)",
                        border: "1px solid rgba(59,130,246,0.2)",
                      }
                    : { color: "#94a3b8" }
                }
              >
                {link}
              </a>
            ))}
            <button
              className="ml-2 text-sm font-semibold px-4 py-1.5 rounded-lg text-white"
              style={{ backgroundColor: "#3b82f6" }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* ── LAYOUT ── */}
      <div className="mx-auto max-w-6xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-5 items-start">

        {/* ── SIDEBAR ── */}
        <aside className="hidden lg:flex flex-col gap-4">

          {/* Stats card */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-widest mb-3" style={{ color: "#4b5563" }}>
              Your Network
            </p>
            {[
              ["Connections", "247", "#60a5fa"],
              ["Pending sent", "12", "#f1f5f9"],
              ["Profile views", "+38 this week", "#34d399"],
              ["Followers", "1.2k", "#f1f5f9"],
            ].map(([label, val, col], idx, arr) => (
              <div
                key={label}
                className="flex justify-between items-center py-2"
                style={idx < arr.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.06)" } : {}}
              >
                <span className="text-sm" style={{ color: "#94a3b8" }}>{label}</span>
                <span className="text-sm font-bold" style={{ color: col }}>{val}</span>
              </div>
            ))}
          </div>

          {/* Role filter */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-[0.65rem] font-bold uppercase tracking-widest mb-3" style={{ color: "#4b5563" }}>
              Filter by role
            </p>
            <div className="flex flex-col gap-0.5">
              {FILTERS.map((f, i) => {
                const active = activeFilter === f;
                return (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className="flex justify-between items-center px-3 py-2 rounded-lg text-sm text-left transition-all"
                    style={{
                      color: active ? "#60a5fa" : "#94a3b8",
                      backgroundColor: active ? "rgba(59,130,246,0.1)" : "transparent",
                    }}
                  >
                    <span>{f}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: active ? "rgba(59,130,246,0.2)" : "#1a2235",
                        color: active ? "#60a5fa" : "#6b7280",
                      }}
                    >
                      {COUNTS[i]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── MAIN ── */}
        <main className="flex flex-col gap-6">

          {/* Search */}
          <div className="relative">
            <span
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none"
              style={{ color: "#4b5563" }}
            >
              🔍
            </span>
            <input
              type="text"
              placeholder="Search connections by name, skill, or company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl pl-10 pr-4 py-3 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#111827",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "#f1f5f9",
              }}
            />
          </div>

          {/* ── PENDING REQUESTS ── */}
          {requests.length > 0 && (
            <section>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold" style={{ color: "#f1f5f9" }}>
                      Pending Requests
                    </h2>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{
                        backgroundColor: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#f87171",
                      }}
                    >
                      {requests.length} new
                    </span>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>
                    People who want to connect with you
                  </p>
                </div>
                <a href="#" className="text-xs font-medium" style={{ color: "#60a5fa" }}>See all →</a>
              </div>

              <div className="flex flex-col gap-2.5">
                {requests.map((req) => (
                  <div
                    key={req.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3.5 transition-all"
                    style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base flex-shrink-0"
                      style={req.avatarStyle}
                    >
                      {req.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "#f1f5f9" }}>{req.name}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#94a3b8" }}>{req.role}</p>
                      <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>👥 {req.mutual}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="text-xs font-semibold px-3.5 py-1.5 rounded-lg text-white transition-colors"
                        style={{ backgroundColor: "#3b82f6" }}
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => declineRequest(req.id)}
                        className="text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-colors"
                        style={{ backgroundColor: "#1a2235", color: "#94a3b8" }}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />

          {/* ── PEOPLE YOU MAY KNOW ── */}
          <section>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-base font-bold" style={{ color: "#f1f5f9" }}>People You May Know</h2>
                <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>
                  Based on your activity and mutual connections
                </p>
              </div>
              <a href="#" className="text-xs font-medium" style={{ color: "#60a5fa" }}>See all →</a>
            </div>

            {suggestions.length === 0 ? (
              <div className="text-center py-12 text-sm" style={{ color: "#4b5563" }}>
                No more suggestions right now.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {suggestions.map((s) => (
                  <div
                    key={s.id}
                    className="rounded-2xl overflow-hidden transition-all"
                    style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    {/* Banner */}
                    <div className="h-14 relative" style={s.bannerStyle}>
                      <button
                        onClick={() => dismissSuggestion(s.id)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full text-xs flex items-center justify-center transition-all"
                        style={{ backgroundColor: "rgba(0,0,0,0.55)", color: "rgba(255,255,255,0.55)" }}
                      >
                        ✕
                      </button>
                      {/* Overlapping avatar */}
                      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                        <div className="relative">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base"
                            style={{ ...s.avatarStyle, border: "3px solid #111827" }}
                          >
                            {s.initials}
                          </div>
                          {s.online && <OnlineDot />}
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="pt-7 px-3 pb-3 text-center">
                      <p className="text-sm font-bold truncate" style={{ color: "#f1f5f9" }}>{s.name}</p>
                      <p
                        className="text-xs mt-0.5 line-clamp-2 leading-snug min-h-[2rem]"
                        style={{ color: "#94a3b8" }}
                      >
                        {s.role}
                      </p>
                      <div className="flex flex-wrap justify-center gap-1 mt-2 mb-2">
                        {s.tags.map((t) => <Tag key={t.label} {...t} />)}
                      </div>
                      {s.mutual && (
                        <p className="text-[0.65rem] mb-2" style={{ color: "#4b5563" }}>{s.mutual}</p>
                      )}
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => toggleConnect(s.id)}
                          className="flex-1 text-xs font-semibold py-2 rounded-lg transition-all"
                          style={
                            sentIds.includes(s.id)
                              ? {
                                  backgroundColor: "rgba(59,130,246,0.12)",
                                  color: "#60a5fa",
                                  border: "1px solid rgba(59,130,246,0.28)",
                                }
                              : { backgroundColor: "#3b82f6", color: "#fff" }
                          }
                        >
                          {sentIds.includes(s.id) ? "✓ Sent" : "+ Connect"}
                        </button>
                        <button
                          onClick={() => dismissSuggestion(s.id)}
                          className="flex-1 text-xs font-semibold py-2 rounded-lg"
                          style={{ backgroundColor: "#1a2235", color: "#6b7280" }}
                        >
                          —
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <div style={{ height: "1px", backgroundColor: "rgba(255,255,255,0.06)" }} />

          {/* ── MY CONNECTIONS ── */}
          <section>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h2 className="text-base font-bold" style={{ color: "#f1f5f9" }}>My Connections</h2>
                <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>{connections.length} connections</p>
              </div>
              <a href="#" className="text-xs font-medium" style={{ color: "#60a5fa" }}>Manage all →</a>
            </div>

            <div className="flex flex-col gap-2">
              {filteredConnections.length === 0 ? (
                <div className="text-center py-10 text-sm" style={{ color: "#4b5563" }}>
                  No connections match your search.
                </div>
              ) : (
                filteredConnections.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
                    style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                        style={c.avatarStyle}
                      >
                        {c.initials}
                      </div>
                      {c.online && <OnlineDot />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "#f1f5f9" }}>{c.name}</p>
                      <p className="text-xs truncate" style={{ color: "#94a3b8" }}>{c.role}</p>
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {c.tags.map((t) => <Tag key={t.label} {...t} />)}
                      </div>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                        style={{
                          backgroundColor: "rgba(59,130,246,0.12)",
                          border: "1px solid rgba(59,130,246,0.2)",
                          color: "#60a5fa",
                        }}
                      >
                        Message
                      </button>
                      <button
                        onClick={() => removeConnection(c.id)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all"
                        style={{ backgroundColor: "#1a2235", color: "#6b7280" }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}