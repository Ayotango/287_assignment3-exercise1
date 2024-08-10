const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

// Function for findSummation
function findSummation(N = 1) {
    if (typeof N !== 'number' || N < 1 || !Number.isInteger(N)) {
        return false;
    }
    let summation = 0;
    for (let i = 1; i <= N; i++) {
        summation += i;
    }
    return summation;
}

// Function for uppercaseFirstandLast
function uppercaseFirstAndLast(str = '') {
    if (typeof str!=='string' || str.trim() === '') {
        return false;
    }
    const words = str.split(' ');
    const result = [];
    for (let word of words) {
        result.push(word.charAt(0).toUpperCase() + word.slice(1, word.length - 1).toLowerCase() + word.charAt(word.length - 1).toUpperCase());
    }
    return result.join(' ');
}

// Function for findAverageAndMedian
function findAverageAndMedian(arr = []) {
    if (!Array.isArray(arr) || arr.some(isNaN)) {
        return false;
    }
    const sortedArr = arr.sort((a, b) => a - b);
    const length = sortedArr.length;
    const average = (sortedArr[Math.floor((length - 1) / 2)] + sortedArr[length / 2]) / 2;
    const median = sortedArr[Math.floor(length / 2)];
    return { average, median };
}

// Route for findSummation
app.post('/findSummation', (req, res) => {
    const { number } = req.body;
    const num = parseInt(number, 10);
    const result = findSummation(num);
    res.send(`Result: ${result}`);
});

// Route for uppercaseFirstAndLast
app.post('/uppercaseFirstAndLast', (req, res) => {
    const { sentence } = req.body;
    const result = uppercaseFirstAndLast(sentence);
    res.send(`Result: ${result}`);
});

// Route for findAverageAndMedian
app.post('/findAverageAndMedian', (req, res) => {
    const { numbers } = req.body;
    const numbersArr = numbers.split(',').map(num => parseInt(num, 10));
    const result = findAverageAndMedian(numbersArr);
    res.send(`Result: \nAverage = ${result.average} \nMedian = ${result.median}`);
});

// HTML
app.get('/', (req, res) => {
    res.send(`
        <!doctype html>
        <html>
        <head>
            <title>Node.js Functions</title>
        </head>
        <body>
            <form action="/findSummation" method="post">
                <label for="number">Enter a positive integer:</label>
                <input type="number" id="number" name="number" min="1" required>
                <button type="submit">Submit</button>
            </form>
            <form action="/uppercaseFirstAndLast" method="post">
                <label for="sentence">Enter a string:</label>
                <input type="text" id="sentence" name="sentence" required>
                <button type="submit">Submit</button>
            </form>
                <form action="/findAverageAndMedian" method="post">
                <label for="numbers">Enter comma-separated numbers:</label>
                <input type="text" id="numbers" name="numbers" required>
                <button type="submit">Submit</button>
            </form>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
