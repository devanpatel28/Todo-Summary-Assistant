import React, { useState } from 'react';
import { Flex, Text, Button, Card } from '@radix-ui/themes';
import axios from 'axios';
import Spinner from './Spinner.jsx';

function TodoList({ todos, setTodos }) {
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    setLoadingId(id);
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      alert('Failed to delete todo');
    } finally {
      setLoadingId(null);
    }
  };

  if (!todos.length) return <Text>No todos yet.</Text>;

  return (
    <Flex direction="column" gap="2">
      {todos.map((todo) => (
        <Card key={todo.id}>
          <Flex justify="between" align="center">
            <Text>{todo.title}</Text>
            <Button
              variant="soft"
              color="red"
              onClick={() => handleDelete(todo.id)}
              disabled={loadingId === todo.id}
            >
              {loadingId === todo.id ? <Spinner /> : 'Remove'}
            </Button>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
}

export default TodoList;