import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({});

  const handleFormData = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await response.json();
    console.log(data);
    setFormData({});
  };
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-blue-600">
      <div className="bg-white rounded-xl px-10 py-10">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-5">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="email"
                placeholder="Email"
                name="email"
                className="px-2 py-2 border border-black rounded-md"
                onChange={handleFormData}
                value={formData.email || ""}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="px-2 py-2 border border-black rounded-md"
                onChange={handleFormData}
                value={formData.password || ""}
              />
            </div>

            <button
              type="submit"
              className="bg-blue-200 px-1 py-2 rounded-md hover:cursor-pointer hover:bg-blue-300 font-bold transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
