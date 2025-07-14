import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter
const rateLimiter = new Map<string, { count: number; resetTime: number }>()

export async function authenticateRequest(request: NextRequest): Promise<NextResponse | null> {
	const apiKey =
		request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '')
	const validApiKey = process.env.MCP_API_KEY

	// Rate limiting (100 requests per minute per IP)
	const clientIP =
		request.headers.get('x-forwarded-for')?.split(',')[0] ||
		request.headers.get('x-real-ip') ||
		'unknown'

	const now = Date.now()
	const windowMs = 60 * 1000 // 1 minute
	const maxRequests = parseInt(process.env.MCP_RATE_LIMIT || '100')

	const record = rateLimiter.get(clientIP)

	if (record) {
		if (now < record.resetTime) {
			if (record.count >= maxRequests) {
				return NextResponse.json(
					{ error: 'Rate limit exceeded. Try again later.' },
					{ status: 429 }
				)
			}
			record.count++
		} else {
			record.count = 1
			record.resetTime = now + windowMs
		}
	} else {
		rateLimiter.set(clientIP, { count: 1, resetTime: now + windowMs })
	}

	// Clean up old entries
	for (const [ip, record] of rateLimiter.entries()) {
		if (now >= record.resetTime) {
			rateLimiter.delete(ip)
		}
	}

	// API key validation
	if (!validApiKey) {
		return NextResponse.json(
			{ error: 'Server configuration error: MCP_API_KEY not set' },
			{ status: 500 }
		)
	}

	if (!apiKey) {
		return NextResponse.json(
			{ error: 'API key required. Include X-API-Key header or Authorization Bearer token' },
			{ status: 401 }
		)
	}

	if (apiKey !== validApiKey) {
		return NextResponse.json({ error: 'Invalid API key' }, { status: 403 })
	}

	return null // Authentication passed
}
