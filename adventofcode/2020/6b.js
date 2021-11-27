import fs from "fs";
import url from "url";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
--- Day 6: Custom Customs ---
--- Part Two ---

As you finish the last group's customs declaration, you notice that you misread one word in the instructions:

You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!

Using the same example as above:

abc

a
b
c

ab
ac

a
a
a
a

b

This list represents answers from five groups:

    In the first group, everyone (all 1 person) answered "yes" to 3 questions: a, b, and c.
    In the second group, there is no question to which everyone answered "yes".
    In the third group, everyone answered yes to only 1 question, a. Since some people did not answer "yes" to b or c, they don't count.
    In the fourth group, everyone answered yes to only 1 question, a.
    In the fifth group, everyone (all 1 person) answered "yes" to 1 question, b.

In this example, the sum of these counts is 3 + 0 + 1 + 1 + 1 = 6.

For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?

 */
const input = fs.readFileSync(`${__dirname}/6input.txt`, 'utf-8')
const groupAnswers = input.split("\n\n")

let countTotal = 0;
groupAnswers.forEach(function (groupAnswer) {
    const individualAnswers = groupAnswer.split("\n").filter(Boolean)
    const yesAnswers = individualAnswers.map(function (individualAnswer) {
        return new Set(individualAnswer)
    })

    const allYes = yesAnswers.reduce(function (previousSet, yesAnswerSet) {
        const intersection = new Set()
        yesAnswerSet.forEach(value => {
            if (previousSet.has(value)) {
                intersection.add(value)
            }
        })
        return intersection
    })
    countTotal += allYes.size

})
console.log(countTotal);