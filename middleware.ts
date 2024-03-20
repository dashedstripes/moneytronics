import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Split testing
  const bucket = request.cookies.get("test_bucket");

  if(!bucket) {
    const weighting = 0.5;
    const random = Math.random();
    const newBucketValue = random <= weighting ? "a" : "b";
    response.cookies.set('test_bucket', newBucketValue)
  }

  // get locale from Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language')
  const locale = acceptLanguage ? acceptLanguage.split(',')[0] : 'en'
  
  if(!request.cookies.get('locale')) {
    response.cookies.set('locale', locale)
  }

  return response
}