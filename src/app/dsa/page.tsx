import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="bg-secondary h-full flex flex-col items-center">
      <section className="text-center p-6">
        <h2 className="text-4xl font-bold text-foreground">DSA Cracker</h2>
        <p className="mt-4 max-w-2xl mx-auto">
          Boost your skills with these DSA cheat sheets for targeted practice.
        </p>
        <h1 className="mt-4 font-bold max-w-2xl mx-auto">
          TIME TO UP YOUR GAME !!!
        </h1>
      </section>

      <section id="features" className="p-6 w-full">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/dsa/apna-college"
              className="p-6 bg-ternary rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
            >
              <h4 className="text-xl font-semibold">Apna College DSA Sheet</h4>
              <p className=" mt-2">
                Shradha Didi and Aman Bhaiya have created a valuable resource
                for Data Structures & Algorithms with around 400 problems.
              </p>
            </Link>

            <Link
              href="dsa/arsh-goyal"
              className="p-6 bg-ternary rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
            >
              <h4 className="text-xl font-semibold">DSA Sheet by Arsh</h4>
              <p className="mt-2">
                Arsh Goyal has created a DSA plan with coding problems to help
                you prepare for interviews in 45–60 days.
              </p>
            </Link>

            <Link
              href="dsa/love-babbar"
              className="p-6 bg-ternary rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
            >
              <h4 className="text-xl font-semibold">
                DSA Sheet by Love Babbar
              </h4>
              <p className="mt-2">
                Love Babbar has put together a list of 450 coding questions that
                are often asked in interviews at companies like Amazon,
                Microsoft, and Google.{" "}
              </p>
            </Link>

            <Link
              href="/dsa/striver"
              className="p-6 bg-ternary rounded-xl shadow-lg hover:scale-105 transform transition duration-300"
            >
              <h4 className="text-xl font-semibold">Striver’s SDE Sheet</h4>
              <p className="mt-2">
                A collection of important coding interview questions commonly
                asked in interviews at big companies like Google, Amazon, and
                Facebook.{" "}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
