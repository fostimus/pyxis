const sortButtons = document.querySelectorAll(".sort-button");

const responsiveChange = () => {
  const [vw, vh] = getViewport();
  if (inputsAllButtons() && vw >= 900) {
    for (const sortButton of sortButtons) {
      const input = sortButton.querySelector("input");
      input.setAttribute("type", "checkbox");

      const text = document.createElement("div");
      text.classList.add("sort-button-text");
      text.innerText = input.getAttribute("value");
      sortButton.appendChild(text);
    }
  } else if (!inputsAllButtons() && vw < 900) {
    for (const sortButton of sortButtons) {
      const input = sortButton.querySelector("input");
      input.setAttribute("type", "button");

      sortButton.querySelector(".sort-button-text").remove();
    }
  }
};

//

window.onresize = responsiveChange;
responsiveChange();

/**
 * Helpers
 */

function inputsAllButtons() {
  for (const sortButton of sortButtons) {
    if (sortButton.querySelector("input").getAttribute("type") !== "button") {
      return false;
    }
  }
  return true;
}
function getViewport() {
  var viewPortWidth;
  var viewPortHeight;

  // the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
  if (typeof window.innerWidth != "undefined") {
    (viewPortWidth = window.innerWidth), (viewPortHeight = window.innerHeight);
  }

  // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
  else if (
    typeof document.documentElement != "undefined" &&
    typeof document.documentElement.clientWidth != "undefined" &&
    document.documentElement.clientWidth != 0
  ) {
    (viewPortWidth = document.documentElement.clientWidth),
      (viewPortHeight = document.documentElement.clientHeight);
  }

  // older versions of IE
  else {
    (viewPortWidth = document.getElementsByTagName("body")[0].clientWidth),
      (viewPortHeight = document.getElementsByTagName("body")[0].clientHeight);
  }
  return [viewPortWidth, viewPortHeight];
}
