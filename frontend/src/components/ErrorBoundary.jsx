import React, { Component } from 'react';
import { Text, Flex } from '@radix-ui/themes';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Flex direction="column" align="center" gap="2">
          <Text color="red">Something went wrong.</Text>
        </Flex>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;