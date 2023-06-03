import { useState, useEffect } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  const [data, setData] = useState("");
  const [mapData, setMapData] = useState([]);

  useEffect(() => {
    socket.connect();
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setMapData((prev) => [...prev, data]);
    console.log(mapData);
    socket.emit("chatMessage", data);
    setData("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="chat"
          className="bg-blue-200"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <input
          type="submit"
          className="rounded-md mx-2 cursor-pointer bg-black text-white px-2 py-1"
        />
      </form>
      {mapData.map((data)=>(
        <div key={data}>{data}</div>
      ))}
    </div>
  );
}

export default App;
