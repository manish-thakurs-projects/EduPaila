import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/logo";
import {
  FaGraduationCap,
  FaBookOpen,
  FaRocket,
  FaMoon,
  FaSun,
} from "react-icons/fa";

export default function About() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative pt-12 md:pt-24">
          <div className="absolute inset-x-0 top-0 hidden md:block">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-700 h-64 w-full opacity-10 transform skew-y-6" />
          </div>

          <div className="relative flex justify-center mb-16">
            <div>
              <Logo className="h-24 w-24" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 md:px-16 md:py-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-8 text-center animate__animated animate__fadeInDown">
              Empowering Future Engineers
            </h1>

            <div className="grid md:grid-cols-3 gap-12 mb-16">
              <FeatureCard
                icon={<FaGraduationCap className="w-full h-full" />}
                title="Expert Guidance"
                text="Learn from experienced educators and industry professionals"
              />
              <FeatureCard
                icon={<FaBookOpen className="w-full h-full" />}
                title="Comprehensive Materials"
                text="Curated study resources for IOE & NEB success"
              />
              <FeatureCard
                icon={<FaRocket className="w-full h-full" />}
                title="Smart Preparation"
                text="AI-powered practice tests and progress tracking"
              />
            </div>

            <div className="space-y-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              <AnimatedParagraph delay="0.5s">
                At{" "}
                <strong className="text-blue-600 dark:text-blue-400">
                  EduPaila
                </strong>
                , we're revolutionizing engineering entrance preparation. Our
                platform combines cutting-edge technology with proven
                educational strategies to create a learning experience that's
                both effective and engaging.
              </AnimatedParagraph>

              <AnimatedParagraph delay="1s">
                With personalized study plans, interactive video lessons, and
                real-time performance analytics, we help students identify their
                strengths and target areas for improvement. Our mock tests
                simulate actual exam conditions, ensuring you're fully prepared
                when the big day arrives.
              </AnimatedParagraph>

              <AnimatedParagraph delay="1.5s">
                Join a community of ambitious learners who've achieved an
                average 92% success rate in entrance exams. Whether you're
                aiming for top ranks in IOE or excelling in NEB courses, we're
                here to support every step of your journey.
              </AnimatedParagraph>
            </div>

            <div className="mt-16 flex justify-center">
              <Link
                to="/joinus"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-600 px-4 dark:to-indigo-700 text-white py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <FaRocket className="animate-bounce" />
                Start your Journey
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="flex flex-col items-center text-center p-6 group">
      <div className="mb-4 w-16 h-16 bg-blue-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-300 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}

function AnimatedParagraph({ children, delay }) {
  return (
    <p
      className={`text-lg leading-relaxed animate__animated animate__fadeInUp animate__delay-${delay}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </p>
  );
}
