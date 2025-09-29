import { apiConfig } from "./api-config.js";

export async function scheduleNew({ id, clientName, when }) {
  try {
    await fetch(`${apiConfig.baseURL}/schedules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, clientName, when }),
    });

    alert("Agendamento realizado com sucesso!");
  } catch (error) {
    console.log(error);
    alert(
      "Não foi possível realizar o agendamento. Tente novamente mais tarde."
    );
  }
}
