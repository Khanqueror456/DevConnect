import { useState } from "react";
import Navbar from "../components/Navbar"

// ── STATIC DATA ───────────────────────────────────────────────────────────────

const USER = {
  name: "John Doe",
  headline: "Full Stack Engineer · Open to Work",
  location: "Bengaluru, India",
  company: "Razorpay",
  college: "IIT Bombay",
  connections: 247,
  followers: 1284,
  avatar: "JD",
  avatarStyle: { background: "linear-gradient(135deg, #2563eb, #06b6d4)" },
  about:
    "Passionate full-stack engineer with 4+ years building scalable products. I love working at the intersection of great UX and robust backend architecture. Currently exploring distributed systems and contributing to open source in my spare time.",
  skills: [
    { label: "React",      color: "cyan"   },
    { label: "Node.js",    color: "green"  },
    { label: "TypeScript", color: "blue"   },
    { label: "PostgreSQL", color: "purple" },
    { label: "Docker",     color: "cyan"   },
    { label: "AWS",        color: "green"  },
    { label: "GraphQL",    color: "purple" },
    { label: "Redis",      color: "blue"   },
    { label: "Kubernetes", color: "cyan"   },
    { label: "Go",         color: "green"  },
  ],
};

const EXPERIENCE = [
  {
    id: 1,
    role: "Senior Full Stack Engineer",
    company: "Razorpay",
    period: "Jan 2023 – Present",
    duration: "1 yr 10 mos",
    location: "Bengaluru, India · Hybrid",
    desc: "Leading development of the payments dashboard serving 5M+ merchants. Architected a real-time analytics pipeline using Kafka and ClickHouse, reducing query latency by 60%.",
    logoStyle: { background: "linear-gradient(135deg, #2563eb, #1d4ed8)" },
    logoText: "R",
  },
  {
    id: 2,
    role: "Full Stack Developer",
    company: "Swiggy",
    period: "Jun 2021 – Dec 2022",
    duration: "1 yr 7 mos",
    location: "Bengaluru, India · On-site",
    desc: "Built and maintained consumer-facing order tracking features in React. Improved page load performance by 40% through code-splitting and lazy loading strategies.",
    logoStyle: { background: "linear-gradient(135deg, #f97316, #dc2626)" },
    logoText: "S",
  },
  {
    id: 3,
    role: "Frontend Intern",
    company: "HasGeek",
    period: "Jan 2021 – May 2021",
    duration: "5 mos",
    location: "Remote",
    desc: "Developed reusable UI component library used across 3 products. Migrated legacy jQuery codebase to modern React with TypeScript.",
    logoStyle: { background: "linear-gradient(135deg, #7c3aed, #4c1d95)" },
    logoText: "H",
  },
];

const EDUCATION = [
  {
    id: 1,
    degree: "B.Tech, Computer Science",
    school: "IIT Bombay",
    period: "2017 – 2021",
    desc: "Graduated with Honours. Member of the Web & Coding Club. Published a paper on distributed caching strategies.",
    logoStyle: { background: "linear-gradient(135deg, #0891b2, #0e7490)" },
    logoText: "IIT",
  },
  {
    id: 2,
    degree: "Class XII – CBSE",
    school: "Delhi Public School, R.K. Puram",
    period: "2015 – 2017",
    desc: "Science stream with 96.4%. School topper in Computer Science.",
    logoStyle: { background: "linear-gradient(135deg, #059669, #047857)" },
    logoText: "DPS",
  },
];

const PROJECTS = [
  {
    id: 1,
    name: "OpenMetrics",
    desc: "An open-source observability platform for microservices. Built with Go, Prometheus, and a React dashboard. 1.2k GitHub stars.",
    tags: [{ label: "Go", color: "cyan" }, { label: "React", color: "blue" }, { label: "Open Source", color: "green" }],
  },
  {
    id: 2,
    name: "DevSync",
    desc: "Real-time collaborative code editor with execution support. WebSocket-based syncing with Y.js CRDTs for conflict-free editing.",
    tags: [{ label: "WebSocket", color: "purple" }, { label: "Node.js", color: "green" }, { label: "TypeScript", color: "blue" }],
  },
  {
    id: 3,
    name: "QueryCraft",
    desc: "AI-powered SQL query builder using GPT-4 with schema awareness. Used by 400+ developers.",
    tags: [{ label: "AI/ML", color: "purple" }, { label: "PostgreSQL", color: "cyan" }, { label: "Python", color: "blue" }],
  },
];

