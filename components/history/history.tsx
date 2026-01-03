import Menu from "../menu/menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function History() {
  const zustand = [
    {
      day: "12/12",
      schedules: [
        {
          date: "12/12",
          hour: "16:00",
          name: "Rafhael Augusto",
        },
        {
          date: "12/12",
          hour: "15:00",
          name: "Rafhael Augusto",
        },
        {
          date: "12/12",
          hour: "14:00",
          name: "Rafhael Augusto",
        },
        {
          date: "12/12",
          hour: "13:00",
          name: "Rafhael Augusto",
        },
      ],
    },
    {
      day: "11/12",
      schedules: [
        {
          date: "11/12",
          hour: "16:00",
          name: "Matheus Augusto",
        },
        {
          date: "11/12",
          hour: "15:00",
          name: "Matheus Augusto",
        },
        {
          date: "11/12",
          hour: "14:00",
          name: "Matheus Augusto",
        },
      ],
    },
  ];

  return (
    <div>
      <Menu />

      <div className="m-8">
        {zustand.map((item) => (
          <div key={item.day}>
            <Table className="mb-4">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center"> Data</TableHead>
                  <TableHead className="text-center"> Hora</TableHead>
                  <TableHead className="text-center"> Nome</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody className="text-center">
                {item.schedules.map((schedule, index) => (
                  <TableRow
                    key={schedule.hour}
                    className={`${index % 2 && "bg-primary/6"}`}
                  >
                    <TableCell>{schedule.date}</TableCell>
                    <TableCell>{schedule.hour}</TableCell>
                    <TableCell>{schedule.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
}
