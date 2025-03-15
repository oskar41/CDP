import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const IIFEPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        IIFE (Immediately Invoked Function Expression)
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          What is IIFE?
        </Typography>
        <Typography paragraph>
          IIFE is a function that runs as soon as it is defined. It's a JavaScript pattern 
          that creates a private scope and helps avoid polluting the global namespace.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Basic Syntax:
        </Typography>
        <Box component="pre" sx={{ 
          bgcolor: 'black', 
          color: 'white', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto'
        }}>
          {`(function() {
    // function code
})();

// or with arrow function
(() => {
    // function code
})();`}
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Why Use IIFE?
        </Typography>
        <Typography component="ul">
          <li>Data Encapsulation</li>
          <li>Avoiding Name Conflicts</li>
          <li>Creating Private State</li>
          <li>Isolating Variables from Global Scope</li>
          <li>One-time Initialization</li>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Usage Examples
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          1. Module with Private Data:
        </Typography>
        <Box component="pre" sx={{ 
          bgcolor: 'black', 
          color: 'white', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto'
        }}>
          {`const counter = (() => {
    let count = 0;  // private variable
    
    return {
        increment() { count++; },
        decrement() { count--; },
        getCount() { return count; }
    };
})();

counter.increment();
console.log(counter.getCount()); // 1
console.log(count); // ReferenceError: count is not defined`}
        </Box>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          2. Initialization with Checks:
        </Typography>
        <Box component="pre" sx={{ 
          bgcolor: 'black', 
          color: 'white', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto'
        }}>
          {`const config = (() => {
    const savedConfig = localStorage.getItem('config');
    try {
        return savedConfig 
            ? JSON.parse(savedConfig) 
            : { default: true };
    } catch (e) {
        console.error('Failed to parse config');
        return { default: true };
    }
})();`}
        </Box>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          3. Async IIFE:
        </Typography>
        <Box component="pre" sx={{ 
          bgcolor: 'black', 
          color: 'white', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto'
        }}>
          {`(async () => {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
})();`}
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          When NOT to Use IIFE
        </Typography>
        <Typography component="ul">
          <li>When simple function exports are sufficient</li>
          <li>When there's no need for private state</li>
          <li>When code can be organized using ES6 modules</li>
          <li>In React components for rendering logic</li>
          <li>When code becomes less readable due to IIFE</li>
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          In modern JavaScript, it's often better to use ES6 modules, classes, and block scoping 
          instead of IIFEs. However, IIFEs are still useful for specific cases, especially when 
          immediate initialization with private state is needed.
        </Typography>
      </Paper>
    </Box>
  );
};

export default IIFEPage; 