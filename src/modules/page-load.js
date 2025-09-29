import { openingHoursLoad } from "./form/hours-load.js";
import { schedulesShow } from "./form/schedules-show.js";

document.addEventListener("DOMContentLoaded", () => {
  openingHoursLoad();
  schedulesShow();
});
