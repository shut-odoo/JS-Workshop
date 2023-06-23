let num = Math.floor(Math.random() * 11);
console.log(num);
let btnChecks = document.getElementsByTagName("button")[0];
let orderLog = document.getElementById("orderLog");
let count = 0



btnChecks.addEventListener("click", function(e) {
    const node = document.createElement("li");
    e.preventDefault();
    let input_field = document.getElementById("guess");
    let input_num = input_field.value;
    input_field.value = 0;
    count++;
    node.innerHTML = check(input_num);
    orderLog.appendChild(node);
});

function check(user_input) {
    // body...
    if (user_input > num) {
        return "You went far, guess a lower number"
    } else if (user_input == num) {
        return `Congratulations, You guessed it right !!!!!!!!! <br/> It took you ${count} attempts.`
    } else {
        return `Too low, please go higher`
    }
}