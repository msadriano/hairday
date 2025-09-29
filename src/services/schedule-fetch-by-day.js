import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import { apiConfig } from "./api-config.js";

dayjs.extend(utc);
dayjs.extend(timezone);

export async function scheduleFetchByDay(date) {
  try {
    const response = await fetch(`${apiConfig.baseURL}/schedules`);

    const data = await response.json();

    const schedulesDay = data.filter((schedule) => {
      return dayjs
        .utc(schedule.when)
        .tz("America/Sao_Paulo")
        .format("YYYY-MM-DD")
        .includes(date);
    });

    return schedulesDay;
  } catch (error) {
    console.log(error);
    alert("Não foi possível buscar os agendamentos do dia selecionado.");
  }
}
