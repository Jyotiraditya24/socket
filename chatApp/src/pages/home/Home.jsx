import { useEffect } from "react";
import { useState } from "react";
import { socket } from "../../socket";

const Home = () => {
  const [chats, setChats] = useState(" ");
  const [localChat, setLocalChat] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("user_connected", (message) => {
      alert(message);
    });
    socket.on("user_disconnected", (message) => {
      alert(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [chats]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("chat", localChat);
    socket.on("chat", (data) => {
      setChats(data);
      console.log(chats);
    });
  };
  return (
    <div>
      <div className="w-full bg-blue-600 px-5 py-5">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row gap-2">
            <input
              type="text"
              className="basis-4/5 rounded-sm"
              onChange={(e) => setLocalChat(e.target.value)}
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
      <div>
      
          <li>{chats}</li>

      </div>
    </div>
  );
};

export default Home;
