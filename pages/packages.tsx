import { db } from "~/server/prisma/db";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import type { GetServerSideProps } from "next";

// @ts-expect-error leave this alone
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (userId) {
    const account = await db.account.findFirst({
      where: {
        userId: userId,
      },
    });

    if (account?.status === "ACTIVE") {
      return {
        redirect: {
          destination: "/",
        },
      };
    }
  }

  return { props: {} };
};

const PackagesPage = () => {

  return (
    <section className="mt-10 flex flex-col gap-8">
      <header className="flex w-full flex-col gap-3">
        <h1 className="text-center text-4xl font-extrabold tracking-tight">
          Select a Plan
        </h1>
        <SignOutButton>
          <button className="mx-auto w-min whitespace-nowrap text-center font-bold">
            Sign Out
          </button>
        </SignOutButton>
      </header>
      <div className="flex gap-2.5">
        <div className="flex h-40 w-1/2 flex-col justify-between border border-neutral-950 bg-neutral-100 p-5">
          <h2 className="text-center text-2xl font-extrabold tracking-tight">
            $10 a Month
          </h2>
          <button
            className="border border-indigo-950 bg-indigo-700 py-3 text-xl font-extrabold text-neutral-100"
          >
            Subscribe
          </button>
        </div>
        <div className="flex h-40 w-1/2 flex-col justify-between border border-neutral-950 bg-neutral-100 p-5">
          <h2 className="text-center text-2xl font-extrabold tracking-tight">
            Lifetime for $150
          </h2>
          <button
            className="border border-sky-950 bg-sky-700 py-3 text-xl font-extrabold text-neutral-100"
          >
            Purchase
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackagesPage;