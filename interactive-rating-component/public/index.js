const submitBtn = document.querySelector('button');
const ratingSpans = document.querySelector('.rating');
const displayRating = document.querySelector('.display-rating');
const cards = document.querySelectorAll('.card');
let selectedRating;

ratingSpans.addEventListener('click', spanClickListener);
submitBtn.addEventListener('click', submitBtnListener);

function spanClickListener(e) {
  // get element which has active class set currently and remove the class
  const currentlyActive = document.getElementsByClassName('active');
  if (currentlyActive.length !== 0) {
    currentlyActive[0].classList.remove('active');
  }
  e.target.classList.add('active');
  selectedRating = e.target.tagName === 'SPAN' && e.target.textContent;
  submitBtn.disabled = false;
}

function submitBtnListener() {
  cards[0].setAttribute('hidden', true);
  cards[1].removeAttribute('hidden');
  displayRating.textContent = `You selected ${selectedRating} out of 5`;
}
