import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, password }) => {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create account");
      return data;
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Failed to create account");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-md mx-auto flex flex-col h-screen justify-center items-center">
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="input input-bordered rounded p-2"
          onChange={handleInputChange}
          value={formData.email}
        />
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
          {isPending ? "Loading..." : "Sign Up"}
        </button>
        {isError && <p className="text-red-500 text-sm">{error.message}</p>}
      </form>
      <div className="mt-4">
        <p className="text-sm text-center">Already have an account?</p>
        <Link to="/login">
          <button className="btn btn-outline rounded-full w-full mt-2">
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
