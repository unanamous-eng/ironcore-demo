export const dynamic = "force-dynamic";

export async function GET() {
  // Simple health check — no database dependency
  // so the route works even when DATABASE_URL is missing during build or cold-start
  return Response.json({ ok: true });
}
