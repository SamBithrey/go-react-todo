import { Box, List, ThemeIcon } from "@mantine/core";
import useSWR from "swr";
import "./App.css";
import AddTodo from "./components/AddTodo";
import { CheckCircleFillIcon, CircleSlashIcon } from "@primer/octicons-react";

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT = "http://localhost:4000";

const fetcher = (url: string) =>
  fetch(`${ENDPOINT}/${url}`).then((res) => res.json());

function App() {
  const { data, mutate } = useSWR<Todo[]>("api/todos", fetcher);

  async function markTodoDone(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH",
    }).then((res) => res.json());

    mutate(updated);
  }

  async function deleteTodo(id: number) {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/delete`, {
      method: "DELETE",
    }).then((res) => res.json());

    mutate(updated);
  }

  return (
    <Box
      sx={() => ({
        padding: "2rem",
        width: "100%",
        maxWidth: "40rem",
        margin: "0 auto",
      })}
    >
      <List spacing="xs" size="sm" mb={12} center>
        {data?.map((todo) => (
          <List.Item
            key={`todo__${todo.id}`}
            icon={
              todo.done ? (
                <>
                  <ThemeIcon
                    color="teal"
                    size={24}
                    radius="xl"
                    onClick={() => markTodoDone(todo.id)}
                  >
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                  <ThemeIcon
                    color="red"
                    size={24}
                    radius="xl"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <CircleSlashIcon size={20} />
                  </ThemeIcon>
                </>
              ) : (
                <>
                  <ThemeIcon
                    color="gray"
                    size={24}
                    radius="xl"
                    onClick={() => markTodoDone(todo.id)}
                  >
                    <CheckCircleFillIcon size={20} />
                  </ThemeIcon>
                  <ThemeIcon
                    color="red"
                    size={24}
                    radius="xl"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    <CircleSlashIcon size={20} />
                  </ThemeIcon>
                </>
              )
            }
          >
            {todo.title}
          </List.Item>
        ))}
      </List>
      <AddTodo mutate={mutate} />
    </Box>
  );
}

export default App;
