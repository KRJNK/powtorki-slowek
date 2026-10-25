// Fiszki Leitnera: box 1–3, losowanie z najniższego pudełka. Stan w localStorage.
(function () {
  'use strict';
  var KEY = 'fiszki-v1';
  var WORDS = [
    ['apple', 'jabłko'], ['bread', 'chleb'], ['water', 'woda'],
    ['house', 'dom'], ['book', 'książka'], ['dog', 'pies'],
    ['school', 'szkoła'], ['time', 'czas'], ['friend', 'przyjaciel'],
    ['food', 'jedzenie'], ['street', 'ulica'], ['window', 'okno']
  ];
  function load() {
    try {
      var b = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (Array.isArray(b) && b.length === WORDS.length) return b;
    } catch (e) {}
    return WORDS.map(function () { return 1; });
  }
  var boxes = load();
  var cur = -1;
  var card = document.getElementById('card');
  var answer = document.getElementById('answer');
  var showBtn = document.getElementById('show');
  var grade = document.getElementById('grade');
  function save() { try { localStorage.setItem(KEY, JSON.stringify(boxes)); } catch (e) {} }
  function pick() {
    var min = Math.min.apply(null, boxes);
    var cand = [];
    boxes.forEach(function (b, i) { if (b === min) cand.push(i); });
    return cand[Math.floor(Math.random() * cand.length)];
  }
  function progress() {
    var done = boxes.filter(function (b) { return b >= 3; }).length;
    document.getElementById('bar').style.width = (done / WORDS.length * 100) + '%';
    document.getElementById('prog').textContent =
      done === WORDS.length ? 'Wszystko opanowane! 🎉' :
      'Opanowane: ' + done + ' / ' + WORDS.length;
  }
  function next() {
    cur = pick();
    card.textContent = WORDS[cur][0];
    answer.textContent = '';
    showBtn.hidden = false; grade.hidden = true;
    progress();
  }
  showBtn.addEventListener('click', function () {
    answer.textContent = WORDS[cur][1] + ' (pudełko ' + boxes[cur] + ')';
    showBtn.hidden = true; grade.hidden = false;
  });
  document.getElementById('know').addEventListener('click', function () {
    boxes[cur] = Math.min(3, boxes[cur] + 1); save(); next();
  });
  document.getElementById('dont').addEventListener('click', function () {
    boxes[cur] = 1; save(); next();
  });
  document.getElementById('reset').addEventListener('click', function () {
    boxes = WORDS.map(function () { return 1; }); save(); next();
  });
  next();
})();
