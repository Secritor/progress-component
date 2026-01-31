export class ProgressBarComponent {
  constructor() {
    this.container = null;
    this.ringSvg = null;
    this.fill = null;
    this.valueInput = null;
    this.animateCheckbox = null;
    this.hideCheckbox = null;
    this.valueDisplay = null;

    this.radius = 0;
    this.circumference = 0;

    this.value = 0;
    this.isAnimating = false;
    this.isHidden = false;
    this.animationInterval = null;
  }

  setUIElements({
    fill,
    valueInput,
    animateCheckbox,
    hideCheckbox,
    container,
    ringSvg,
  }) {
    this.container = container;
    this.ringSvg = ringSvg;
    this.fill = fill;
    this.valueInput = valueInput;
    this.animateCheckbox = animateCheckbox;
    this.hideCheckbox = hideCheckbox;

    this.radius = parseFloat(this.fill.getAttribute("r"));
    this.circumference = 2 * Math.PI * this.radius;
    this.fill.style.strokeDasharray = this.circumference;
    this.fill.style.strokeDashoffset = this.circumference;
    this.fill.style.transition = "stroke-dashoffset 0.3s linear";

    this.valueInput.addEventListener("input", (e) => {
      let rawValue = e.target.value;

      if (rawValue === "") {
        rawValue = "0";
        e.target.value = rawValue;
      }

      const value = parseInt(rawValue, Number);

      if (!Number.isNaN(value)) {
        this.setValue(value);
      }
    });

    this.animateCheckbox.addEventListener("change", (e) => {
      this.setAnimationStatus(e.target.checked);
    });

    this.hideCheckbox.addEventListener("change", (e) => {
      this.setHiddenStatus(e.target.checked);
    });

    this.render();
  }

  limitValue(value) {
    if (value < 0) return 0;
    if (value > 100) return 100;
    return value;
  }

  setValue(value = 0) {
    this.value = this.limitValue(value);
    if (this.valueInput) this.valueInput.value = this.value;
    this.render();
  }

  setAnimationStatus(status) {
    this.isAnimating = !!status;
    if (status) this.startAnimation();
    else this.stopAnimation();
  }

  setHiddenStatus(status) {
    this.isHidden = !!status;
    if (this.container) {
      this.container.style.display = this.isHidden ? "none" : "flex";
    }
  }

  render() {
    if (!this.isAnimating && this.fill) {
      const offset = this.circumference * (1 - this.value / 100);
      this.fill.style.strokeDashoffset = offset;
    }
    if (this.valueDisplay) this.valueDisplay.textContent = `${this.value}%`;
  }

  startAnimation() {
    if (this.animationInterval) return;
    let angle = 0;
    this.animationInterval = setInterval(() => {
      angle = (angle + 2) % 360;
      if (this.ringSvg)
        this.ringSvg.style.transform = `rotate(${angle - 90}deg)`;
    }, 10);
  }

  stopAnimation() {
    clearInterval(this.animationInterval);
    this.animationInterval = null;
    if (this.ringSvg) this.ringSvg.style.transform = "rotate(-90deg)";
    this.render();
  }
}
