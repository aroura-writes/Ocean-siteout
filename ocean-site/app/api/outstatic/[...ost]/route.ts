import { outstaticRouter, GetServerSidePropsContext } from 'outstatic/server'

export async function GET(request: Request, context: GetServerSidePropsContext) {
  return outstaticRouter(request, context)
}

export async function POST(request: Request, context: GetServerSidePropsContext) {
  return outstaticRouter(request, context)
}
