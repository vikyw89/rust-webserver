use std::{
    fs,
    io::{prelude::*, BufReader},
    net::{TcpListener, TcpStream},
};

fn main() {
    let listener = TcpListener::bind("127.0.0.1:7878").unwrap();

    for stream in listener.incoming() {
        let unwrapped_stream = stream.unwrap();

        handle_connection(&unwrapped_stream);
    }
}

fn handle_connection(stream: &TcpStream) {
    let buf_reader = BufReader::new(stream);
    let http_request: Vec<_> = buf_reader
        .lines()
        .map(|result| result.unwrap())
        .take_while(|line| !line.is_empty())
        .collect();
    println!("{:?}", http_request);
    let status_line = "HTTP/1.1 200 OK";
    let contents = fs::read_to_string("./hello-world/hello.html").unwrap();
    let length = contents.len();

    let response = format!("{status_line}\r\nContent-Length: {length}\r\n\r\n{contents}");

    stream
        .try_clone()
        .unwrap()
        .write_all(response.as_bytes())
        .unwrap();
}