const ACTIVITY = [
  {
    id: 1,
    text: "Just shipped a major perf improvement to our payments dashboard — 60% faster query times using ClickHouse. Thread on how we did it 🧵",
    time: "2 days ago",
    likes: 142,
    comments: 34,
  },
  {
    id: 2,
    text: "Hot take: most microservices architectures are premature optimisation. Monoliths done right scale further than you think. Change my mind 👇",
    time: "5 days ago",
    likes: 311,
    comments: 89,
  },
];

const ALSO_VIEWED = [
  { name: "Rajan Maurya",     role: "Engineering Manager",   init: "RM", style: { background: "linear-gradient(135deg,#059669,#0891b2)" } },
  { name: "Priya K.",         role: "AI/ML Lead @ Microsoft", init: "PK", style: { background: "linear-gradient(135deg,#7c3aed,#db2777)" } },
  { name: "Dev Patel",        role: "Full Stack @ Razorpay",  init: "DP", style: { background: "linear-gradient(135deg,#2563eb,#06b6d4)" } },
];

// ── COLOUR MAP (inline styles only – avoids Tailwind purge) ───────────────────

const TAG_COLORS = {
  blue:   { background: "rgba(59,130,246,0.12)",  border: "1px solid rgba(59,130,246,0.28)",  color: "#60a5fa" },
  purple: { background: "rgba(139,92,246,0.12)",  border: "1px solid rgba(139,92,246,0.28)",  color: "#a78bfa" },
  cyan:   { background: "rgba(6,182,212,0.12)",   border: "1px solid rgba(6,182,212,0.28)",   color: "#22d3ee" },
  green:  { background: "rgba(16,185,129,0.12)",  border: "1px solid rgba(16,185,129,0.28)",  color: "#34d399" },
};

// ── SMALL REUSABLE PIECES ─────────────────────────────────────────────────────

