import { openingHoursLoad } from "./hours-load.js";

const inputDate = document.getElementById("date");

inputDate.onchange = () => openingHoursLoad();
