export async function fetch_sleep() {
  const res = await fetch("http://127.0.0.1:7878");
  return await res.text();
}

async function runWithConcurrency(
  durationMs: number,
  concurrency: number
): Promise<void> {
  const start = Date.now();
  const end = start + durationMs;
  const stats: {
    fulfilled: number;
    rejected: number;
    total: number;
  } = { fulfilled: 0, rejected: 0, total: 0 };

  /**
   * Runs a batch of requests to the fetch_sleep() function.
   */
  async function runBatch(): Promise<void> {
    const promises: Promise<string>[] = Array(concurrency)
      .fill(null)
      .map(() => fetch_sleep());
    const results = await Promise.allSettled(promises);

    for (const result of results) {
      if (result.status === "fulfilled") {
        stats.fulfilled++;
      } else {
        stats.rejected++;
      }
      stats.total++;
    }
  }

  while (Date.now() < end) {
    await runBatch();
  }

  const duration = Date.now() - start;
  console.log(`Completed ${stats.total} requests in ${duration} ms`);
  console.log(`Average time per request: ${duration / stats.total} ms`);
  console.log(stats);
}

// Run for 10 seconds with 10,000 concurrent requests
const durationMs = 10000;
const concurrency = 10000;

runWithConcurrency(durationMs, concurrency);
