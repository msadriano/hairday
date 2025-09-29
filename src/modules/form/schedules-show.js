import dayjs from "dayjs";
import { schedulesLoad } from "../schedules/schedules-load.js";

export async function schedulesShow() {
  const dailySchedules = await schedulesLoad();

  const periodMorning = document.getElementById("period-morning");
  const periodAfternoon = document.getElementById("period-afternoon");
  const periodNight = document.getElementById("period-night");

  periodAfternoon.innerHTML = "";
  periodMorning.innerHTML = "";
  periodNight.innerHTML = "";

  dailySchedules.forEach((schedule) => {
    const scheduleId = schedule.id;
    const dateSchedule = new Date(schedule.when);
    const clientName = schedule.clientName;

    const period = getSchedulePeriod(dateSchedule);
    const scheduleElement = createScheduleItem(
      dateSchedule,
      clientName,
      scheduleId
    );

    const scheduleList = document.getElementById(period);
    scheduleList.appendChild(scheduleElement);
  });
}

function getSchedulePeriod(dateSchedule) {
  const hour = dayjs(dateSchedule).format("H");

  if (hour < 12) {
    return "period-morning";
  } else if (hour < 18) {
    return "period-afternoon";
  } else {
    return "period-night";
  }
}

function createScheduleItem(dateSchedule, clientName, id) {
  const hourSchedule = dayjs(dateSchedule).format("HH:mm");
  const scheduleItemTag = document.createElement("li");
  const scheduleItemTagHour = document.createElement("strong");
  const scheduleItemTagName = document.createElement("span");
  const scheduleItemTagDelete = document.createElement("img");

  scheduleItemTagHour.innerHTML = hourSchedule;
  scheduleItemTagName.innerHTML = clientName;

  scheduleItemTagDelete.setAttribute("src", "./src/assets/cancel.svg");
  scheduleItemTagDelete.setAttribute("alt", "Cancelar");
  scheduleItemTagDelete.classList.add("cancel-icon");

  scheduleItemTag.setAttribute("data-id", id);
  scheduleItemTag.append(
    scheduleItemTagHour,
    scheduleItemTagName,
    scheduleItemTagDelete
  );
  return scheduleItemTag;
}
