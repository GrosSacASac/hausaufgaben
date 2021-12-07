// cat ./7input.txt | ./7.exe
use std::io::{self, Read};
fn main () {
    let mut input = String::new();
    io::stdin()
        .read_to_string(&mut input)
        .expect("Failed to read line");

    let vec = input.lines()
        .filter(|s| !s.is_empty())
        .map(|x| x.parse::<u32>().unwrap())
        .collect::<Vec<_>>();


    // for line in vec {
    //     println!("{}", line);
    // }
    
    let mut total: u32 = 0;
    let mut elements = vec.len();
    // let mut i = 0;
    for n in 0..total {
        let crab_position: u32 = vec[n];
        total += crab_position;
        elements += 1;
    }

    let average = total / elements;
    println!("average: {}", average);
}