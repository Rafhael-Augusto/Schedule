import ScheduleTable from "../scheduleTable/scheduleTable";

export default function Schedule() {
  const schedules = [
    {
      date: "12/12",
      hour: "12:00",
      name: "Gostoso mil grau",
      id: "12321312312",
    },
    {
      date: "12/12",
      hour: "11:00",
      name: "Gostoso mil grau",
      id: "dkjfgh879",
    },
    {
      date: "12/12",
      hour: "13:00",
      name: "Rafhael Augusto Alves Prado",
      id: "gy1374gh",
    },
    {
      date: "12/12",
      hour: "20:00",
      name: "Rafhael Augusto Alves Prado",
      id: "1321321sdttrrr",
    },
    {
      date: "12/12",
      hour: "17:00",
      name: "Rafhael Augusto Alves Prado",
      id: "35dt",
    },
    {
      date: "12/12",
      hour: "23:00",
      name: "Rafhael Augusto Alves Prado",
      id: "123",
    },
  ];

  const data = {
    schedules,
    caption: "Agendamento",
  };

  return (
    <div className="m-8">
      <ScheduleTable data={data} />
    </div>
  );
}
