const ACTIVE_CLASS = 'js-active';
const INACTIVE_CLASS = 'js-inactive';

function setActiveClass(element) {
  element.classList.add(ACTIVE_CLASS);
}

function removeActiveClass(element) {
  element.classList.remove(ACTIVE_CLASS);
}

function setInactiveClass(element) {
  element.classList.add(INACTIVE_CLASS);
}

function removeInactiveClass(element) {
  element.classList.remove(INACTIVE_CLASS);
}

export {
  setActiveClass,
  removeActiveClass,
  setInactiveClass,
  removeInactiveClass,
};
