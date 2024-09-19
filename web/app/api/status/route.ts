import {NEXT_PUBLIC_URL} from '@/lib/constant'
export async function GET() {
  let data = await fetch(`${NEXT_PUBLIC_URL}/status`)
  let json = await data.json()
 
  return Response.json(json)
}