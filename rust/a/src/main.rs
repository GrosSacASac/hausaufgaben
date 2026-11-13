use std::io;
use std::cmp::Ordering;
use rand::prelude::*;


fn main() {
    let target = rand::rng().random_range(0..=8);;
    loop {
        
        println!("Try to guess a number between 0 and 8");
        let mut input = String::new();
        io::stdin()
            .read_line(&mut input) 
            .expect("Error reading input");
        
        let inputNumber: u32 = match input.trim().parse() {
            Err(_) => {
                println!("Error reading a number");
                continue;
            },
            Ok(the_number) => {
                the_number
            }
        };
        
        println!("input = {inputNumber}");
        
        match inputNumber.cmp(&target) {
            Ordering::Less => {println!("Too small! \n")}
            Ordering::Equal => {
                println!("Exactly! Well done! \n\n");
                break;
            }
            Ordering::Greater => {println!("Too big! \n")}
        }
    }

}
