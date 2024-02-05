import { useEffect, useState } from "react";
import { SpaceSearch } from "../Search/SearchStyled";
import { ConsultListFrequenceArea } from "./ListConsultFrequenceStyled";
import { FrequenceByDate } from "../../services/frequenceService";

function ConsultListFrequence({ ...props }) {
  const [infoAllStudents, setInfoAllStudents] = useState();

  async function GetDate() {
    let inputDate = document.getElementById("dateConsult").value;
    if (!inputDate) {
      const currentDate = new Date();

      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0");
      const day = String(currentDate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;

      inputDate = formattedDate;

      let infoDate = {
        class_date: inputDate,
      };
      FindFrequenceByDate(infoDate);
    } else {
      let infoDate = {
        class_date: inputDate,
      };
      FindFrequenceByDate(infoDate);
    }
  }

  async function FindFrequenceByDate(data) {
    try {
      const response = await FrequenceByDate(data);

      if (!response.data.message) {
        response.data.infoFrequence.map((student) => {
          let date = new Date(student.registration);
          student.registration = date.toLocaleDateString("pt-BR");
          return student;
        });
        const sortedInfoAllStudents = response.data.infoFrequence.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        console.log(sortedInfoAllStudents);
        setInfoAllStudents(sortedInfoAllStudents);
      } else {
        setInfoAllStudents();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetDate();
  }, []);

  return (
    <ConsultListFrequenceArea display={props.display}>
      <section>
        <header>
          <div id="header1">
            <p>Lista de Alunos</p>
            <input id="dateConsult" type="date" onChange={() => GetDate()} />
          </div>
        </header>
        <table>
          <thead>
            <tr>
              <th className="titleNames">
                <p>Nome</p>
              </th>
              <th className="titleCpfs">
                <p>CPF</p>
              </th>
              <th className="titleRegistrations">
                <p>Matrícula</p>
              </th>
              <th id="titleFrequence">
                <p>Frequência</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {infoAllStudents ? (
              infoAllStudents.map((user, index) => (
                // eslint-disable-next-line react/jsx-key
                <tr>
                  <td className="titleNames">
                    <p id="studentName">{user.name}</p>
                  </td>
                  <td className="titleCpfs">
                    <p>{user.cpf}</p>
                  </td>
                  <input
                    type="hidden"
                    name="cpf"
                    id={`${index}cpf`}
                    value={user.cpf}
                  />
                  <td className="titleRegistrations">
                    <p>{user.registration}</p>
                  </td>
                  <td>
                    <input
                      id={`${index}frequence`}
                      type="checkbox"
                      name="frequence"
                      checked={user.frequence}
                      className="frequence"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td id="columnNoneFrequence" colSpan="4">
                  <img src="./alerta.png" alt="Alerta" />
                  <p>Não há frequências nessa data.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </ConsultListFrequenceArea>
  );
}

export default ConsultListFrequence;
