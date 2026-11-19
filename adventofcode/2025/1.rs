// rustc ./1.rs -o ./1.exe && cat ./1input.txt | ./1.exe
use std::io::{self, Read};
use std::borrow::BorrowMut;

// left negative
// right positive
const MAX: i32 = 100;
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
    let mut number = START;
    for line in vec {        
        println!("{}", line);
        if line.len() <= 0 {
            break;
        }
        let s = String::from(line).to_string();
        let mut chars_iterator = s.chars();
        // println!("{:?}", direction);
        let direction = chars_iterator.next();
        let direction = match direction {
            Some(d) => {
                // println!("direction {}", d);
                d
            },
            None => {
                'R'
            }
        };
        let first_digit = chars_iterator.next();
        let mut first_digit = match first_digit {
            Some(d) => {
                // println!("first digit {}", d);
                d

            },
            None => {
                '0'
            }
        };
        let second_digit = chars_iterator.next();
        let second_digit = match second_digit {
            Some(d) => {
                // println!("second digit {}", d);
                d            
            },
            None => {
                let temp = first_digit;
                first_digit = '0';
                temp
                // break;
            }
        };

        let amount = String::from(first_digit).clone() + String::from(second_digit).borrow_mut();
        let mut amount: i32 = match amount.trim().parse() {
            Err(_) => {
                println!("Error reading a number");
                return ();
            },
            Ok(the_number) => {
                the_number
            }
        };
        if direction == 'L' {
            amount *= -1;
        }
        println!("Current {number} Effect {amount}");
        number = (number + amount) % MAX;
        if number < 0 {
            number = MAX + number
        }
        if number == 0 {
            total += 1;
        }
    }

    println!("result: {}", total);
}
