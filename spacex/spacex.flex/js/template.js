"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Modal elements
  const burger = document.querySelector(".header__hamburger button");
  const header = document.querySelector(".header");
  const btnStartJourney = document.getElementById("btn-start-journey");
  const modal1 = document.getElementById("modal_1");
  const modalHeading = document.querySelector(".modal__heading");
  const closeBtn = document.getElementById("close-btn");
  const fillFormButton = document.getElementById("fill-form-btn");

  // Form elements
  const regForm = document.getElementById("reg-form");
  const nameInputs = document.querySelectorAll(".form__name-input");
  const versatileInput = document.querySelector(".form__versatile-input");
  const formTextarea = document.querySelector(".form__textarea");
  const formServerStatus = document.querySelector(".form__server-status");
  const formClientStatus = document.querySelector(".form__client-status");

  // Svg elements
  const pathToRocketSvg = document.getElementById("path-to-rocket");
  const pathToRocketRect = pathToRocketSvg.querySelector("rect");

  // Utilities
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const hideModal = () => {
    modal1.classList.remove("show-modal");
    setTimeout(() => {
      fillFormButton.classList.remove("hide");
      regForm.classList.remove("show-form");
    }, 800);
  };
  const checkVersatileInput = (str) => {
    let string = str.trim();
    if (string.match(emailRegex)) {
      return !!string.match(emailRegex);
    } else {
      let onlyDigits = string.replace(/[()\s-+]/g, "");
      return !!onlyDigits.match(/^\d{11}$/);
    }
  };
  const setPathToRocketSize = () => {
    const btn = btnStartJourney.getBoundingClientRect();
    const calculatedWidth = Math.abs(
      Math.floor(window.innerWidth / 2 - btn.right) + 5
    );
    // default width to height ratio - 5.63
    const calculatedHeight = Math.abs(Math.floor(calculatedWidth / 6));
    pathToRocketSvg.style.transform = `translateX(calc(-50% - ${
      calculatedWidth / 2 - 3
    }px))`;
    pathToRocketSvg.setAttribute("width", calculatedWidth);
    pathToRocketSvg.setAttribute("height", calculatedHeight);
    pathToRocketSvg.setAttribute(
      "viewBox",
      `0 0 ${calculatedWidth} ${calculatedHeight}`
    );
    pathToRocketRect.setAttribute("width", calculatedWidth);
    pathToRocketRect.setAttribute("height", calculatedHeight);
  };
  setPathToRocketSize();

  // Events
  window.addEventListener("resize", setPathToRocketSize);
  burger.addEventListener("click", () => {
    header.classList.toggle("header_active");
  });
  btnStartJourney.addEventListener("click", () => {
    modal1.classList.add("show-modal");
  });
  closeBtn.addEventListener("click", () => {
    hideModal();
  });
  fillFormButton.addEventListener("click", () => {
    regForm.classList.add("show-form");
    fillFormButton.classList.add("hide");
  });
  nameInputs.forEach((item) => {
    item.addEventListener("input", () => {
      item.value = capitalizeFirstLetter(item.value);
    });
    item.addEventListener("blur", () => {
      item.value = item.value.trim();
    });
  });

  // Sending form
  const sendForm = async (e) => {
    e.preventDefault();
    if (
      nameInputs[0].value &&
      nameInputs[1].value &&
      checkVersatileInput(versatileInput.value) &&
      formTextarea.value
    ) {
      const formData = new FormData(regForm);
      const response = await fetch("sendmail.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        formServerStatus.innerHTML = result.message;
        modalHeading.classList.add("hide");
        regForm.classList.remove("show-form");
        setTimeout(hideModal, 2000);
        setTimeout(() => {
          formServerStatus.innerHTML = " ";
          modalHeading.classList.remove("hide");
        }, 2000);

        nameInputs[0].value = "";
        nameInputs[1].value = "";
        versatileInput.value = "";
        formTextarea.value = "";
        formClientStatus.innerHTML = "";
      } else {
        formServerStatus.innerHTML = result.message;
      }
    } else {
      formClientStatus.innerHTML = "Форма не заполнена или заполнена неверно!";
      console.log(
        nameInputs[0].value,
        nameInputs[1].value,
        checkVersatileInput(versatileInput.value),
        formTextarea.value
      );
    }
  };

  regForm.addEventListener("submit", sendForm);
});
