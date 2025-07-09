import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i + 1}`,
  name: `Idea ${i + 1}`,
  description: `Description of idea ${i + 1}...`,
  text: _.times(100, (j) => `<p>Text paragraph ${j + 1} of idea ${i + 1}...</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getIdeas: trpc.procedure.query(() => ({ ideas: ideas.map((idea) => _.pick(idea, ['nick', 'name', 'description'])) })),
  getIdea: trpc.procedure
    .input(
      z.object({
        ideaNick: z.string(),
      })
    )
    .query(({ input }) => {
      const idea = ideas.find((idea) => idea.nick === input.ideaNick)
      return { idea: idea || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
