import AddItemButton from "@/components/addItem/addItem";
import ScheduleTable from "@/components/scheduleTable/scheduleTable";

export default function Home() {
  return (
    <div className="relative h-screen">
      <ScheduleTable />
      <div className="absolute bottom-16 right-8">
        <AddItemButton />
      </div>
    </div>
  );
}
