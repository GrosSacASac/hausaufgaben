// rustc ./3.rs -o ./3.exe && cat ./3input.txt | ./3.exe
use std::io::{self, Read};
use std::borrow::BorrowMut;
use std::convert::TryInto;


fn main () {
    let mut input = String::new();
    io::stdin()
        .read_to_string(&mut input)
        .expect("Failed to read line");

    let vec = input.lines()
        .filter(|s| !s.is_empty())
        .collect::<Vec<_>>();

    let mut total : u32 = 0;
    let mut number = START;
    for line in vec {        
        // println!("{}", line);
        if line.len() <= 0 {
            break;
        }
        let mut biggest : u8 = 0;
        let mut indexOfBiggest : u16 = 0;
        let mut digits : Vec<u8> = Vec::new();
        let length = line.len() as u16;
        for (i, x) in line.chars().enumerate() {
            // println!("position {} value {}", i, x);
            let digit = x.to_digit(10).unwrap() as u8;
            digits.push(digit);
            if i as u16 == (length - 1) {
                break;
            }
            if digit > biggest {
                biggest = digit;
                indexOfBiggest = i as u16;
            }
        }
        let mut secondBiggest : u8 = 0;
        let mut indexOfSecondBiggest : u16 = 0;
        for (i, &digit) in digits.iter().enumerate() {
            if i as u16 <= indexOfBiggest {
                continue;
            }
            if digit > secondBiggest {
                secondBiggest = digit;
                indexOfSecondBiggest = i as u16;
            }
        }
        const ASCII_NUMBER: u8 = 48;
        println!("biggest {} secondBiggest {}", biggest, secondBiggest);
        let twoDigits = [
            String::from(char::from(biggest + ASCII_NUMBER)),
            String::from(char::from(secondBiggest + ASCII_NUMBER))
        ];
        let joined: u32 = twoDigits.join("").parse().unwrap();
        println!("{}", joined);
        total += joined;

    }

    println!("result a: {}", total);
    // println!("result b: {}", totalb);
}
