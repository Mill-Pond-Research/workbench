import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod";

import { env } from "~/server/env.mjs";
import { createTRPCRouter, protectedProcedure } from "../trpc.server";


export const stripeRouter = createTRPCRouter({
    
  getSubscriptionCheckoutURL: protectedProcedure.query(async ({ ctx }) => {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-04-10",
    });

    const url = env.URL;

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          price: env.STRIPE_SUBSCRIPTION_PRICE_ID,
          quantity: 1,
        },
      ],

      success_url: `${url}/checkout/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${url}/packages`,
      subscription_data: {
        metadata: {
          userId: ctx.auth.userId,
        },
        trial_period_days: 7,
      },
    });

    if (!checkoutSession.url) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Could not create checkout message",
      });
    }

    return { redirectURL: checkoutSession.url };
  }),

  cancelSubscription: protectedProcedure
    .input(z.object({ stripeCustomerId: z.string() }))
    .mutation(async ({ input }) => {
      const { stripeCustomerId } = input;

      const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-04-10",
      });

      const subscription = await stripe.subscriptions.list({
        customer: stripeCustomerId,
      });
      const subscriptionId = subscription.data[0]!.id;

      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      return { message: "Membership Cancelled" };
    }),

  resumeSubscription: protectedProcedure
    .input(z.object({ stripeCustomerId: z.string() }))
    .mutation(async ({ input }) => {
      const { stripeCustomerId } = input;

      const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-04-10",
      });

      const subscription = await stripe.subscriptions.list({
        customer: stripeCustomerId,
      });
      const subscriptionId = subscription.data[0]!.id;

      await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: false,
      });

      return { message: "Membership Resumed" };
    }),
});