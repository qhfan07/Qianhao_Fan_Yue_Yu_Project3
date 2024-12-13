import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate: loginMutation } = useMutation({
    mutationFn: async ({ username, password }) => {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }
  
      document.cookie = `jwt=${data.token}; path=/; Secure; SameSite=Strict`;
    },
    onSuccess: () => {
      toast.success("Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto flex flex-col h-screen justify-center items-center">
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="input input-bordered rounded p-2"
          onChange={handleInputChange}
          value={formData.username}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input input-bordered rounded p-2"
          onChange={handleInputChange}
          value={formData.password}
        />
        <button
          type="submit"
          className="btn btn-primary rounded-full w-full"
          disabled={isPending}
        >
          {isPending ? "Loading..." : "Login"}
        </button>
        {isError && <p className="text-red-500 text-sm">{error.message}</p>}
      </form>
      <div className="mt-4">
        <p className="text-sm text-center">Don't have an account?</p>
        <Link to="/signup">
          <button className="btn btn-outline rounded-full w-full mt-2">
            Sign up
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

