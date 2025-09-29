import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";

export async function schedulesLoad() {
  const inputDate = document.getElementById("date");
  const inputDateValue = inputDate.value;
  const dailySchedules = await scheduleFetchByDay(inputDateValue);

  return dailySchedules;
}
