import React, { useState } from 'react';
import { Button, Dialog, Text, Flex } from '@radix-ui/themes';
import axios from 'axios';
import Spinner from './Spinner.jsx';

function TodoSummary({ todos }) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSummarize = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/summarize`);
      setSummary(response.data.summary);
      setOpen(true);
    } catch (error) {
      console.error('Error summarizing todos:', error);
      alert('Failed to summarize todos');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex direction="column" gap="2">
      <Button onClick={handleSummarize} disabled={isLoading || !todos.length}>
        {isLoading ? <Spinner /> : 'Summarize & Send to Slack'}
      </Button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Content>
          <Dialog.Title>Todo Summary</Dialog.Title>
          <Dialog.Description>{summary || 'No summary available.'}</Dialog.Description>
          <Flex justify="end" mt="4">
            <Dialog.Close>
              <Button variant="soft">Close</Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
}

export default TodoSummary;