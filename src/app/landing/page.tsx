"use client";
import React, { useState } from "react";
import {
  Play,
  CheckCircle,
  Smartphone,
  Download,
  Users,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
} from "lucide-react";
import { useRouter } from "next/navigation";
import useProgressBarNavigation from "@/hooks/useProgressBarNavigation";

const MetaFlixLanding = () => {
  const [email, setEmail] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  const { push } = useProgressBarNavigation();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is MetaFlix?",
      answer:
        "MetaFlix is a revolutionary streaming platform that brings you bite-sized entertainment. Watch trending short videos, discover new creators, and enjoy endless scrolling of curated content tailored to your interests.",
    },
    {
      question: "How much does MetaFlix cost?",
      answer:
        "MetaFlix offers flexible plans starting from ₦1,200/month for our Basic plan. Premium plans include ad-free viewing, exclusive content, and early access to creator features.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch MetaFlix anywhere, anytime. Use your phone, tablet, laptop, or smart TV. Our content syncs across all your devices so you never miss a moment.",
    },
    {
      question: "How do I cancel?",
      answer:
        "Cancel anytime with no fees. Your membership will remain active until the end of your billing period. No questions asked, no hassle.",
    },
    {
      question: "What can I watch on MetaFlix?",
      answer:
        "Discover millions of short videos from creators worldwide. From comedy skits and dance trends to cooking tips and educational content - there's something for everyone.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="relative z-50 px-4 py-4 md:px-8">
        <nav className="flex items-center justify-between  mx-auto">
          <div className="flex items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-red-600">
              METAFLIX
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => push("auth/login")}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium transition-colors"
            >
              Sign In
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black border-t border-gray-800 md:hidden">
            <div className="px-4 py-4 space-y-4">
              <button className="w-full bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium transition-colors">
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>
      <img
        src={"/images/metafliximg.webp"}
        alt="metaflix"
        width={100}
        height={100}
        className="w-full h-[100vh] absolute object-cover"
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-start px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-purple-900/20 to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_70%)]"></div>

        <div className="relative z-10 text-start items-start justify-start flex flex-col max-w-4xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Endless entertainment.
            <br />
            <span className="text-red-600">Bite-sized brilliance.</span>
          </h1>

          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl">
            Discover trending short videos, follow your favorite creators, and
            dive into a world of endless entertainment. Watch anywhere. Cancel
            anytime.
          </p>

          <div className="mb-8">
            <p className="text-lg mb-4">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            <button
              onClick={() => push("/auth/signup")}
              className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-medium transition-colors flex items-center justify-center gap-2"
            >
              Get Started
            </button>

            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              {/* <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-black/50 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white"
              /> */}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Enjoy on your PC.
              </h2>
              <p className="text-lg md:text-xl text-gray-300">
                Watch on Laptops, PCs, Xbox, Chromecast, Apple TV, Blu-ray
                players, and more.
              </p>
            </div>
            <div className="relative">
              <div className="overflow-hidden bg-gradient-to-br from-red-600 to-purple-600 rounded-lg p-8 aspect-video flex items-center justify-center">
                <img
                  src={"/images/metaflix2.jpg"}
                  alt="metaflix"
                  width={10}
                  height={10}
                  className="w-full h-full  object-cover opacity-50"
                />
                <Play size={80} className="text-white absolute" />
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="bg-gradient-to-br from-blue-600 to-green-600 rounded-lg p-8 aspect-video flex items-center justify-center">
                <img
                  src={"/images/metaflix4.jpg"}
                  alt="metaflix"
                  width={10}
                  height={10}
                  className="w-full h-full  object-cover opacity-50"
                />
                <Smartphone size={80} className="text-white absolute" />
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Watch everywhere.
              </h2>
              <p className="text-lg md:text-xl text-gray-300">
                Stream unlimited short videos on your phone, tablet.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                Create your own content.
              </h2>
              <p className="text-lg md:text-xl text-gray-300">
                Join millions of users. watch creators videos, and enjoy
                unlimited content.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-yellow-600 to-red-600 rounded-lg p-8 aspect-video flex items-center justify-center">
                <img
                  src={"/images/metaflix3.jpeg"}
                  alt="metaflix"
                  width={10}
                  height={10}
                  className="w-full h-full  object-cover opacity-50"
                />
                <Users size={80} className="text-white absolute" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-2">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-800">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center py-6 text-left hover:bg-gray-900/50 transition-colors"
                >
                  <span className="text-lg md:text-xl font-medium">
                    {faq.question}
                  </span>
                  {openFaq === index ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </button>

                {openFaq === index && (
                  <div className="pb-6 text-gray-300 text-lg">{faq.answer}</div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg mb-4">
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            <div className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto">
              {/* <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-white"
              /> */}
              <button
                onClick={() => push("/auth/signup")}
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded font-medium transition-colors flex items-center justify-center gap-2 w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-400 mb-8">Questions? Call 1-844-505-2993</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="space-y-4 text-sm text-gray-400">
              <a href="#" className="block hover:underline">
                FAQ
              </a>
              <a href="#" className="block hover:underline">
                Investor Relations
              </a>
              <a href="#" className="block hover:underline">
                Privacy
              </a>
              <a href="#" className="block hover:underline">
                Speed Test
              </a>
            </div>
            <div className="space-y-4 text-sm text-gray-400">
              <a href="#" className="block hover:underline">
                Help Center
              </a>
              <a href="#" className="block hover:underline">
                Jobs
              </a>
              <a href="#" className="block hover:underline">
                Cookie Preferences
              </a>
              <a href="#" className="block hover:underline">
                Legal Notices
              </a>
            </div>
            <div className="space-y-4 text-sm text-gray-400">
              <a href="#" className="block hover:underline">
                Account
              </a>
              <a href="#" className="block hover:underline">
                Ways to Watch
              </a>
              <a href="#" className="block hover:underline">
                Corporate Information
              </a>
              <a href="#" className="block hover:underline">
                Only on MetaFlix
              </a>
            </div>
            <div className="space-y-4 text-sm text-gray-400">
              <a href="#" className="block hover:underline">
                Media Center
              </a>
              <a href="#" className="block hover:underline">
                Terms of Use
              </a>
              <a href="#" className="block hover:underline">
                Contact Us
              </a>
            </div>
          </div>

          <p className="text-gray-400 text-sm">MetaFlix Nigeria</p>
        </div>
      </footer>
    </div>
  );
};

export default MetaFlixLanding;
