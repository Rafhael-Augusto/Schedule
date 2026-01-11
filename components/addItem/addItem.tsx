"use client";

import { useState } from "react";

import { CalendarPlus } from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

import FieldComponent from "../field/field";

export default function AddItemButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={() => handleClick()} variant="ghost">
        <CalendarPlus className="size-10" />
      </Button>

      <Dialog open={isOpen} onOpenChange={(e) => handleClick()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agendar manualmente</DialogTitle>
          </DialogHeader>

          <div>
            <FieldComponent setOpen={setIsOpen} />
          </div>

          <DialogFooter className="sm:justify-end">
            <DialogDescription className="sr-only">
              Adicionar agenda manualmente
            </DialogDescription>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
