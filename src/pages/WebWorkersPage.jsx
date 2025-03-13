import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, TextField } from '@mui/material';

const WebWorkersPage = () => {
  const [worker, setWorker] = useState(null);
  const [result, setResult] = useState('');
  const [input, setInput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Create worker
  const createWorker = () => {
    const workerCode = `
      self.onmessage = function(e) {
        const data = e.data;
        
        // Simulate heavy computation
        let result = 0;
        for(let i = 0; i < 1000000000; i++) {
          result += Math.random();
        }
        
        self.postMessage({
          type: 'result',
          data: result,
          input: data
        });
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const newWorker = new Worker(workerUrl);
    
    newWorker.onmessage = (e) => {
      setResult(e.data.data);
      setIsRunning(false);
    };

    newWorker.onerror = (error) => {
      console.error('Worker error:', error);
      setIsRunning(false);
    };

    setWorker(newWorker);
  };

  // Start worker
  const startWorker = () => {
    if (worker) {
      setIsRunning(true);
      worker.postMessage(input);
    }
  };

  // Stop worker
  const stopWorker = () => {
    if (worker) {
      worker.terminate();
      setIsRunning(false);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (worker) {
        worker.terminate();
      }
    };
  }, [worker]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Web Workers Demo
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          What are Web Workers?
        </Typography>
        <Typography paragraph>
          Web Workers are a way to run scripts in background threads. They allow you to perform 
          heavy computations without blocking the main thread, which keeps the UI responsive.
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Limitations
        </Typography>
        <Typography component="ul" paragraph>
          <li>Cannot directly access the DOM</li>
          <li>Cannot use window object</li>
          <li>Cannot use document object</li>
          <li>Cannot use parent object</li>
          <li>Cannot use alert(), confirm(), or prompt()</li>
          <li>Cannot access localStorage or sessionStorage</li>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Worker Demo
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            label="Input for worker"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={createWorker}
              disabled={worker !== null}
            >
              Create Worker
            </Button>
            
            <Button 
              variant="contained" 
              color="primary"
              onClick={startWorker}
              disabled={!worker || isRunning}
            >
              Start Worker
            </Button>
            
            <Button 
              variant="contained" 
              color="error"
              onClick={stopWorker}
              disabled={!worker || !isRunning}
            >
              Stop Worker
            </Button>
          </Box>
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Worker Status: {isRunning ? 'Running' : 'Stopped'}
          </Typography>
          <Typography variant="subtitle1">
            Result: {result}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default WebWorkersPage; 