document.getElementById('loan-form').addEventListener('submit', function (e) {
    // hide results
    document.getElementById('results').style.display = 'none';
    // show loader
    document.querySelector('.loading').style.display = 'block';
    // call calculate function after 2 seconds
    setTimeout(calculate, 2000);

    e.preventDefault();
});

function calculate(e) {

    const amount = document.getElementById('loan_amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly_payment');
    const totalAmount = document.getElementById('total_amount');
    const totalInterest = document.getElementById('total_interest');


    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    // to check if the result is a finite number
    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);   // toFixed is used to set decimal points
        totalAmount.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.querySelector('.loading').style.display = 'none';
    }
    else {
        showAlert('Please enter the numbers');
    }

    e.preventDefault()
}

function showAlert(error) {
    // create a div
    const errorDiv = document.createElement('div');
    
    // assign class to div
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // get elements to insert error above heading and within card
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // insert error above heading and below div
    card.insertBefore(errorDiv, heading);

    // hide loader
    document.querySelector('.loading').style.display = 'none';

    //set timeout to remove the error after 3 seconds
    setTimeout(clearAlert, 3000);

    function clearAlert() {
        document.querySelector('.alert').remove();
    }

}





