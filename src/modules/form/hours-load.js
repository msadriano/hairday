import dayjs from "dayjs";
import { openingHours } from "../../utils/opening-hours.js";
import { hoursClick } from "./hours-click.js";
import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";

export async function openingHoursLoad() {
  const hoursList = document.getElementById("hours");
  const inputDate = document.getElementById("date");
  const selectedDate = inputDate.value;

  const scheduledHours = await scheduleFetchByDay(selectedDate);
  const newScheduledHours = scheduledHours.map((scheduleH) => {
    return dayjs.utc(scheduleH.when).tz("America/Sao_Paulo").format("HH:mm");
  });

  hoursList.innerHTML = "";

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

    const hourItem = createHourItem(
      currentPeriod,
      hoursString,
      numericHour,
      newScheduledHours
    );
    hoursList.appendChild(hourItem);
  });

  hoursClick();
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

function createHourItem(
  currentPeriod,
  hoursString,
  numericHour,
  newScheduledHours
) {
  const inputDate = document.getElementById("date");
  const selectedDate = inputDate.value;
  const todayDate = dayjs().format("YYYY-MM-DD");
  const hourItemElement = document.createElement("li");

  hourItemElement.setAttribute("data-period", currentPeriod);
  hourItemElement.classList.add("hour");
  hourItemElement.value = hoursString;
  hourItemElement.textContent = hoursString;

  const currentTimeString = dayjs().format("H");
  const currentTimeNumeric = Number(currentTimeString);

  if (selectedDate > todayDate) {
    hourItemElement.classList.add("hour-available");
  } else {
    if (numericHour > currentTimeNumeric) {
      hourItemElement.classList.add("hour-available");
    } else {
      hourItemElement.classList.add("hour-unavailable");
    }
  }

  if (
    hourItemElement.classList.contains("hour-available") &&
    newScheduledHours.includes(hoursString) === true
  ) {
    hourItemElement.classList.remove("hour-available");
    hourItemElement.classList.add("hour-unavailable");
  }

  return hourItemElement;
}
