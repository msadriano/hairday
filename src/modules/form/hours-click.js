export function hoursClick() {
  const hoursAvailable = document.querySelectorAll(".hour-available");

  hoursAvailable.forEach((available) => {
    available.addEventListener("click", (selected) => {
      hoursAvailable.forEach((item) => {
        item.classList.remove("hour-selected");
      });

      selected.target.classList.add("hour-selected");
    });
  });
}
