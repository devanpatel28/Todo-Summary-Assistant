import React, { useState } from 'react';
import { Flex, TextField, Button } from '@radix-ui/themes';
import axios from 'axios';
import Spinner from './Spinner.jsx';

function TodoForm({ setTodos }) {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/todos`, { title });
      setTodos((prev) => [...prev, response.data]);
      setTitle('');
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Failed to add todo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex gap="2" align="center">
        <TextField.Root
          placeholder="Add a todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
          className="w-full"
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : 'Add Todo'}
        </Button>
      </Flex>
    </form>
  );
}

export default TodoForm;