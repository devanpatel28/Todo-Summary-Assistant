import React, { useState, useEffect } from 'react';
import { Flex, Heading, Container } from '@radix-ui/themes';
import axios from 'axios';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import TodoSummary from './components/TodoSummary.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

function App() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  console.log('VITE_API_URL in App:', import.meta.env.VITE_API_URL);

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/todos`);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
        alert('Failed to fetch todos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array for mount-only fetch

  return (
    <Container size="2" p="4">
      <Flex direction="column" gap="4">
        <Heading size="8" align="center">Todo Summary Assistant</Heading>
        {isLoading ? (
          <Flex justify="center">Loading todos...</Flex>
        ) : (
          <ErrorBoundary>
            <TodoForm setTodos={setTodos} />
            <TodoList todos={todos} setTodos={setTodos} />
            <TodoSummary todos={todos} />
          </ErrorBoundary>
        )}
      </Flex>
    </Container>
  );
}

export default App;