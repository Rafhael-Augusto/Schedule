import { Button } from "../ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

import { FileUp } from "lucide-react";
import { CircleQuestionMark as QuestionMark } from "lucide-react";

import Menu from "../menu/menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function ImportCsv() {
  const scheduleExample = {
    date: "12/12",
    hour: "16:00",
    name: "Rafhael",
    id: "randomshit",
  };

  return (
    <div>
      <Menu />

      <Empty className="border border-dashed m-8">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileUp />
          </EmptyMedia>

          <EmptyTitle>Upload de arquivo .csv</EmptyTitle>
          <EmptyDescription>
            Faca upload de arquivos .csv para fazer agendas automaticamente
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center">
          <Button variant="outline">Upload</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <QuestionMark />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Estrutura do arquivo</DialogTitle>
              </DialogHeader>

              <div className="my-8">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center"> Data</TableHead>
                      <TableHead className="text-center"> Hora</TableHead>
                      <TableHead className="text-center"> Nome</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody className="text-center">
                    <TableRow key={scheduleExample.id} className={`mb-4`}>
                      <TableCell>{scheduleExample.date}</TableCell>
                      <TableCell>{scheduleExample.hour}</TableCell>
                      <TableCell>{scheduleExample.name}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <DialogFooter className="sm:justify-end">
                <DialogDescription className="text-transparent">
                  Estrutura de como o arquivo csv deve ser
                </DialogDescription>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Continuar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </EmptyContent>
      </Empty>
    </div>
  );
}
