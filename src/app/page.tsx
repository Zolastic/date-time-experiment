import CreateTask from "@/components/CreateTask";
import Task from "@/components/Task";
import { api } from "@/trpc/server";

export default async function Home() {
  const tasks = await api.task.getAll();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#fdfbfb] to-[#ebedee] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-700 sm:text-[5rem]">
          Date-Time <span className="text-slate-400">To-do</span> App
        </h1>
        <CreateTask />
        <div className="flex flex-wrap">
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </main>
  );
}
