import { prismaDb as db } from "~/server/prisma/prismaDb";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import type { GetServerSideProps } from "next";

import { apiQuery as api } from '~/common/util/trpc.client';

import React from 'react';
import { Typography, Button, Container, Grid, Card, CardContent, CardActions, Box } from '@mui/joy';


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
  const { isLoaded } = useUser();

  const { data: subscriptionSessionData } = api.stripe.getSubscriptionCheckoutURL.useQuery(void {}, {
    enabled: isLoaded,
  });

  const handleGoToSubscriptionCheckoutSession = async () => {
    const redirectURL = subscriptionSessionData?.redirectURL;

    if (redirectURL) {
      window.location.assign(redirectURL);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: 'background.default', p: 1 }}
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="plain" component="div">
          Try OpenWorkbench!
          </Typography>

          <Typography variant="plain" component="p" sx={{ fontWeight: 'bold', mt: 2 }}>
            Price: <span style={{ fontWeight: 'bold' }}>$39/month</span>
          </Typography>
          <Box mt={2}>
            <Button variant="solid" 
              color="primary"
              onClick={handleGoToSubscriptionCheckoutSession}
            >
              Subscribe
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PackagesPage;