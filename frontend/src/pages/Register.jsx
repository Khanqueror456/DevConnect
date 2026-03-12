// import { useState } from "react";
// import AuthLayout from "../components/AuthLayout";
// import api from "../api/axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function Register(){

//   const [name,setName] = useState("");
//   const [email,setEmail] = useState("");
//   const [password,setPassword] = useState("");

//   const navigate = useNavigate();

//   const handleRegister = async (e)=>{
//     e.preventDefault();

//     try{
//       await api.post("/auth/register",{name,email,password});
//       navigate("/login");
//     }catch(err){
//       alert("Registration failed");
//     }
//   };

//   return(
//     <AuthLayout
//       leftContent={
//         <>
//           <h1 className="text-3xl font-bold mb-4">
//             DevConnect
//           </h1>

//           <p className="text-gray-400">
//             Connect, Collaborate, and Grow with Your Peers.
//           </p>
//         </>
//       }
//     >

//       <h2 className="text-2xl font-semibold mb-6">Create Account</h2>

//       <form onSubmit={handleRegister} className="space-y-4">

//         <input
//           placeholder="Name"
//           value={name}
//           onChange={(e)=>setName(e.target.value)}
//           className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500"
//         />

//         <input
//           placeholder="Email"
//           value={email}
//           onChange={(e)=>setEmail(e.target.value)}
//           className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e)=>setPassword(e.target.value)}
//           className="w-full bg-transparent border border-gray-600 rounded-lg px-4 py-3"
//         />

//         <button
//           className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-lg py-3 font-semibold"
//         >
//           Sign Up
//         </button>

//       </form>

//       <p className="text-sm text-gray-400 mt-4 text-center">
//         Already have an account?{" "}
//         <Link to="/login" className="text-blue-400 hover:underline">
//           Login
//         </Link>
//       </p>

//     </AuthLayout>
//   );
// }

import { useState, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "Software & Technology",
  "Fintech & Finance",
  "Healthcare & Biotech",
  "E-commerce & Retail",
  "Education & EdTech",
  "Gaming & Entertainment",
  "Cybersecurity",
  "AI & Machine Learning",
  "DevOps & Cloud",
  "Other",
];

const COUNTRIES = [
  "United States",
  "United Kingdom",
  "India",
  "Germany",
  "France",
  "Canada",
  "Australia",
  "Singapore",
  "Brazil",
  "Japan",
  "Netherlands",
  "Sweden",
  "Other",
];

const PHONE_CODES = [
  { flag: "🇺🇸", code: "+1",  label: "🇺🇸 +1" },
  { flag: "🇬🇧", code: "+44", label: "🇬🇧 +44" },
  { flag: "🇮🇳", code: "+91", label: "🇮🇳 +91" },
  { flag: "🇩🇪", code: "+49", label: "🇩🇪 +49" },
  { flag: "🇫🇷", code: "+33", label: "🇫🇷 +33" },
  { flag: "🇨🇦", code: "+1",  label: "🇨🇦 +1" },
  { flag: "🇦🇺", code: "+61", label: "🇦🇺 +61" },
  { flag: "🇸🇬", code: "+65", label: "🇸🇬 +65" },
  { flag: "🇧🇷", code: "+55", label: "🇧🇷 +55" },
  { flag: "🇯🇵", code: "+81", label: "🇯🇵 +81" },
];

// ─── Password Strength ───────────────────────────────────────────────────────

function getPasswordStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const map = {
    0: { label: "Enter a password", color: "#475569" },
    1: { label: "Weak",             color: "#ef4444" },
    2: { label: "Fair",             color: "#f97316" },
    3: { label: "Good",             color: "#eab308" },
    4: { label: "Strong",           color: "#22c55e" },
  };
  return { score, ...map[score] };
}

// ─── Small reusable components ───────────────────────────────────────────────

