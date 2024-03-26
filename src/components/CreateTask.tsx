"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { api } from "@/trpc/react";
import { toast } from "sonner";

const CreateTask = () => {
  const [taskName, setTaskName] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  const createTaskMutate = api.task.create.useMutation();

  const createTask = async () => {
    toast.promise(
      createTaskMutate.mutateAsync({ name: taskName, completeBy: dueDate }),
      {
        loading: "Creating task...",
        success: () => {
          setTaskName("");
          setDueDate("");
          return "Task created successfully";
        },
        error: "Failed to create task",
      },
    );
  };

  return (
    <div className="flex space-x-[8px]">
      <Input
        type="text"
        placeholder="Enter task name"
        className="text-slate-500"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Input
        type="datetime-local"
        placeholder="Due date"
        className="text-slate-500"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <Button onClick={createTask}>Create Task</Button>
    </div>
  );
};

export default CreateTask;
