import { scheduleFetchByDay } from "../../services/schedule-fetch-by-day.js";

export async function schedulesLoad() {
  const inputDate = document.getElementById("date");
  const inputDateValue = inputDate.value;
  const dailySchedules = await scheduleFetchByDay(inputDateValue);

  dailySchedules.sort((a, b) => {
    const timeStampA = new Date(a.when).getTime();
    const timeStampB = new Date(b.when).getTime();
    return timeStampA - timeStampB;
  });

  console.log(dailySchedules);
  return dailySchedules;
}
