/*
File: hw3.js
GUI Assignment: jQuery Validation Plugin
Khiel Jansen Mantilla, UMass Lowell Computer Science
finished by Khiel Jansen on June 8, 2024 at 3:10 PM

The validate function checks the input for any wrong issues such as incomplete input or wrong input. The messages part in the validate function outputs a message. Not all rules are complemented with a message because some rules call a validator.addMethod that does output a message. If the input is correct, submitHandler does execute the generation of the table.

Sources used: w3schools and jquery documentation.
*/


$(document).ready(function() {
    $.validator.addMethod("wholeNumber", function(value, element) {
        return /^-?\d+$/.test(value);
    }, "Enter a whole number");
    $.validator.addMethod("withinLimit", function(value, element) {
        return value >= -100 && value <= 100;
    }, "Enter a value between -100 and 100. inclusive");
    $.validator.addMethod("lessthan", function(value, element, param) {
        var num1 = parseInt(value);
        var num2 = parseInt($(param).val());
        return num1 < num2;
    }, "Starting value has to be less than end value");

    // for the function validate, there are three parts. rules, messages, and submit handler.
    // the rules that are to be validate are whether the text fields are not empty, whether the value is a number, whether there is a decimal point or not, whether it is within the limits of -100 or 100,
    // and the starting value has to be less than the end value.
    // the jquery validation works and i do create validator methods that I set as true or param true in the rules part.
    $("#multiplication-form").validate({
        rules: {
            multiplier0: {
                required: true,
                number: true,
                wholeNumber: true,
                withinLimit: true,
                lessthan: "#multiplier1"
            },
            multiplier1: {
                required: true,
                number: true,
                wholeNumber: true,
                withinLimit: true
            },
            multiplicand0: {
                required: true,
                number: true,
                wholeNumber: true,
                withinLimit: true,
                lessthan: "#multiplicand1"
            },
            multiplicand1: {
                required: true,
                number: true,
                wholeNumber: true,
                withinLimit: true
            }
        },
        messages: {
            multiplier0: {
                required: "Please enter the value",
                number: "It has to be the number"
            },
            multiplier1: {
                required: "Please enter the value",
                number: "It has to be the number"
            },
            multiplicand0: {
                required: "Please enter the value",
                number: "It has to be the number"
            },
            multiplicand1: {
                required: "Please enter the value",
                number: "It has to be the number"
            }
        },
        submitHandler: function(form) {
            // if the code gets to this function that means that the values are validated.
            const num1 = parseInt($('#multiplier0').val(), 10);
            const num2 = parseInt($('#multiplier1').val(), 10);
            const num3 = parseInt($('#multiplicand0').val(), 10);
            const num4 = parseInt($('#multiplicand1').val(), 10);
            
            let table = createtable(num1, num2, num3, num4);

            $('#tablecontainer').append(table);
        }
    });

});

function createtable(x0, x1, y0, y1) {
    let table = document.createElement("table");

    var row0 = document.createElement("tr");
    row0.appendChild(document.createElement("th"));
    for (let x = x0; x <= x1; x++) {
        var c0 = document.createElement("th");
        c0.textContent = x;
        row0.appendChild(c0);
        //console.log(x);
    }
    table.appendChild(row0);

    for (let y = y0; y <= y1; y++) {
        var row1 = document.createElement("tr");
        var h0 = document.createElement("th");
        h0.textContent = y;
        row1.appendChild(h0);
        for (let x = x0; x <= x1; x++) {
        var c0 = document.createElement("td");
        let number = x*y;
        c0.textContent = number;
        row1.appendChild(c0);
        }
        table.appendChild(row1);
    }

    return table;
}
