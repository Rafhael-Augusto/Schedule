import AddItemButton from "@/components/addItem/addItem";
import ScheduleTable from "@/components/scheduleTable/scheduleTable";

export default function Home() {
  return (
    <div className="relative h-[90%]">
      <ScheduleTable />
      <div className="absolute bottom-0 right-8">
        <AddItemButton />
      </div>
    </div>
  );
}
