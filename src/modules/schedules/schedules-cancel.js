import { scheduleCancel } from "../../services/schedule-cancel.js";
import { openingHoursLoad } from "../form/hours-load.js";
import { schedulesShow } from "./schedules-show.js";

const periods = document.querySelectorAll(".period");

periods.forEach((period) => {
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      const item = event.target.closest("li");
      const { id } = item.dataset;
      if (id) {
        const isConfirm = confirm(
          "Tem certeza que deseja cancelar o agendamento?"
        );
        if (isConfirm) {
          await scheduleCancel({ id });
          schedulesShow();
          openingHoursLoad();
        }
      }
    }
  });
});
