// rustc ./3.rs -o ./3.exe && cat ./3input.txt | ./3.exe
use std::io::{self, Read};
use std::borrow::BorrowMut;
use std::convert::TryInto;

const TAKE: i32 = 2;
const START: i32 = 50;

fn main () {
    let mut input = String::new();
    io::stdin()
        .read_to_string(&mut input)
        .expect("Failed to read line");

    let vec = input.lines()
        .filter(|s| !s.is_empty())
        .collect::<Vec<_>>();

    let mut total = 0;
    let mut totalb = 0;
    let mut number = START;
    for line in vec {        
        // println!("{}", line);
        if line.len() <= 0 {
            break;
        }
        // let s = String::from(line).to_string();
        // println!("{}", s);
        let mut biggest : u8 = 0;
        let mut indexOfBiggest : u16 = 0;
        let mut lastIndex : u16 = 0;
        for (i, x) in line.chars().enumerate() {
            // println!("position {} value {}", i, x);
            let digit = x.to_digit(10).unwrap() as u8;
            if (digit > biggest) {
                biggest = digit;
                indexOfBiggest = i as u16;
            }
            if (i as u16 > lastIndex) {
                lastIndex = i as u16;
            }
        }
        let mut secondBiggest : u8 = 0;
        let mut indexOfSecondBiggest : u16 = 0;
        println!("biggest {} last index {}", biggest, lastIndex);

    }

    // println!("result a: {}", total);
    // println!("result b: {}", totalb);
}
