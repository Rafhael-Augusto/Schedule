import AddItemButton from "@/components/addItem/addItem";
import Menu from "@/components/menu/menu";
import Schedule from "@/components/schedule/schedule";

export default function Home() {
  return (
    <div className="relative h-screen">
      <Menu />
      <Schedule />
      <div className="absolute  bottom-8 right-8">
        <AddItemButton />
      </div>
    </div>
  );
}
