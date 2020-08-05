"use strict";

window.addEventListener("DOMContentLoaded", () => {
  const navToggle = () => {
    const button = document.querySelector(".page-header__toggle"),
      nav = document.querySelector(".page-header__nav");

    button.addEventListener("click", function (e) {
      e.preventDefault();
      button.classList.toggle("page-header__toggle--active");
      nav.classList.toggle("page-header__nav--active");
    });
  };

  navToggle();
});
