import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/*
--- Day 16: Ticket Translation ---

As you're walking to yet another connecting flight, you realize that one of the legs of your re-routed trip coming up is on a high-speed train. However, the train ticket you were given is in a language you don't understand. You should probably figure out what it says before you get to the train station after the next flight.

Unfortunately, you can't actually read the words on the ticket. You can, however, read the numbers, and so you figure out the fields these tickets must have and the valid ranges for values in those fields.

You collect the rules for ticket fields, the numbers on your ticket, and the numbers on other nearby tickets for the same train service (via the airport security cameras) together into a single document you can reference (your puzzle input).

The rules for ticket fields specify a list of fields that exist somewhere on the ticket and the valid ranges of values for each field. For example, a rule like class: 1-3 or 5-7 means that one of the fields in every ticket is named class and can be any value in the ranges 1-3 or 5-7 (inclusive, such that 3 and 5 are both valid in this field, but 4 is not).

Each ticket is represented by a single line of comma-separated values. The values are the numbers on the ticket in the order they appear; every ticket has the same format. For example, consider this ticket:

.--------------------------------------------------------.
| ????: 101    ?????: 102   ??????????: 103     ???: 104 |
|                                                        |
| ??: 301  ??: 302             ???????: 303      ??????? |
| ??: 401  ??: 402           ???? ????: 403    ????????? |
'--------------------------------------------------------'

Here, ? represents text in a language you don't understand. This ticket might be represented as 101,102,103,104,301,302,303,401,402,403; of course, the actual train tickets you're looking at are much more complicated. In any case, you've extracted just the numbers in such a way that the first number is always the same specific field, the second number is always a different specific field, and so on - you just don't know what each position actually means!

Start by determining which tickets are completely invalid; these are tickets that contain values which aren't valid for any field. Ignore your ticket for now.

For example, suppose you have the following notes:

class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12

It doesn't matter which position corresponds to which field; you can identify invalid nearby tickets by considering only whether tickets contain values that are not valid for any field. In this example, the values on the first nearby ticket are all valid for at least one field. This is not true of the other three nearby tickets: the values 4, 55, and 12 are are not valid for any field. Adding together all of the invalid values produces your ticket scanning error rate: 4 + 55 + 12 = 71.

Consider the validity of the nearby tickets you scanned. What is your ticket scanning error rate?

--- Part Two ---

Now that you've identified which tickets contain invalid values, discard those tickets entirely. Use the remaining valid tickets to determine which field is which.

Using the valid ranges for each field, determine what order the fields appear on the tickets. The order is consistent between all tickets: if seat is the third field, it is the third field on every ticket, including your ticket.

For example, suppose you have the following notes:

class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9

Based on the nearby tickets in the above example, the first position must be row, the second position must be class, and the third position must be seat; you can conclude that in your ticket, class is 12, row is 11, and seat is 13.

Once you work out which field is which, look for the six fields on your ticket that start with the word departure. What do you get if you multiply those six values together?

*/

const input = fs.readFileSync(`${__dirname}/16input.txt`, 'utf-8')
const [rules, myTickets, otherTickets] = input.split("\n\n").filter(Boolean)
console.time("Time")
const departure = "departure"

const nameToOrder = new Map()
const positions = []
let i = 0
const realRules = rules.split("\n").filter(Boolean).map(ruleLine => {
    positions.push(i)
    i += 1

    let [ruleName, ruleString] = ruleLine.split(":")
    ruleString = ruleString.trim()
    const [ruleAString, ruleBString] = ruleString.split(" or ")
    const [mina, maxa] = ruleAString.split("-")
    const [minb, maxb] = ruleBString.split("-")
    // console.log([mina, maxa], [minb, maxb])
    return [function (x) {
        return (x >= mina && x <= maxa) || (x >= minb && x <= maxb)
    }, ruleName]
})
realRules.forEach(([testFunction, name]) => {
    nameToOrder.set(name, new Set(positions))
})


const otherTicketsList = otherTickets.split("\n").filter(Boolean).filter(line => {
    return !line.startsWith("nearby")
});

const myTicket = myTickets.split("\n").filter(Boolean).filter(line => {
    return !line.startsWith("your")
}).map(line => {
    return line.split(",").map(Number)
})[0];


const validTickets = otherTicketsList.map(line => {
    return line.split(",").map(Number)
}).filter(values => {
    // console.log(values)
    const invalidValue = values.find(value => {
        // console.log(value)
        return !realRules.some(([rule, name]) => {
            return rule(value)
        })
    })
    return invalidValue === undefined
})

validTickets.forEach((values) => {
    values.forEach((value, i) => {
        realRules.forEach(([rule, name]) => {
            if (!rule(value)) {
                // cannot be at that position
                nameToOrder.get(name).delete(i)
            }
        })
    })
})

// find exclusive
let moreThan1Position = true
let takenPosition = new Set()
const positionToName = new Map()
while (moreThan1Position) {
    moreThan1Position = false
    nameToOrder.forEach(function (positionSet, name) {
        if (positionSet.size === 1) {
            takenPosition.add(Array.from(positionSet)[0])
            positionToName.set(Array.from(positionSet)[0], name)
        } else {
            moreThan1Position = true
            const temp = new Set(positionSet)
            temp.forEach(value => {
                if (takenPosition.has(value)) {
                    positionSet.delete(value)
                }
            })
        }
    })
}

console.timeEnd("Time")

let product = 1

myTicket.forEach((value, position) => {
    const valueName = positionToName.get(position);
    if (valueName.startsWith(departure)) {
        // console.log(valueName, value)
        product *= value
    }
})
// console.log(validTickets)
console.log(positionToName)
console.log(myTicket)
console.log({product})


