/*   Name: Ruchit Patel
     Date: 11/24/2025
     File: table.js
     HW4 – Using the jQuery Plugin/UI with Your Dynamic Table
           Part 1: Validation Plugin

     Description:
     Uses the jQuery Validation plugin to validate user input.
     If valid, dynamically generates a multiplication table.
     The validation plugin make sure that the user input are 
     numbers, in range of -50 and 50, and that the minimum value 
     is less that maximum value. Also displays error messages 
     below input fields.

     Citation: 
     https://jqueryvalidation.org/validate/
     https://jqueryvalidation.org/jQuery.validator.addMethod/

*/

$(document).ready(function () {

    // Custom rule to check that min value must be <= max value
    $.validator.addMethod("lessthanorequal", function (value, element, param) {
        let target = $(param).val();
        if (target === "") return true;
        return parseInt(value) <= parseInt(target);
    }, "Value must be less than or equal to the maximum.");

    // Apply jQuery Validation to the form
    $("#inputform").validate({

        rules: {
            startY: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                lessthanorequal: "#endY"
            },
            endY: {
                required: true,
                number: true,
                min: -50,
                max: 50
            },
            startX: {
                required: true,
                number: true,
                min: -50,
                max: 50,
                lessthanorequal: "#endX"
            },
            endX: {
                required: true,
                number: true,
                min: -50,
                max: 50
            }
        },

        messages: {
            startY: {
                required: "Enter a starting Y value.",
                min: "Minimum Y value cannot be less than -50.",
                max: "Maximum Y value cannot be greater than 50.",
                lessthanorequal: "Start Y must be less than or equal to End Y."
            },
            endY: {
                required: "Enter an ending Y value.",
                min: "Minimum Y value cannot be less than -50.",
                max: "Maximum Y value cannot be greater than 50."
            },
            startX: {
                required: "Enter a starting X value.",
                min: "Minimum X value cannot be less than -50.",
                max: "Maximum X value cannot be greater than 50.",
                lessthanorequal: "Start X must be less than or equal to End X."
            },
            endX: {
                required: "Enter an ending X value.",
                min: "Minimum X value cannot be less than -50.",
                max: "Maximum X value cannot be greater than 50."
            }
        },

        // Shoes error messages after the input element
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },

        // Make sure that the form is submitted to generate the table only if valid
        submitHandler: function () {
            generateTable();
        }
    });

    // Generate multiplication table
    function generateTable() {

        const startY = parseInt($("#startY").val());
        const endY = parseInt($("#endY").val());
        const startX = parseInt($("#startX").val());
        const endX = parseInt($("#endX").val());

        const tableContainer = $("#tableContainer");
        tableContainer.html(""); // clear old table

        const table = $("<table></table>");

        // Header row
        const headerRow = $("<tr></tr>");
        headerRow.append($("<th></th>")); // empty corner cell

        for (let x = startX; x <= endX; x++) {
            headerRow.append($("<th></th>").text(x));
        }
        table.append(headerRow);

        // Data rows
        for (let y = startY; y <= endY; y++) {
            const row = $("<tr></tr>");

            row.append($("<th></th>").text(y));

            for (let x = startX; x <= endX; x++) {
                row.append($("<td></td>").text(x * y));
            }

            table.append(row);
        }

        tableContainer.append(table);
    }
});


