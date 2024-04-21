import * as React from 'react';

import { AppDraw } from '../src/apps/draw/AppDraw';

import { withLayout } from '~/common/layout/withLayout';
import { type GetServerSideProps } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { db } from '~/server/prisma/db';

// @ts-expect-error leave this alone
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  if (userId) {
    const account = await db.account.findFirst({
      where: {
        userId: userId,
      },
    });

    if (account?.status === 'INACTIVE') {
      return {
        redirect: {
          destination: '/packages',
        },
      };
    }
  }

  return { props: {} };
}

export default function DrawPage() {
  return withLayout({ type: 'optima' }, <AppDraw />);
}