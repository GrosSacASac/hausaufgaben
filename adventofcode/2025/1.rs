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
        let mut digitsCharacters = ['0','0'];
        let mut digits = [0, 0];
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
        let firstDigit = chars_iterator.next();
        let mut firstDigit = match firstDigit {
            Some(d) => {
                // println!("first digit {}", d);
                digitsCharacters[0] = d;
                d

            },
            None => {
                '0'
            }
        };
        let secondDigit = chars_iterator.next();
        let secondDigit = match secondDigit {
            Some(d) => {
                // println!("second digit {}", d);
                digitsCharacters[1] = d;
                d                
            },
            None => {
                digitsCharacters[1] = digitsCharacters[0];
                digitsCharacters[0] = '0';
                let temp = firstDigit;
                firstDigit = '0';
                temp
                // break;
            }
        };

        let amount = String::from(firstDigit).clone() + String::from(secondDigit).borrow_mut();
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
