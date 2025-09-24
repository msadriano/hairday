import dayjs from "dayjs";
import { openingHours } from "../../utils/openig-hours.js";

export function openingHoursLoad() {
  const hoursList = document.getElementById("hours");

  if (!hoursList) {
    console.error("Não foi possível carregar os horários disponíveis.");
  }

  let period = null;

  openingHours.forEach((hoursString) => {
    const [hour] = hoursString.split(":");
    const numericHour = Number(hour);
    const currentPeriod = getCurrentPeriod(numericHour);

    if (currentPeriod !== period) {
      const periodTitle = createPeriodTitle(currentPeriod);
      hoursList.appendChild(periodTitle);
      period = currentPeriod;
    }

    const hourItem = createHourItem(currentPeriod, hoursString, numericHour);
    hoursList.appendChild(hourItem);
  });
}

function getCurrentPeriod(numericHour) {
  if (numericHour <= 11) {
    return "morning";
  } else if (numericHour <= 17) {
    return "afternoon";
  } else {
    return "night";
  }
}

function createPeriodTitle(currentPeriod) {
  const periodTitleList = {
    morning: "Manhã",
    afternoon: "Tarde",
    night: "Noite",
  };

  const titleHtmlElement = document.createElement("li");
  titleHtmlElement.setAttribute("data-period", currentPeriod);
  titleHtmlElement.classList.add("hour-period");
  titleHtmlElement.textContent = periodTitleList[currentPeriod];

  return titleHtmlElement;
}

function createHourItem(currentPeriod, hoursString, numericHour) {
  const hourItemElement = document.createElement("li");
  hourItemElement.setAttribute("data-period", currentPeriod);
  hourItemElement.classList.add("hour");
  hourItemElement.value = hoursString;
  hourItemElement.textContent = hoursString;

  const currentTimeString = dayjs().format("H");
  const currentTimeNumeric = Number(currentTimeString);

  if (numericHour <= currentTimeNumeric) {
    hourItemElement.classList.add("hour-unavailable");
  } else {
    hourItemElement.classList.add("hour-available");
  }

  return hourItemElement;
}
