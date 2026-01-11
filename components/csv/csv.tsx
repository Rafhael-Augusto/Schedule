"use client";

import { ChangeEvent, useRef, useState } from "react";

import Papa from "papaparse";

import { FileUp } from "lucide-react";
import { CircleQuestionMark as QuestionMark } from "lucide-react";

import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";

import SchedulesPreview from "../schedulesPreview/schedulesPreview";

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
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

type schedule = {
  data: string;
  hora: string;
  nome: string;
  id: string;
};

export default function ImportCsv() {
  const uploadInputRef = useRef<HTMLInputElement | null>(null);
  const [schedules, setSchedules] = useState<schedule[]>();

  const handleUpload = () => {
    if (!uploadInputRef.current) return;

    uploadInputRef.current.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    Papa.parse<schedule>(file, {
      header: true,
      delimiter: ",",
      skipEmptyLines: true,
      complete: (result) => {
        const addUniqueId = result.data.map((item) => {
          const uniqueId = crypto.randomUUID();

          return {
            ...item,
            id: uniqueId,
          };
        });

        setSchedules(addUniqueId);
      },
    });
  };

  return (
    <div className="w-screen p-4">
      <Empty className="border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FileUp />
          </EmptyMedia>

          <EmptyTitle>Upload de arquivo .csv</EmptyTitle>
          <EmptyDescription>
            Faca upload de um arquivo .csv para fazer agendamentos
            automaticamente
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className="flex-row justify-center">
          <Button onClick={() => handleUpload()} variant="outline">
            Upload
          </Button>
          <input
            ref={uploadInputRef}
            accept=".csv"
            className="sr-only"
            type="file"
            onChange={(e) => handleFileChange(e)}
          />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost">
                <QuestionMark />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Formato do arquivo</DialogTitle>
              </DialogHeader>

              <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg p-4">
                <p>nome,data,hora</p>
                <p>Rafhael,21/07,13:00</p>
              </AspectRatio>

              <DialogFooter className="sm:justify-end">
                <DialogDescription className="sr-only">
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

      {schedules && <SchedulesPreview data={schedules} />}
    </div>
  );
}
