var numbers = [];

function addNumber() {
    var value = document.getElementById("numbers").value;
    numbers.push(parseInt(value));
    document.getElementById("numbersAdded").innerText = numbers.toString();
    console.log(numbers);
}

function calculate() {
    if (numbers.length >= 5) {
        var BiggestNumber = Math.max.apply(Math, numbers);
        document.getElementById("result").innerText = BiggestNumber;
    }
}