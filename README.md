# Rust Web Server with Concurrent Load Testing

This project demonstrates a simple web server implemented in Rust, along with a concurrent load testing script written in TypeScript using Deno.

## Project Structure

- `server/`: Contains the Rust web server implementation
  - `src/main.rs`: Main server logic
  - `src/lib.rs`: ThreadPool implementation for handling concurrent requests
  - `html/`: HTML files served by the web server
- `main.ts`: TypeScript script for load testing

## Rust Web Server

The web server is built using Rust and features:

- A custom ThreadPool for handling concurrent connections
- Serving static HTML pages
- A sleep endpoint for simulating longer requests

### Running the Server

To run the server:

1. Navigate to the `server` directory
2. Run `cargo run`

The server will start on `127.0.0.1:7878`.

## Load Testing Script

The `main.ts` file contains a TypeScript script for load testing the server. It uses Deno and features:

- Concurrent requests to the server
- Configurable test duration and concurrency level
- Statistics output for request fulfillment and timing

### Running the Load Test

To run the load test:

1. Ensure Deno is installed
2. Run `deno run --allow-net main.ts`

## Configuration

- Server concurrency: Modify the `ThreadPool::new(10000)` line in [server/src/main.rs](cci:7://file:///home/vikyw/Desktop/rust-webserver/server/src/main.rs:0:0-0:0)
- Load test parameters: Adjust `durationMs` and `concurrency` in `main.ts`

## Dependencies

- Rust
- Deno
