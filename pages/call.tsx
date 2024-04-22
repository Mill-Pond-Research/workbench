import * as React from 'react';

import { AppCall } from '../src/apps/call/AppCall';

import { withLayout } from '~/common/layout/withLayout';

import { type GetServerSideProps } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { prismaDb as db } from '~/server/prisma/prismaDb';

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
        props: {},
      };
    }
  }

  return { props: {} };
}

export default function CallPage() {
  return withLayout({ type: 'optima' }, <AppCall />);
}