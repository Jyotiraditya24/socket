import { useEffect } from "react";
import "./App.css";
import { socket } from "./socket";

function App() {
  useEffect(()=>{
    socket.connect();
  })
  return <div>Hello done

  </div>;
}

export default App;
