// cat ./1input.txt | ./1.exe
use std::io::{self, Read};
fn main () {
    let mut input = String::new();
    io::stdin()
        .read_to_string(&mut input)
        .expect("Failed to read line");

    let vec = input.lines() // cross platform split("\n")
        .filter(|s| !s.is_empty())
        .map(|x| x.parse::<u32>().unwrap())
        .collect::<Vec<_>>();


    // for line in vec {
    //     println!("{}", line);
    // }
    
    let mut a = 0;
    let mut b = 0;
    let mut i = 0;
    'outer: loop {
        if i >= vec.len() {
            break;
        }
        let number_a: u32 = vec[i];
        let mut j = i + 1;
        loop {
            if j >= vec.len() {
                break;
            }
            let number_b: u32 = vec[j];
            if number_a + number_b == 2020 {
                a = number_a;
                b = number_b;
                break 'outer;
            }
            j += 1;
        }
        i+=1
    }

    let result = a * b;
    println!("result: {}", result);
}