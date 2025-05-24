import React from 'react';
import { Flex } from '@radix-ui/themes';

function Spinner() {
  return (
    <Flex align="center" justify="center">
      <div className="spinner" />
    </Flex>
  );
}

export default Spinner;