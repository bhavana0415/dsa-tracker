import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <main className="bg-secondary min-h-screen flex flex-col items-center p-8 text-foreground">
      <section className="text-center p-20">
        <h1 className="text-4xl font-bold italic">Track Your DSA Skills with Ease</h1>
        <p className="mt-4 max-w-2xl mx-auto">
          The ultimate platform to help you monitor your progress in mastering
          Data Structures and Algorithms. Stay organized, motivated, and
          efficient!
        </p>
      </section>

      <section className="text-center mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          How DSA Tracker Helps You Succeed
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-ternary p-6 shadow-lg rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Organized Progress</h3>
            <p>
              Track your learning journey with ease and stay on top of your
              goals.
            </p>
          </div>
          <div className="bg-ternary p-6 shadow-lg rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Learning Path</h3>
            <p>
              Follow a structured path with clear milestones to guide your DSA
              journey.
            </p>
          </div>
          <div className="bg-ternary p-6 shadow-lg rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Cheat Sheets</h3>
            <p>
              Access important questions that cover all DSA patterns to
              reinforce your learning.
            </p>
          </div>
          <div className="bg-ternary p-6 shadow-lg rounded-xl">
            <h3 className="text-xl font-semibold mb-2">Stay on track</h3>
            <p>
              Visualize your learning progress and stay motivated as you track
              your improvements.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Get Started Today!</h2>
        <p className="text-lg mb-6">
          Join thousands of learners and embark on your journey to master Data
          Structures and Algorithms.
        </p>
        <Link
          href="/dsa"
          className="bg-ternary px-6 py-3 rounded-xl cursor-pointer hover:bg-quaternary"
        >
          Start Learning Now!!
        </Link>
      </section>
    </main>
  );
};

export default Home;
