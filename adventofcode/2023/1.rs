// rustc ./1.rs -o ./1.exe && cat ./1input.txt | ./1.exe
use std::io::{self, Read};
use std::num::ParseIntError;
fn main () {
    let mut input = String::new();
    io::stdin()
        .read_to_string(&mut input)
        .expect("Failed to read line");

    let vec = input.lines() // cross platform split("\n")
        .filter(|s| !s.is_empty())
        .collect::<Vec<_>>();

    let mut total = 0;
    let mut i = 0;
    let length = vec.len();
    loop {
        if i >= length {
            break;
        }
        println!("{}", vec[i]);

        let innerLength = vec[i].len();
        let mut j = 0;
        let line = Vec::from(vec[i]);
        let mut firstNumberFound = false;
        let mut first = String::new();
        let mut last = String::new();
        loop {
            if j >= innerLength {
                break;
            }
            let c = char::from(line[j]);
            let s = String::from(c);

            if line[j] >=48 && line[j] <=58 {
                if !firstNumberFound {
                    first = s.clone();
                    firstNumberFound = true;
                }
                last = s.clone();
            }
            j += 1;
        }
        
        let coordinates = [first, last];
        let coordinates = coordinates.join("");
        let coordinates: u32 = match coordinates.trim().parse() {
            Err(_) => {
                println!("Error reading a number");
                return ();
            },
            Ok(the_number) => {
                the_number
            }
        };
        println!("{}",coordinates);
        total += coordinates;
        
        i+=1
    }

    println!("result: {}", total);
}
