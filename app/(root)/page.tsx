import { auth } from "@/auth";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "1",
    title: "What is Next.js?",
    description:
      "Next.js is a React framework for building server-side rendered applications.",
    tags: ["react", "nextjs", "javascript"],
    author: {
      _id: "123",
      name: "John Doe",
    },
    upvotes: 10,
    answers: 5,
  },
  {
    _id: "2",
    title: "How to use React hooks?",
    description:
      "React hooks are functions that let you use state and other React features without writing a class.",
    tags: ["react", "hooks", "javascript"],
    author: {
      _id: "456",
      name: "Jane Smith",
    },
    upvotes: 20,
    answers: 8,
  },
];

interface SearchParamsProps {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const { query = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) =>
    question.title.toLowerCase().includes(query?.toLowerCase())
  );

  return (
    <>
      <section className="flex flex-col-reverse md:justify-between w-full gap-4 sm:flex-row sm:items-center">
        <h1 className="text-2xl text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
      </section>
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <h1 key={question._id}>{question.title}</h1>
        ))}
      </div>
    </>
  );
}
