import type { IncomingMessage, ServerResponse } from 'node:http';
import { getActivityPayload } from '../server/activityService.js';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  // Support CORS for client requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return;
  }

  try {
    const payload = await getActivityPayload(process.env);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800');
    res.end(JSON.stringify(payload));
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'Activity service error',
        message: err?.message || 'Failed to aggregate activity data',
      })
    );
  }
}
