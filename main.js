import { ProgressBarComponent } from "./progress.js";

const progress = new ProgressBarComponent();
// ну тут частичная изолированность, компонент зависит от ui которое передает родитель, но логика внутри компонента изолирована от родителя
progress.setUIElements({
  container: document.querySelector(".progress-ring-container"),
  fill: document.querySelector(".progress-ring__fill"),
  ringSvg: document.querySelector(".progress-ring"),
  valueInput: document.querySelector('input[type="text"]'),
  animateCheckbox: document
    .querySelectorAll(".toggle-group")[0]
    .querySelector('input[type="checkbox"]'),
  hideCheckbox: document
    .querySelectorAll(".toggle-group")[1]
    .querySelector('input[type="checkbox"]'),
  valueDisplay: document.querySelector(".progress-value"),
});

progress.setValue(30);
progress.setAnimationStatus(false);
progress.setHiddenStatus(false);

// const fill = document.querySelector(".progress-ring__fill");
// const radius = 54;
// const circumference = 2 * Math.PI * radius;
// function setProgress(value) {
//   // поставил ограничение на 0 <= value >= 100, иначе начинались визуальные баги если вводить -10 или 120
//   const limitedValue = Math.min(100, Math.max(0, value));
//   const offset = circumference * (1 - limitedValue / 100);
//   fill.style.strokeDashoffset = offset;
// }
// setProgress(0);

// минималка апи которая должна работать
// progress.init();
// progress.setValue(50);
// progress.setAnimationStatus(true);
// progress.setHiddenStatus(false);
