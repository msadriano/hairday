import dayjs from "dayjs";

const form = document.querySelector("form");
const inputDate = document.getElementById("date");

const inputClientName = document.getElementById("client");

form.onsubmit = (event) => {
  event.preventDefault();

  try {
    // Carrega a data selecionada
    const dateSelected = inputDate.value;
    if (!dateSelected) {
      return alert("Selecione uma data válida!");
    }

    // Carrega a hora selecionada
    const inputHourSelected = document.querySelector(".hour-selected");
    const [hourSelected] = inputHourSelected.innerHTML.split(":");
    if (hourSelected === null) {
      return alert("Selecione um horário válido!");
    }

    // Carrega o nome do cliente
    const clientName = inputClientName.value.trim();
    if (!clientName) {
      return alert("Preencha o campo Cliente");
    }

    // Gera o horário agendado completo (data e hora)
    const when = dayjs(dateSelected).add(hourSelected, "hour");

    // Cria um ID
    const id = new Date().getTime();

    // Cria um objeto com todos os dados
    const scheduledTime = {
      id: id,
      name: clientName,
      when: when,
    };
    console.log(scheduledTime);
  } catch (error) {
    alert("Não foi possível realizar o agendamento!");
    console.log(error);
  }
};
