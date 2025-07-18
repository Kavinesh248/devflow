import { auth } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filter/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { create } from "domain";
import Link from "next/link";
import React from "react";

const questions = [
  {
    _id: "1",
    title: "What is React.js?",
    description:
      "Next.js is a React framework for building server-side rendered applications.",
    tags: [
      {
        _id: "1",
        name: "React",
      },
      { _id: "2", name: "Javascript" },
    ],
    author: {
      _id: "123",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2023-10-01T12:00:00Z"),
  },
  {
    _id: "2",
    title: "How to use Javascript hooks?",
    description:
      "React hooks are functions that let you use state and other React features without writing a class.",
    tags: [
      { _id: "1", name: "Javascript" },
      { _id: "2", name: "React" },
    ],
    author: {
      _id: "456",
      name: "Jane Smith",
      image:
        "https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg",
    },
    upvotes: 20,
    answers: 8,
    views: 200,
    createdAt: new Date("2023-10-01T12:00:00Z"),
  },
];

interface SearchParamsProps {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParamsProps) {
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query?.toLowerCase());

    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;

    return matchesQuery && matchesFilter;
  });

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
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
}
