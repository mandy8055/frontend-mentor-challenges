// Inputs
const dayField = document.getElementById('day');
const monthField = document.getElementById('month');
const yearField = document.getElementById('year');

// Submit Button
const submitBtn = document.getElementById('submit-btn');

// Result Spans
const yearsResult = document.getElementById('years-result');
const monthsResult = document.getElementById('month-result');
const daysResult = document.getElementById('days-result');
const yearsText = document.getElementById('years-text');
const monthsText = document.getElementById('months-text');
const daysText = document.getElementById('days-text');

function calculateDOB() {
  resetFields();
  if (!validateInputs(dayField.value, monthField.value, yearField.value))
    return;
  const formatter = `${yearField.value}-${monthField.value}-${dayField.value}`;
  const dob = moment(formatter); // replace with the user's date of birth
  const today = moment();
  const diff = today.diff(dob);
  const duration = moment.duration(diff);

  // Set age in result spans
  displayResult(yearsResult, yearsText, duration.years(), 'year');
  displayResult(monthsResult, monthsText, duration.months(), 'month');
  displayResult(daysResult, daysText, duration.days(), 'day');
}

function displayResult(node1, node2, duration, trigger) {
  node1.textContent = duration;
  node2.textContent = duration === 1 ? trigger : `${trigger}s`;
}

function resetFields() {
  yearsResult.textContent = '--';
  yearsText.textContent = 'years';
  monthsResult.textContent = '--';
  monthsText.textContent = 'months';
  daysResult.textContent = '--';
  daysText.textContent = 'days';
}

function validateInputs(day, month, year) {
  const maxDaysInMonth = moment()
    .set({ month: month - 1 })
    .daysInMonth();
  let validDay = true;
  let validMonth = true;
  let validYear = true;

  // check day
  if (day === '') {
    displayError('This field is required', 'day');
    validDay = false;
  } else if (day < 1 || day > maxDaysInMonth) {
    displayError('Must be a valid date', 'day');
    validDay = false;
  } else {
    removeError('day');
  }

  // check month
  if (month === '') {
    displayError('This field is required', 'month');
    validMonth = false;
  } else if (month < 1 || month > 12) {
    displayError('Must be a valid month', 'month');
    validMonth = false;
  } else {
    removeError('month');
  }

  // check year
  const dateToBeChecked = moment().add({
    years: year - moment().year(),
    months: month - (moment().month() + 1),
    days: day - moment().date(),
  });
  if (year === '') {
    displayError('This field is required', 'year');
    validYear = false;
  } else if (
    ((!validDay || !validMonth) && year > moment().year()) ||
    dateToBeChecked.isAfter(moment(), 'day')
  ) {
    displayError('Must be in the past', 'year');
    validYear = false;
  } else if (year.toString().length < 4) {
    displayError('Year should follow YYYY format', 'year');
    validYear = false;
  } else {
    removeError('year');
  }

  // return whether all inputs are valid or not
  return validDay && validMonth && validYear;
}

function displayError(errorMessage, trigger) {
  const input = document.getElementById(trigger);
  const inputContainer = document.getElementById(`${trigger}-div`);

  // add error class to input and label
  input.classList.add('error');
  inputContainer.querySelector('label').classList.add('error');

  // create error span if it doesn't exist
  let errorSpan = inputContainer.querySelector('.error-span');
  if (!errorSpan) {
    errorSpan = document.createElement('span');
    errorSpan.classList.add('error-span');
    inputContainer.appendChild(errorSpan);
  }

  // display error message
  errorSpan.textContent = errorMessage;
}

function removeError(trigger) {
  const input = document.getElementById(trigger);
  const inputContainer = input.closest('.inputs');
  if (!input.classList.contains('error')) return;

  // remove error class from input and label
  input.classList.remove('error');
  inputContainer.querySelector('label').classList.remove('error');

  // remove error span
  const errorSpan = inputContainer.querySelector('.error-span');
  if (errorSpan) {
    errorSpan.remove();
  }
}

// Event handler
submitBtn.addEventListener('click', calculateDOB);
