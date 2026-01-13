"use client";

import { useState } from "react";

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

import FixedFieldComponent from "../fixedField/fixedField";

export default function AddFixedItemButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button onClick={() => handleClick()}>Criar agendamento fixo</Button>

      <Dialog open={isOpen} onOpenChange={(e) => handleClick()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar agendamento fixo</DialogTitle>
          </DialogHeader>

          <div>
            <FixedFieldComponent setOpen={setIsOpen} />
          </div>

          <DialogFooter className="sm:justify-end">
            <DialogDescription className="sr-only">
              Criar agendamentos fixos
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