function Tag({ label, color }) {
  return (
    <span className="text-xs font-semibold px-3 py-1 rounded-full" style={TAG_COLORS[color]}>
      {label}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return <h3 className="text-base font-bold mb-4" style={{ color: "#f1f5f9" }}>{children}</h3>;
}

function Rule() {
  return <div className="my-4" style={{ height: 1, backgroundColor: "rgba(255,255,255,0.06)" }} />;
}

function SideLabel({ children }) {
  return (
    <p className="text-[0.65rem] font-bold uppercase tracking-widest mb-3" style={{ color: "#4b5563" }}>
      {children}
    </p>
  );
}

const TABS = ["About", "Experience", "Education", "Projects", "Activity"];

// ── MAIN ──────────────────────────────────────────────────────────────────────

export default function Profile() {
  const [activeTab, setActiveTab]   = useState("About");
  const [isEditing, setIsEditing]   = useState(false);
  const [headline, setHeadline]     = useState(USER.headline);
  const [aboutText, setAboutText]   = useState(USER.about);
  const [followed, setFollowed]     = useState(false);
  const [connected, setConnected]   = useState(false);

  return (
    <div
      className="min-h-screen text-slate-100"
      style={{
        backgroundColor: "#0a0f1e",
        backgroundImage:
          "radial-gradient(ellipse 60% 40% at 75% -5%, rgba(59,130,246,0.09) 0%, transparent 55%)," +
          "radial-gradient(ellipse 35% 40% at 5% 90%, rgba(139,92,246,0.07) 0%, transparent 50%)",
      }}
    >
      {/* NAV */}
      
      <Navbar/>
      {/* PAGE GRID */}
      <div className="mx-auto max-w-5xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-5 items-start">

        {/* ── LEFT ── */}
        <div className="flex flex-col gap-4">

          {/* HERO */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}>

            {/* Banner */}
            <div
              className="h-28 relative"
              style={{ background: "linear-gradient(135deg, #0c1a3a 0%, #0f172a 45%, #1a0a3a 100%)" }}
            >
              {/* subtle grid overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(99,179,237,0.06) 1px,transparent 1px)," +
                    "linear-gradient(90deg,rgba(99,179,237,0.06) 1px,transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute top-3 right-3 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
                style={{
                  backgroundColor: isEditing ? "#3b82f6" : "rgba(255,255,255,0.07)",
                  color: isEditing ? "#fff" : "#94a3b8",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {isEditing ? "✓ Save" : "✏ Edit Profile"}
              </button>
            </div>

            {/* Avatar + info */}
            <div className="px-6 pb-6">
              <div className="flex items-end justify-between -mt-10 mb-3">
                {/* Avatar */}
                <div className="relative">
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-bold text-2xl"
                    style={{ ...USER.avatarStyle, border: "3px solid #111827" }}
                  >
                    {USER.avatar}
                  </div>
                  <span
                    className="absolute bottom-1 right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#34d399", border: "2px solid #111827" }}
                  />
                </div>
                {/* Action buttons */}
                <div className="flex gap-2 mb-1">
                  <button
                    onClick={() => setConnected(!connected)}
                    className="text-xs font-semibold px-4 py-1.5 rounded-lg transition-all"
                    style={
                      connected
                        ? { backgroundColor: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.28)" }
                        : { backgroundColor: "#3b82f6", color: "#fff" }
                    }
                  >
                    {connected ? "✓ Connected" : "+ Connect"}
                  </button>
                  <button
                    onClick={() => setFollowed(!followed)}
                    className="text-xs font-semibold px-4 py-1.5 rounded-lg transition-all"
                    style={
                      followed
                        ? { backgroundColor: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }
                        : { backgroundColor: "rgba(255,255,255,0.06)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }
                    }
                  >
                    {followed ? "✓ Following" : "Follow"}
                  </button>
                  <button
                    className="text-xs font-semibold px-4 py-1.5 rounded-lg"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    Message
                  </button>
                </div>
              </div>

              <h1 className="text-xl font-bold" style={{ color: "#f1f5f9" }}>{USER.name}</h1>

              {isEditing ? (
                <input
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="mt-1 w-full text-sm rounded-lg px-3 py-1.5 outline-none"
                  style={{ backgroundColor: "#1a2235", border: "1px solid rgba(59,130,246,0.35)", color: "#f1f5f9" }}
                />
              ) : (
                <p className="text-sm mt-0.5" style={{ color: "#94a3b8" }}>{headline}</p>
              )}

              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-2">
                {[
                  ["📍", USER.location],
                  ["🏢", USER.company],
                  ["🎓", USER.college],
                ].map(([icon, val]) => (
                  <span key={val} className="text-xs" style={{ color: "#4b5563" }}>
                    {icon} {val}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-6 mt-4 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  ["Connections", USER.connections,                "#60a5fa"],
                  ["Followers",   USER.followers.toLocaleString(), "#34d399"],
                  ["Posts",       "18",                            "#a78bfa"],
                  ["Projects",    PROJECTS.length,                 "#22d3ee"],
                ].map(([label, val, col]) => (
                  <div key={label} className="text-center">
                    <p className="text-base font-bold" style={{ color: col }}>{val}</p>
                    <p className="text-[0.65rem]" style={{ color: "#4b5563" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* TABS */}
          <div
            className="rounded-2xl p-1 flex gap-1"
            style={{ backgroundColor: "#111827", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 text-xs font-semibold py-2 rounded-xl transition-all"
                style={
                  activeTab === tab
                    ? { backgroundColor: "#1e3a5f", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.3)" }
                    : { color: "#64748b" }
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── ABOUT ── */}
          {activeTab === "About" && (
            <Card>
              <CardTitle>About</CardTitle>
              {isEditing ? (
                <textarea
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  rows={4}
                  className="w-full text-sm rounded-lg px-3 py-2 outline-none resize-none"
                  style={{ backgroundColor: "#1a2235", border: "1px solid rgba(59,130,246,0.3)", color: "#cbd5e1" }}
                />
              ) : (
                <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{aboutText}</p>
              )}
              <Rule />
              <CardTitle>Skills</CardTitle>
              <div className="flex flex-wrap gap-2">
                {USER.skills.map((s) => <Tag key={s.label} {...s} />)}
              </div>
            </Card>
          )}

          {/* ── EXPERIENCE ── */}
          {activeTab === "Experience" && (
            <Card>
              <CardTitle>Experience</CardTitle>
              <div className="flex flex-col gap-5">
                {EXPERIENCE.map((exp, idx) => (
                  <div key={exp.id}>
                    <div className="flex gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={exp.logoStyle}
                      >
                        {exp.logoText}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{exp.role}</p>
                        <p className="text-xs font-medium mt-0.5" style={{ color: "#60a5fa" }}>{exp.company}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>
                          {exp.period} · {exp.duration}
                        </p>
                        <p className="text-xs" style={{ color: "#4b5563" }}>{exp.location}</p>
                        <p className="text-xs mt-2 leading-relaxed" style={{ color: "#94a3b8" }}>{exp.desc}</p>
                      </div>
                    </div>
                    {idx < EXPERIENCE.length - 1 && <Rule />}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ── EDUCATION ── */}
          {activeTab === "Education" && (
            <Card>
              <CardTitle>Education</CardTitle>
              <div className="flex flex-col gap-5">
                {EDUCATION.map((edu, idx) => (
                  <div key={edu.id}>
                    <div className="flex gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-[0.6rem] flex-shrink-0"
                        style={edu.logoStyle}
                      >
                        {edu.logoText}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{edu.degree}</p>
                        <p className="text-xs font-medium mt-0.5" style={{ color: "#60a5fa" }}>{edu.school}</p>
                        <p className="text-xs mt-0.5" style={{ color: "#4b5563" }}>{edu.period}</p>
                        <p className="text-xs mt-2 leading-relaxed" style={{ color: "#94a3b8" }}>{edu.desc}</p>
                      </div>
                    </div>
                    {idx < EDUCATION.length - 1 && <Rule />}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ── PROJECTS ── */}
          {activeTab === "Projects" && (
            <div className="flex flex-col gap-3">
              {PROJECTS.map((proj) => (
                <Card key={proj.id}>
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-bold" style={{ color: "#f1f5f9" }}>{proj.name}</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: "#94a3b8" }}>{proj.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {proj.tags.map((t) => <Tag key={t.label} {...t} />)}
                      </div>
                    </div>
                    <a
                      href="#"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 transition-all"
                      style={{ backgroundColor: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}
                    >
                      View →
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ── ACTIVITY ── */}
          {activeTab === "Activity" && (
            <div className="flex flex-col gap-3">
              {ACTIVITY.map((post) => (
                <Card key={post.id}>
                  <div className="flex gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                      style={USER.avatarStyle}
                    >
                      {USER.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold" style={{ color: "#f1f5f9" }}>{USER.name}</p>
                        <span className="text-xs" style={{ color: "#4b5563" }}>{post.time}</span>
                      </div>
                      <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "#94a3b8" }}>{post.text}</p>
                      <div className="flex gap-4 mt-3">
                        <span className="text-xs" style={{ color: "#4b5563" }}>👍 {post.likes}</span>
                        <span className="text-xs" style={{ color: "#4b5563" }}>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="hidden lg:flex flex-col gap-4">

          {/* Profile strength */}
          <Card>
            <SideLabel>Profile Strength</SideLabel>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold" style={{ color: "#f1f5f9" }}>All-Star</span>
              <span className="text-xs font-bold" style={{ color: "#34d399" }}>82%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "#1a2235" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: "82%", background: "linear-gradient(90deg, #059669, #22d3ee)" }}
              />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {[
                ["✓", "Photo uploaded",     true ],
                ["✓", "Headline added",     true ],
                ["✓", "Skills listed",      true ],
                ["○", "Add certifications", false],
                ["○", "Get 5 endorsements", false],
              ].map(([icon, label, done]) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: done ? "#34d399" : "#4b5563" }}>{icon}</span>
                  <span className="text-xs" style={{ color: done ? "#94a3b8" : "#4b5563" }}>{label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Open to Work */}
          <Card>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#34d399" }} />
              <p className="text-xs font-bold" style={{ color: "#34d399" }}>Open to Work</p>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#94a3b8" }}>
              Looking for Senior SWE or Staff Engineer roles. Interested in fintech, dev tooling, and infrastructure.
            </p>
            <button
              className="mt-3 w-full text-xs font-semibold py-2 rounded-lg"
              style={{ backgroundColor: "rgba(52,211,153,0.1)", color: "#34d399", border: "1px solid rgba(52,211,153,0.25)" }}
            >
              Edit Preferences
            </button>
          </Card>

          {/* People also viewed */}
          <Card>
            <SideLabel>People Also Viewed</SideLabel>
            {ALSO_VIEWED.map((p, idx) => (
              <div
                key={p.name}
                className="flex items-center gap-2.5 py-2.5"
                style={idx < ALSO_VIEWED.length - 1 ? { borderBottom: "1px solid rgba(255,255,255,0.05)" } : {}}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                  style={p.style}
                >
                  {p.init}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: "#f1f5f9" }}>{p.name}</p>
                  <p className="text-[0.65rem] truncate" style={{ color: "#4b5563" }}>{p.role}</p>
                </div>
              </div>
            ))}
          </Card>

          {/* Recent activity */}
          <Card>
            <SideLabel>Recent Activity</SideLabel>
            <div className="flex justify-between text-center">
              {[["Posts", "18", "#60a5fa"], ["Likes", "423", "#a78bfa"], ["Comments", "97", "#22d3ee"]].map(([k, v, col]) => (
                <div key={k}>
                  <p className="text-sm font-bold" style={{ color: col }}>{v}</p>
                  <p className="text-[0.65rem]" style={{ color: "#4b5563" }}>{k}</p>
                </div>
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}