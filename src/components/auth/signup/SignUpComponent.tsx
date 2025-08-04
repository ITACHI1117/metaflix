"use client";
import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { signUpSchema } from "@/schemas/signupSchema";
import { useSignUp } from "@/queries/auth.queries";

interface LoginProps {
  onSignUp?: () => void;
  onForgotPassword?: () => void;
  onBack?: () => void;
}

export default function SignUpComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const SubmitQuery = useSignUp();

  const onSubmit = async (data) => {
    SubmitQuery.mutate({
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      password: data.password,
      role: "Consumer",
    });
    setIsLoading(true);
  };

  useEffect(() => {
    if (SubmitQuery.isSuccess) {
      setIsLoading(false);
      toast.success("Sign up successful! Welcome on Board🎉");
      router.push("/auth/login");
    }
  }, [SubmitQuery.isSuccess]);

  useEffect(() => {
    if (SubmitQuery.isPending) {
      setIsLoading(true);
      toast.info("Creating your account...");
    }
  }, [SubmitQuery.isPending]);

  useEffect(() => {
    if (SubmitQuery.isError) {
      setIsLoading(false);
      toast.error("Sign up failed. Please try again.");
      console.error("Sign up error:", SubmitQuery.error);
    }
  }, [SubmitQuery.isError, SubmitQuery.error]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="px-6 py-6">
        <div className="max-w-screen-xl mx-auto">
          <h1
            onClick={() => router.push("/")}
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
            <h2 className="text-3xl font-normal mb-7">Sign Up</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  {...register("firstname")}
                  className={`w-full h-12 px-4 bg-gray-700 border rounded text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 ${
                    errors.firstname
                      ? "border-orange-500"
                      : "border-gray-600 focus:border-white"
                  }`}
                />
                {errors.firstname && (
                  <p className="text-orange-500 text-sm mt-1">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              {/* Lastname */}
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register("lastname")}
                  className={`w-full h-12 px-4 bg-gray-700 border rounded text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 ${
                    errors.lastname
                      ? "border-orange-500"
                      : "border-gray-600 focus:border-white"
                  }`}
                />
                {errors.lastname && (
                  <p className="text-orange-500 text-sm mt-1">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
              {/* username */}
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  {...register("username")}
                  className={`w-full h-12 px-4 bg-gray-700 border rounded text-white placeholder-gray-400 focus:outline-none focus:bg-gray-600 ${
                    errors.username
                      ? "border-orange-500"
                      : "border-gray-600 focus:border-white"
                  }`}
                />
                {errors.username && (
                  <p className="text-orange-500 text-sm mt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
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

              {/* Remember Me */}
              <div className="flex items-center justify-between mt-3 text-sm"></div>
            </form>

            {/* Sign up section */}
            <div className="mt-16 text-gray-400">
              <span>Already have MetaFlix? </span>
              <button
                onClick={() => router.push("/auth/login")}
                className="text-white hover:underline font-medium"
              >
                Sign In now
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
          </div>
        </div>
      </footer>
    </div>
  );
}
