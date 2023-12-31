import { useForm } from "@mantine/form";
import { Modal, Group, Button, TextInput, Textarea } from "@mantine/core";
import { useState } from "react";
import { ENDPOINT, Todo } from "../App";
import { KeyedMutator } from "swr";

type Props = {
  mutate: KeyedMutator<Todo[]>;
};

const AddTodo = ({ mutate }: Props) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      body: "",
    },
  });

  async function createTodo(values: { title: string; body: string }) {
    const updated = await fetch(`${ENDPOINT}/api/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    mutate(updated);
    form.reset();
    setOpen(false);
  }

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What do you want to do?"
            {...form.getInputProps("Title")}
          />
          <Textarea
            required
            mb={12}
            label="Body"
            placeholder="Tell me more..."
            {...form.getInputProps("Body")}
          />
          <Button type="submit">Create Todo</Button>
        </form>
      </Modal>
      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          Add Todo!
        </Button>
      </Group>
    </>
  );
};

export default AddTodo;
