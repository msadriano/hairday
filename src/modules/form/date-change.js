import { openingHoursLoad } from "./hours-load.js";
import { schedulesShow } from "../schedules/schedules-show.js";

const inputDate = document.getElementById("date");

inputDate.onchange = () => {
  openingHoursLoad();
  schedulesShow();
};
