const btnMarkAllEl = document.querySelector(".mark");
const notificationEl = document.querySelectorAll(".notification");
const infoEl = document.querySelector(".marked p");

const objClassNames = {
  readClass: "read",
  statusClass: "status",
  messageClass: "message",
};

btnMarkAllEl.addEventListener("click", function () {
  const { readClass, statusClass, messageClass } = objClassNames;
  const targetText = "Mark all as read";

  if (this.textContent === targetText) {
    this.textContent = targetText.replace(readClass, `un${readClass}`);
    notificationForEach(function (el) {
      removeClass(el, { readClass, statusClass, messageClass });
    });
  } else {
    this.textContent = targetText;
    notificationForEach(function (el) {
      addClass(el, { readClass, statusClass, messageClass });
    });
  }
});

notificationForEach(function (el) {
  el.addEventListener("dblclick", () => {
    const { readClass, statusClass, messageClass } = objClassNames;

    if (!el.classList.contains(readClass)) {
      return addClass(el, { readClass, statusClass, messageClass });
    }

    removeClass(el, { readClass, statusClass, messageClass });
  });
});

function notificationForEach(fn) {
  notificationEl.forEach((el) => {
    fn(el);
  });
}

function addClass(el, { readClass, statusClass, messageClass }) {
  const messageEl = el.querySelector(`.${messageClass}`);
  el.classList.add(readClass);
  if (!messageEl.classList.contains(statusClass)) {
    messageEl.classList.add(statusClass);
  }

  readCount(el, `.${readClass}`);
}

function removeClass(el, { readClass, statusClass, messageClass }) {
  const messageEl = el.querySelector(`.${messageClass}`);
  el.classList.remove(readClass);
  if (messageEl.classList.contains(statusClass)) {
    messageEl.classList.remove(statusClass);
  }
  readCount(el, `.${readClass}`);
}

function readCount(el, className) {
  const all = el.parentNode.querySelectorAll(className).length;
  infoEl.textContent = all;
}
