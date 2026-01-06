import { create } from "zustand";
import { persist } from "zustand/middleware";

type schedule = {
  name: string;
  hour: string;
  date: string;
  id: string;
};

type types = {
  schedules: schedule[];
  addSchedule: (newSchedule: schedule) => void;
  removeSchedule: (removedSchedule: string) => void;
  findSchedule: (id: string) => schedule | undefined;
  updateSchedule: (updatedSchedule: schedule) => unknown;
};

export const useSchedules = create<types>()(
  persist(
    (set, get) => ({
      schedules: [],
      addSchedule: (newSchedule) =>
        set((state) => ({ schedules: [...state.schedules, newSchedule] })),
      removeSchedule: (removedSchedule) =>
        set((state) => ({
          schedules: state.schedules.filter((item) => {
            return item.id !== removedSchedule;
          }),
        })),
      updateSchedule: (updatedSchedule) =>
        set((state) => ({
          schedules: state.schedules.map((item) =>
            item.id === updatedSchedule.id
              ? { ...item, ...updatedSchedule }
              : item
          ),
        })),
      findSchedule: (id) =>
        get().schedules.find((schedule) => schedule.id === id),
    }),
    {
      name: "schedules-storage",
    }
  )
);
