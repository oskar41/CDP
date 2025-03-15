import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const PureFunctionsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Pure Functions
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          What is a Pure Function?
        </Typography>
        <Typography paragraph>
          A pure function is a function that always returns the same output for the same input and has no side effects.
          It doesn't modify any external state or data outside its scope.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Key Characteristics:
        </Typography>
        <Typography component="ul">
          <li>Same input always produces same output (deterministic)</li>
          <li>No side effects (doesn't modify external state)</li>
          <li>Doesn't depend on external state</li>
          <li>Doesn't mutate its parameters</li>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Examples
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          1. Pure Function:
        </Typography>
        <Box component="pre" sx={{ 
          bgcolor: 'black', 
          color: 'white', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto'
        }}>
          {`// Pure function
function add(a, b) {
    return a + b;
}

// Pure function
function calculateTotal(items) {
    return items.reduce((total, item) => total + item.price, 0);
}`}
        </Box>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          2. Impure Functions (with side effects):
        </Typography>
        <Box component="pre" sx={{ 
          bgcolor: 'black', 
          color: 'white', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto'
        }}>
          {`// Impure - modifies external state
let total = 0;
function addToTotal(value) {
    total += value; // Side effect
    return total;
}

// Impure - depends on external state
function calculateDiscount(price) {
    return price * window.discountRate; // External dependency
}

// Impure - mutates parameter
function addItem(cart, item) {
    cart.items.push(item); // Mutates input
    return cart;
}`}
        </Box>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          3. Converting Impure to Pure:
        </Typography>
        <Box component="pre" sx={{ 
          bgcolor: 'black', 
          color: 'white', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto'
        }}>
          {`// Pure version - returns new state
function addToTotal(currentTotal, value) {
    return currentTotal + value;
}

// Pure version - takes dependency as parameter
function calculateDiscount(price, discountRate) {
    return price * discountRate;
}

// Pure version - returns new object
function addItem(cart, item) {
    return {
        ...cart,
        items: [...cart.items, item]
    };
}`}
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Benefits of Pure Functions
        </Typography>
        <Typography component="ul">
          <li>Easier to test - same input always produces same output</li>
          <li>Easier to debug - no hidden effects or dependencies</li>
          <li>Predictable behavior - function output only depends on its inputs</li>
          <li>Cacheable - results can be memoized</li>
          <li>Thread-safe - no shared state to worry about</li>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Common Use Cases
        </Typography>
        <Typography component="ul">
          <li>Data transformations</li>
          <li>Calculations and computations</li>
          <li>State updates in Redux reducers</li>
          <li>React components (should be mostly pure)</li>
          <li>Utility functions</li>
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          While not all functions can be pure (especially in real-world applications that need to handle side effects), 
          striving to write pure functions where possible leads to more maintainable and reliable code.
        </Typography>
      </Paper>
    </Box>
  );
};

export default PureFunctionsPage; 