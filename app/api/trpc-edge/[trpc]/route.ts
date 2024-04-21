import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouterEdge } from '~/server/api/trpc.router-edge';
import { createTRPCContext } from '~/server/api/trpc.server';

const handlerEdgeRoutes = (req: Request) =>
  fetchRequestHandler({
    router: appRouterEdge,
    endpoint: '/api/trpc-edge',
    req,
    // @ts-expect-error
    createContext: createTRPCContext,
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => console.error(`❌ tRPC-edge failed on ${path ?? "<no-path>"}: ${error.message}`)
        : undefined,
  });

export const runtime = 'edge';
export { handlerEdgeRoutes as GET, handlerEdgeRoutes as POST };