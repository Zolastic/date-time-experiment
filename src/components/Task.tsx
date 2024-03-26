import { Task } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import dayjs from "dayjs";

type Props = {
  task: Task;
};

const Task = ({ task }: Props) => {
  return (
    <div className="mb-[8px] mr-[8px]">
      <Card>
        <CardHeader>
          <CardTitle>{task.name}</CardTitle>
          <CardDescription>
            {task.description ? task.description : "No description"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Due Date: {dayjs(task.completeBy).format("DD MMM YYYY hh:mm:ss")}
          </p>
        </CardContent>
        <CardFooter>
          <p>
            Created Date: {dayjs(task.createdAt).format("DD MMM YYYY hh:mm:ss")}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Task;