function InputField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  isValid,
  suffix,
}) {
  return (
    <div className="relative mb-3">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-slate-400 mb-1.5 tracking-wide"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={[
          "w-full h-[42px] bg-[#111827] rounded-lg px-3.5 text-sm text-slate-100",
          "outline-none transition-all duration-200 font-[inherit]",
          "placeholder:text-slate-600",
          error
            ? "border border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
            : isValid
            ? "border border-green-500"
            : "border border-[#1e293b] focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]",
        ].join(" ")}
      />
      {suffix && (
        <span className="absolute right-3 top-[33px] text-slate-500 cursor-pointer text-sm">
          {suffix}
        </span>
      )}
      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}

function SelectField({ label, id, value, onChange, options, placeholder }) {
  return (
    <div className="mb-3">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-slate-400 mb-1.5 tracking-wide"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={onChange}
          className={[
            "w-full h-[42px] bg-[#111827] border border-[#1e293b] rounded-lg px-3.5 text-sm",
            "outline-none appearance-none cursor-pointer transition-all duration-200 font-[inherit]",
            "focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]",
            value ? "text-slate-100" : "text-slate-600",
          ].join(" ")}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-[#111827] text-slate-100">
              {o}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

function SocialButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 h-10 flex items-center justify-center gap-2 bg-[#111827] border border-[#1e293b] rounded-lg text-slate-400 text-xs font-medium transition-all duration-200 hover:border-blue-500 hover:text-slate-200 hover:bg-[#0f172a] active:scale-95"
    >
      {icon}
      {label}
    </button>
  );
}

function StepDot({ step, current }) {
  const done = step < current;
  const active = step === current;
  return (
    <div
      className={[
        "w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 transition-all duration-300",
        done
          ? "bg-green-500 border-2 border-green-500 text-white"
          : active
          ? "bg-[#0d1524] border-2 border-blue-500 text-blue-400"
          : "bg-[#0d1524] border-2 border-[#1e293b] text-slate-600",
      ].join(" ")}
    >
      {done ? (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path
            d="M1 4l3 3 5-6"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        step
      )}
    </div>
  );
}

// ─── Google SVG ──────────────────────────────────────────────────────────────

const GoogleIcon = () => (
  <svg viewBox="0 0 18 18" width="16" height="16">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" />
    <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" />
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" fill="#e2e8f0">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

// ─── Main Component ──────────────────────────────────────────────────────────

export default function Register() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef(null);

  // ── Form state ──
  const [form, setForm] = useState({
    firstName:   "",
    lastName:    "",
    email:       "",
    password:    "",
    jobTitle:    "",
    industry:    "",
    phoneCode:   "+1",
    phone:       "",
    country:     "",
    agreeTerms:  false,
    agreeMarketing: false,
    agreeRecruiter: false,
  });

  // ── Validation errors ──
  const [errors, setErrors] = useState({});

  const set = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const toggle = (key) => () =>
    setForm((f) => ({ ...f, [key]: !f[key] }));

  // ── Validators ──
  const validateStep1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim())  e.lastName  = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    if (!form.agreeTerms) {
      setErrors({ terms: "You must agree to the Terms of Service" });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 3) {
      if (!validateStep3()) return;
      handleSubmit();
      return;
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = () => {
    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1400);
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const strength = getPasswordStrength(form.password);
  const progressPct = submitted ? 100 : ((step - 1) / 3) * 100 + 33;

  // ── Email / field validity for border coloring ──
  const emailValid =
    form.email.length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#080e1a", fontFamily: "'Inter', sans-serif", color: "#e2e8f0" }}
    >
      {/* ── Left panel ── */}
      <div className="flex-1 hidden lg:flex flex-col justify-center px-20 py-16 relative overflow-hidden">
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(#4a9eff 1px,transparent 1px),linear-gradient(90deg,#4a9eff 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 20% 50%,rgba(26,58,110,0.18),transparent),radial-gradient(ellipse 60% 60% at 80% 20%,rgba(13,43,85,0.14),transparent)",
          }}
        />

        {/* Logo */}
        <div
          className="text-2xl font-bold mb-16 relative z-10 tracking-tight"
          style={{ fontFamily: "'Sora', sans-serif" }}
        >
          Dev<span className="text-blue-500">Connect</span>
        </div>

        {/* Hero */}
        <div className="relative z-10 max-w-lg">
          <p className="text-xs font-semibold text-blue-500 tracking-[2px] uppercase mb-4">
            Professional Network
          </p>
          <h1
            className="text-5xl font-bold leading-tight text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Where Developers
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#3b82f6,#60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Build Together
            </span>
          </h1>
          <p className="text-[15px] text-slate-400 leading-relaxed mb-12">
            Connect with 2M+ engineers, discover open-source projects,
            share your expertise, and land your next opportunity.
          </p>

          {/* Stats */}
          <div className="flex gap-10">
            {[
              ["2M+",  "Developers"],
              ["140K+","Companies"],
              ["850K+","Projects"],
            ].map(([num, label]) => (
              <div key={label} className="flex flex-col gap-1">
                <span
                  className="text-2xl font-bold text-white"
                  style={{ fontFamily: "'Sora', sans-serif" }}
                >
                  {num}
                </span>
                <span className="text-xs text-slate-600">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div
        className="w-full lg:w-[480px] min-h-screen flex items-center justify-center py-10 px-8"
        style={{ background: "#0d1524", borderLeft: "1px solid #1e293b" }}
      >
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div
            className="text-2xl font-bold mb-6 lg:hidden tracking-tight"
            style={{ fontFamily: "'Sora', sans-serif" }}
          >
            Dev<span className="text-blue-500">Connect</span>
          </div>

          {!submitted && (
            <>
              <h2
                className="text-[22px] font-bold text-slate-100 mb-1"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Create your account
              </h2>
              <p className="text-[13px] text-slate-600 mb-7">
                Join the world's largest developer community
              </p>

              {/* Step indicators */}
              <div className="flex items-center mb-5">
                {[1, 2, 3].map((s, i) => (
                  <div key={s} className="flex items-center flex-1 last:flex-none">
                    <div className="flex items-center gap-2">
                      <StepDot step={s} current={step} />
                      <span
                        className={[
                          "text-[11px] whitespace-nowrap",
                          s === step ? "text-blue-400" : "text-slate-600",
                        ].join(" ")}
                      >
                        {["Account", "Profile", "Finish"][i]}
                      </span>
                    </div>
                    {i < 2 && (
                      <div
                        className="h-px mx-2 flex-1 transition-all duration-300"
                        style={{
                          background: s < step ? "#22c55e" : "#1e293b",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-[3px] rounded-full" style={{ background: "#1e293b" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${progressPct}%`,
                      background: "linear-gradient(90deg,#2563eb,#3b82f6)",
                    }}
                  />
                </div>
                <span className="text-[11px] text-slate-500 whitespace-nowrap">
                  Step {step} of 3
                </span>
              </div>
            </>
          )}

          {/* ─── STEP 1 ─── */}
          {step === 1 && !submitted && (
            <div>
              {/* Social buttons */}
              <div className="flex gap-2.5 mb-5">
                <SocialButton icon={<GoogleIcon />} label="Google" onClick={() => {}} />
                <SocialButton icon={<GitHubIcon />} label="GitHub" onClick={() => {}} />
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px" style={{ background: "#1e293b" }} />
                <span className="text-[11px] text-slate-500">or sign up with email</span>
                <div className="flex-1 h-px" style={{ background: "#1e293b" }} />
              </div>

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <InputField
                  label="First name"
                  id="firstName"
                  placeholder="John"
                  value={form.firstName}
                  onChange={set("firstName")}
                  error={errors.firstName}
                  isValid={form.firstName.trim().length > 0}
                />
                <InputField
                  label="Last name"
                  id="lastName"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={set("lastName")}
                  error={errors.lastName}
                  isValid={form.lastName.trim().length > 0}
                />
              </div>

              <InputField
                label="Email address"
                id="email"
                type="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={set("email")}
                error={errors.email}
                isValid={emailValid}
              />

              {/* Password */}
              <div className="relative mb-3">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-slate-400 mb-1.5 tracking-wide"
                >
                  Password
                </label>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={form.password}
                  onChange={set("password")}
                  className={[
                    "w-full h-[42px] bg-[#111827] rounded-lg px-3.5 pr-10 text-sm text-slate-100",
                    "outline-none transition-all duration-200 font-[inherit] placeholder:text-slate-600",
                    errors.password
                      ? "border border-red-500 shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
                      : form.password.length >= 8
                      ? "border border-green-500"
                      : "border border-[#1e293b] focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)]",
                  ].join(" ")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-[33px] text-slate-500 text-sm"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1">{errors.password}</p>
                )}
                {/* Strength */}
                {form.password.length > 0 && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="flex-1 h-[3px] rounded-full transition-all duration-300"
                          style={{
                            background:
                              i <= strength.score ? strength.color : "#1e293b",
                          }}
                        />
                      ))}
                    </div>
                    <p
                      className="text-[11px] transition-colors duration-200"
                      style={{ color: strength.color }}
                    >
                      {strength.label}
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full h-11 rounded-lg text-sm font-semibold text-white mt-1.5 transition-all duration-200 hover:-translate-y-px active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  fontFamily: "'Sora', sans-serif",
                  letterSpacing: "0.3px",
                }}
              >
                Continue →
              </button>

              <p className="text-center text-[13px] text-slate-600 mt-5">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 font-medium hover:text-blue-400">
                  Sign in
                </a>
              </p>
            </div>
          )}

          {/* ─── STEP 2 ─── */}
          {step === 2 && !submitted && (
            <div>
              {/* Avatar upload */}
              <div
                className="flex items-center gap-4 p-3 rounded-xl border border-dashed border-[#1e293b] bg-[#111827] cursor-pointer mb-4 transition-all duration-200 hover:border-blue-500 group"
                onClick={() => fileRef.current?.click()}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && fileRef.current?.click()}
              >
                <div className="w-12 h-12 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth="1.5">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M6 20v-2a6 6 0 0112 0v2" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[13px] font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                    {avatarPreview ? "Change profile photo" : "Upload profile photo"}
                  </p>
                  <p className="text-[11px] text-slate-600">JPG, PNG or GIF · Max 5MB</p>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
              </div>

              <InputField
                label="Job title"
                id="jobTitle"
                placeholder="e.g. Senior Software Engineer"
                value={form.jobTitle}
                onChange={set("jobTitle")}
                isValid={form.jobTitle.trim().length > 0}
              />

              <SelectField
                label="Industry"
                id="industry"
                value={form.industry}
                onChange={set("industry")}
                options={INDUSTRIES}
                placeholder="Select your industry"
              />

              {/* Phone */}
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-400 mb-1.5 tracking-wide">
                  Phone number
                </label>
                <div className="flex gap-2">
                  <select
                    value={form.phoneCode}
                    onChange={set("phoneCode")}
                    className="w-24 h-[42px] bg-[#111827] border border-[#1e293b] rounded-lg px-2.5 text-[13px] text-slate-100 outline-none appearance-none cursor-pointer shrink-0 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] font-[inherit]"
                  >
                    {PHONE_CODES.map((p) => (
                      <option key={p.label} value={p.code} className="bg-[#111827]">
                        {p.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="800 555 0100"
                    value={form.phone}
                    onChange={set("phone")}
                    className="flex-1 h-[42px] bg-[#111827] border border-[#1e293b] rounded-lg px-3.5 text-sm text-slate-100 outline-none placeholder:text-slate-600 focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] transition-all duration-200 font-[inherit]"
                  />
                </div>
              </div>

              <SelectField
                label="Country"
                id="country"
                value={form.country}
                onChange={set("country")}
                options={COUNTRIES}
                placeholder="Select your country"
              />

              <button
                type="button"
                onClick={handleNext}
                className="w-full h-11 rounded-lg text-sm font-semibold text-white mt-1.5 transition-all duration-200 hover:-translate-y-px active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                Continue →
              </button>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full h-11 rounded-lg text-sm font-medium text-slate-400 mt-2 bg-transparent border border-[#1e293b] transition-all duration-200 hover:border-blue-500 hover:text-blue-400 hover:bg-[#0f172a]"
              >
                ← Back
              </button>
            </div>
          )}

          {/* ─── STEP 3 ─── */}
          {step === 3 && !submitted && (
            <div>
              {/* Consent checkboxes */}
              <div className="flex flex-col gap-3 mb-4">
                {[
                  {
                    key: "agreeTerms",
                    text: (
                      <>
                        I agree to the{" "}
                        <a href="/terms" className="text-blue-500 hover:text-blue-400">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-blue-500 hover:text-blue-400">
                          Privacy Policy
                        </a>
                      </>
                    ),
                  },
                  {
                    key: "agreeMarketing",
                    text: "Send me job opportunities and project recommendations from DevConnect",
                  },
                  {
                    key: "agreeRecruiter",
                    text: "I'm open to being contacted by recruiters and collaborators",
                  },
                ].map(({ key, text }) => (
                  <div
                    key={key}
                    className="flex items-start gap-2.5 cursor-pointer group"
                    onClick={toggle(key)}
                    role="checkbox"
                    aria-checked={form[key]}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === " " && toggle(key)()}
                  >
                    <div
                      className={[
                        "w-4 h-4 rounded border-[1.5px] shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200",
                        form[key]
                          ? "bg-blue-500 border-blue-500"
                          : "bg-[#111827] border-slate-700 group-hover:border-blue-500",
                      ].join(" ")}
                    >
                      {form[key] && (
                        <svg width="9" height="7" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4l3 3 5-6"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs text-slate-400 leading-relaxed">{text}</span>
                  </div>
                ))}
              </div>

              {errors.terms && (
                <p className="text-xs text-red-400 mb-3">{errors.terms}</p>
              )}

              {/* Summary card */}
              <div
                className="rounded-xl p-3.5 mb-4"
                style={{ background: "#111827", border: "1px solid #1e293b" }}
              >
                <p className="text-[11px] font-semibold text-slate-500 tracking-widest uppercase mb-3">
                  Account Summary
                </p>
                <div className="flex flex-col gap-1.5">
                  {[
                    ["Name",      `${form.firstName} ${form.lastName}`.trim() || "—"],
                    ["Email",     form.email || "—"],
                    ["Job Title", form.jobTitle || "—"],
                    ["Industry",  form.industry || "—"],
                    ["Country",   form.country  || "—"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between text-xs">
                      <span className="text-slate-600">{label}</span>
                      <span
                        className="text-slate-400 max-w-[200px] text-right truncate"
                        title={value}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                className="w-full h-11 rounded-lg text-sm font-semibold text-white mt-1.5 transition-all duration-200 hover:-translate-y-px active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
                style={{
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                {submitting ? "Creating account…" : "Create Account ✓"}
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={submitting}
                className="w-full h-11 rounded-lg text-sm font-medium text-slate-400 mt-2 bg-transparent border border-[#1e293b] transition-all duration-200 hover:border-blue-500 hover:text-blue-400 hover:bg-[#0f172a] disabled:opacity-50"
              >
                ← Back
              </button>
            </div>
          )}

          {/* ─── SUCCESS ─── */}
          {submitted && (
            <div className="text-center py-6">
              <div
                className="w-16 h-16 rounded-full border-2 border-green-500 flex items-center justify-center mx-auto mb-5 text-2xl"
                style={{ background: "#052e16" }}
              >
                ✓
              </div>
              <h2
                className="text-xl font-bold text-slate-100 mb-2"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                Welcome to DevConnect!
              </h2>
              <p className="text-[13px] text-slate-500 leading-relaxed mb-6">
                Your account has been created.
                <br />
                Check your email to verify and get started.
              </p>
              <a
                href="/dashboard"
                className="inline-block w-full h-11 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-px leading-[44px]"
                style={{
                  background: "linear-gradient(135deg,#2563eb,#3b82f6)",
                  fontFamily: "'Sora', sans-serif",
                }}
              >
                Go to Dashboard →
              </a>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}