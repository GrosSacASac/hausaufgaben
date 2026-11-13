use std::io;

fn main() {
    println!("Input ?");
    let mut input = String::new();
    io::stdin()
        .read_line(&mut input)
        .expect("error read line");
    println!("{input}");
}
