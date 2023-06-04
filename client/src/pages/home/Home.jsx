import { useEffect } from "react";
import { useState } from "react";
import { socket } from "../../socket";

const Home = () => {
  const [input, setInput] = useState("");
  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      alert("connected");
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="w-full bg-blue-600 px-5 py-5 absolute bottom-0">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              className="basis-4/5 rounded-sm"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button
              type="submit"
              className="px-1 py-2 bg-blue-300 rounded-md basis-1/5 hover:bg-blue-400 hover:scale-95 transition"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
