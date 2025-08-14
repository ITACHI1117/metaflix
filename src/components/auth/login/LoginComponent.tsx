"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLogin } from "@/queries/auth.queries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/schemas/loginSchema";
import useProgressBarNavigation from "@/hooks/useProgressBarNavigation";

export interface LoginInputs {
  email: string;
  password: string;
}

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { push } = useProgressBarNavigation();
  const LoginQuery = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInputs) => {
    const promise = LoginQuery.mutateAsync({
      email: data.email,
      password: data.password,
    });

    toast.promise(promise, {
      loading: "Logging in",
      success: "Logged in successfully",
      error: "Failed to login",
    });
  };

  useEffect(() => {
    if (LoginQuery.isSuccess) {
      setIsLoading(false);
      window.location.reload();
    }
  }, [LoginQuery.isSuccess]);

  useEffect(() => {
    setIsLoading(LoginQuery.isPending);
  }, [LoginQuery.isPending]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-6 py-6">
        <div className="max-w-screen-xl mx-auto cursor-pointer">
          <h1
            onClick={() => push("/")}
            className="text-red-600 text-3xl font-bold"
          >
            METAFLIX
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex justify-center items-start pt-20 px-4">
        <div className="w-full max-w-md">
          {/* Sign In Form */}
          <div className="bg-black bg-opacity-75 rounded px-16 py-12">
            <h2 className="text-3xl font-normal mb-7">Sign In</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email/Phone Input */}
              <div>
                <input
                  type="text"
                  placeholder="Email or phone number"
                  {...register("email")}
                  className={`w-full h-12 px-4 bg-gray-700 border rounded text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 ${
                    errors.email
                      ? "border-orange-500"
                      : "border-gray-600 focus:border-white"
                  }`}
                />
                {errors.email && (
                  <p className="text-orange-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password")}
                    className={`w-full h-12 px-4 pr-12 bg-gray-700 border rounded text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 ${
                      errors.password
                        ? "border-orange-500"
                        : "border-gray-600 focus:border-white"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-orange-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-medium rounded mt-6 transition-colors"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>

            {/* Sign up section */}
            <div className="mt-16 text-gray-400">
              <span>New to MetaFlix? </span>
              <button
                onClick={() => push("/auth/signup")}
                className="text-white hover:underline font-medium"
              >
                Sign up now
              </button>
              .
            </div>

            {/* Captcha text */}
            <div className="mt-3 text-xs text-gray-500">
              <p>
                This page is protected by Google reCAPTCHA to ensure you're not
                a bot.{" "}
                <button className="text-blue-500 hover:underline">
                  Learn more
                </button>
                .
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 px-6 pb-8">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-gray-500 text-sm">
            <p className="mb-4">Questions? Call 1-844-505-2993</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="space-y-3">
                <a href="#" className="block hover:underline">
                  FAQ
                </a>
                <a href="#" className="block hover:underline">
                  Cookie Preferences
                </a>
              </div>
              <div className="space-y-3">
                <a href="#" className="block hover:underline">
                  Help Center
                </a>
                <a href="#" className="block hover:underline">
                  Corporate Information
                </a>
              </div>
              <div className="space-y-3">
                <a href="#" className="block hover:underline">
                  Terms of Use
                </a>
              </div>
              <div className="space-y-3">
                <a href="#" className="block hover:underline">
                  Privacy
                </a>
              </div>
            </div>

            <div className="mb-4">
              <select className="bg-black border border-gray-600 text-gray-300 px-3 py-1 rounded">
                <option>English</option>
                <option>العربية</option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginComponent;
