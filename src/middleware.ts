import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const bucket = request.cookies.get("test_bucket");

  const response = NextResponse.next()

  if(!bucket) {
    const weighting = 0.5;
    const random = Math.random();
    const newBucketValue = random <= weighting ? "a" : "b";
    response.cookies.set('test_bucket', newBucketValue)
  }

  return response
}