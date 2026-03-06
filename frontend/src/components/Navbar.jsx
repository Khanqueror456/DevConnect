export default function Navbar() {
  return (
    <div className="border-b border-gray-800 bg-[#020617]">

      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <h1 className="text-xl font-semibold text-blue-400">
          DevConnect
        </h1>

        <div className="flex gap-6 text-gray-400">

          <button className="hover:text-white">
            Feed
          </button>

          <button className="hover:text-white">
            Connections
          </button>

          <button className="hover:text-white">
            Profile
          </button>

        </div>

      </div>

    </div>
  );
}