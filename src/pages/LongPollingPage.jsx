import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, List, ListItem, ListItemText } from '@mui/material';

const LongPollingPage = () => {
  const [messages, setMessages] = useState([]);
  const [isPolling, setIsPolling] = useState(false);

  // Simulate server response
  const simulateServerResponse = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: Date.now(),
          text: `Message ${messages.length + 1}`,
          timestamp: new Date().toISOString()
        });
      }, 3000); // Simulate 3 second delay
    });
  };

  // Start long polling
  const startPolling = () => {
    setIsPolling(true);
  };

  // Stop long polling
  const stopPolling = () => {
    setIsPolling(false);
  };

  // Handle polling effect
  useEffect(() => {
    let isActive = true;

    const poll = async () => {
      if (!isPolling) return;

      try {
        const response = await simulateServerResponse();
        if (isActive) {
          setMessages(prev => [...prev, response]);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }

      if (isPolling && isActive) {
        poll();
      }
    };

    if (isPolling) {
      poll();
    }

    return () => {
      isActive = false;
    };
  }, [isPolling]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Long Polling
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          What is Long Polling?
        </Typography>
        <Typography paragraph>
          Long polling is a technique where the client makes a request to the server and keeps the connection open 
          until the server has data to send back. Once the server responds, the client immediately makes another request, 
          creating a continuous connection.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Key Characteristics:
        </Typography>
        <Typography component="ul">
          <li>Client makes a request and waits for server response</li>
          <li>Server holds the request until new data is available</li>
          <li>Connection is closed and immediately reopened after response</li>
          <li>Better than regular polling for real-time updates</li>
          <li>More efficient than WebSocket for infrequent updates</li>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Implementation Example
        </Typography>
        <Box component="pre" sx={{ 
          bgcolor: 'black', 
          color: 'white', 
          p: 2, 
          borderRadius: 1,
          overflow: 'auto',
          mb: 2
        }}>
          {`// Client-side implementation
async function longPoll() {
    while (true) {
        try {
            const response = await fetch('/api/messages');
            const data = await response.json();
            // Handle new data
            console.log(data);
        } catch (error) {
            console.error('Polling error:', error);
        }
    }
}

// Server-side implementation (Node.js/Express)
app.get('/api/messages', async (req, res) => {
    try {
        // Wait for new messages
        const messages = await waitForNewMessages();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});`}
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Live Demo:
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Button 
            variant="contained" 
            onClick={startPolling}
            disabled={isPolling}
            sx={{ mr: 2 }}
          >
            Start Polling
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={stopPolling}
            disabled={!isPolling}
          >
            Stop Polling
          </Button>
        </Box>

        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemText 
                primary={message.text}
                secondary={new Date(message.timestamp).toLocaleTimeString()}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Pros and Cons
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Advantages:
        </Typography>
        <Typography component="ul">
          <li>Works through firewalls and proxies</li>
          <li>No special server setup required</li>
          <li>Good for infrequent updates</li>
          <li>Fallback for WebSocket when not available</li>
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Disadvantages:
        </Typography>
        <Typography component="ul">
          <li>Higher server load than WebSocket</li>
          <li>More network overhead</li>
          <li>Not suitable for very frequent updates</li>
          <li>Connection overhead on each request</li>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          When to Use Long Polling
        </Typography>
        <Typography component="ul">
          <li>Real-time notifications with infrequent updates</li>
          <li>Chat applications with low message frequency</li>
          <li>When WebSocket is not available or blocked</li>
          <li>Simple real-time features in legacy applications</li>
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          For modern applications with frequent real-time updates, WebSocket is generally preferred. 
          However, long polling remains a viable option for simpler use cases or when WebSocket 
          is not available.
        </Typography>
      </Paper>
    </Box>
  );
};

export default LongPollingPage; 