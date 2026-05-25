import { createAppHandler } from 'outstatic/server'

const handler = createAppHandler()

export { handler as GET, handler as POST }
