// rustc ./1.rs -o ./1.exe
// cat ./1input.txt | ./1.exe
use std::io::{self, Read};
fn main () {
    let mut input = String::new();
    io::stdin()
        .read_to_string(&mut input)
        .expect("Failed to read line");

    let vec = input.lines() // cross platform split("\n")
        .filter(|s| !s.is_empty())
        // .map(|x| x.parse::<u32>().unwrap())
        .collect::<Vec<_>>();


    // for line in vec {
    //     println!("{}", line);
    // }
    
    let mut a = 0;
    let mut b = 0;
    let mut i = 0;
    let mut length = vec.len();
    loop {
        if i >= length {
            break;
        }
        let (number_a::<u32>, error::<ParseIntError>) = vec[i].parse::<u32>();
        match error {
            Some(error) => println!("Could not parse", inner),
            None => println!("Number {}", number_a),
        }
        // println!("number_a: {}", number_a);
        // let mut j = i + 1;
        // loop {
        //     if j >= vec.len() {
        //         break;
        //     }
        //     let number_b: u32 = vec[j];inner
        //     if number_a + number_b == 2020 {
        //         a = number_a;
        //         b = number_b;
        //         break 'outer;
        //     }
        //     j += 1;
        // }
        i+=1
    }

    let result = a * b;
    println!("result: {}", result);
}