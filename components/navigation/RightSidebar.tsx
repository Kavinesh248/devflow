import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import TagCard from "../cards/TagCard";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: "1",
      title: "What is the best way to learn React?",
    },
    {
      _id: "2",
      title: "How do I optimize my Next.js application?",
    },
    {
      _id: "3",
      title: "What are the new features in React 18?",
    },
    {
      _id: "4",
      title: "How to handle state management in React?",
    },
    {
      _id: "5",
      title: "What is the difference between useState and useReducer?",
    },
  ];

  const popularTags = [
    { _id: "1", name: "react", questions: 120 },
    { _id: "2", name: "next.js", questions: 95 },
    { _id: "3", name: "javascript", questions: 150 },
    { _id: "4", name: "css", questions: 80 },
    { _id: "5", name: "html", questions: 60 },
  ];
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[358px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={ROUTES.PROFILE(_id)}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>

              <Image
                src="/icons/chevron-right.svg"
                width={20}
                height={20}
                alt="chevron"
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-7 ">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {popularTags.map(({ _id, name, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={name}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
