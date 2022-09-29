const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

let selected = { r: 0, c: 0 };
const aoeuidhtn = 'aoeuidhtn';

function main() {
  renderSelection();
  renderPlayLink();
  document.addEventListener('keydown', onKeyDown);
}

function getSelectedCell() {
  const { r, c } = selected;
  return Array.from($$('.cell'))[r * 9 + c];
}

function renderSelection() {
  $$('.cell').forEach(cell => cell.classList.remove('selected'));
  getSelectedCell().classList.add('selected');
}

function renderPlayLink() {
  const puzzleString = Array.from($$('.cell')).map(cell => +(cell.innerHTML ?? 0)).join('');
  const url = 'https://cheery-custard-2b36de.netlify.app/?s=' + puzzleString;
  $('a#play').href = url;
  $('a#play').innerHTML = url;
}

function onKeyDown(keyboardEvent) {
  const { key, ctrlKey } = keyboardEvent;
  if (Array.from(aoeuidhtn).includes(key) && ctrlKey === false) {
    const number = aoeuidhtn.indexOf(key) + 1;
    getSelectedCell().innerHTML = number.toString();
    advanceSelection();
  } else if (key === ' ') {
    advanceSelection();
  } else if (key === 'j' || key === 'ArrowDown') {
    moveSelectionDown();
  } else if (key === 'k' || key === 'ArrowUp') {
    moveSelectionUp();
  } else if (key === 'g' || key === 'ArrowLeft') {
    moveSelectionLeft();
  } else if (key === 'l' || key === 'ArrowRight') {
    moveSelectionRight();
  } else if (
    key === 'Enter' ||
    (key === 'm' && ctrlKey === true)
  ) {
    selected.c = 0;
    moveSelectionDown();
  } else if (
    key === 'Backspace' ||
    (key === 'h' && ctrlKey === true)
  ) {
    unadvanceSelection();
    getSelectedCell().innerHTML = '';
  }
  renderSelection();
  renderPlayLink();
}

function moveSelectionLeft() {
  selected.c = mod(selected.c - 1, 9);
}

function moveSelectionRight() {
  selected.c = mod(selected.c + 1, 9);
}

function moveSelectionDown() {
  selected.r = mod(selected.r + 1, 9);
}

function moveSelectionUp() {
  selected.r = mod(selected.r - 1, 9);
}

function advanceSelection() {
  selected.c = mod(selected.c + 1, 9);
  if (selected.c === 0) {
    selected.r = mod(selected.r + 1, 9);
  }
}

function unadvanceSelection() {
  selected.c = mod(selected.c - 1, 9);
  if (selected.c === 8) {
    selected.r = mod(selected.r - 1, 9);
  }
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

main();
