import { openingHoursLoad } from "./form/hours-load.js";
import { schedulesShow } from "./schedules/schedules-show.js";

document.addEventListener("DOMContentLoaded", () => {
  openingHoursLoad();
  schedulesShow();
});
