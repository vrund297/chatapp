import React, { useState } from "react";
import axios from "axios";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        

      await axios.get("https://cors-anywhere.herokuapp.com/api.chatengine.io/chats/", {
        headers: {
          "Project-ID": "dbb327e5-ae57-4d43-9e39-32feae8e0bf9",
          "User-Name": username,
          "User-Secret": password,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
      });

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      window.location.reload();
    } catch (error) {
       setError("oops!! Please Enter valid username or password...");
    }
  };
  return (
    <div className="wrapper">
      <div className="form">
        <h1 className="title">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input"
            placeholder="username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="password"
            required
          />
          <div align="center">
            <button type="submit" className="button">
              <span> Start Chatting</span>
            </button>
          </div>
          <h2 className="error"> {error}</h2>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
