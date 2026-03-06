export default function AuthLayout({ leftContent, children }) {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">

            {/* LEFT SIDE */}
            <div className="hidden lg:flex w-1/2 justify-center items-center p-16 relative">

                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,#1e3a8a,transparent_60%)]">
                </div>
                <div className="relative z-10 text-center max-w-md">
                    {leftContent}
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
                <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-xl">
                {children}
                </div>
            </div>

        </div>
    );
}