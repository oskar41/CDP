import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, TextField, List, ListItem, ListItemText, Stack, Chip } from '@mui/material';
import { CloudUpload as UploadIcon } from '@mui/icons-material';

const WebSocketPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [connectionState, setConnectionState] = useState('CLOSED');

  // Function to convert Blob to base64
  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Function to convert connection state to text
  const getConnectionStateText = (state) => {
    switch (state) {
      case WebSocket.CONNECTING:
        return 'CONNECTING';
      case WebSocket.OPEN:
        return 'OPEN';
      case WebSocket.CLOSING:
        return 'CLOSING';
      case WebSocket.CLOSED:
        return 'CLOSED';
      default:
        return 'UNKNOWN';
    }
  };

  // Function to get state color
  const getConnectionStateColor = (state) => {
    switch (state) {
      case 'CONNECTING':
        return 'warning';
      case 'OPEN':
        return 'success';
      case 'CLOSING':
        return 'error';
      case 'CLOSED':
        return 'default';
      default:
        return 'default';
    }
  };

  // Initialize WebSocket connection
  const connectWebSocket = () => {
    const socket = new WebSocket('wss://echo.websocket.org');

    socket.onopen = () => {
      setIsConnected(true);
      addMessage('System', 'Connected to WebSocket server');
    };

    socket.onmessage = async (event) => {
      if (typeof event.data === 'string' && event.data.startsWith('data:image/')) {
        addMessage('Server', `Received image`, event.data);
      } else {
        addMessage('Server', event.data);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
      addMessage('System', 'Disconnected from WebSocket server');
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      addMessage('System', 'WebSocket error occurred');
    };

    setWs(socket);
  };

  // Close WebSocket connection
  const disconnectWebSocket = () => {
    if (ws) {
      ws.close();
      setWs(null);
    }
  };

  // Send message through WebSocket
  const sendMessage = () => {
    if (ws && isConnected && inputMessage.trim()) {
      ws.send(inputMessage);
      addMessage('You', inputMessage);
      setInputMessage('');
    }
  };

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Send Blob through WebSocket
  const sendBlob = async () => {
    if (ws && isConnected && selectedFile) {
      try {
        const base64Data = await blobToBase64(selectedFile);
        ws.send(base64Data);
        addMessage('You', `Sent file: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(2)} KB)`);
        setSelectedFile(null);
      } catch (error) {
        console.error('Error converting file to base64:', error);
        addMessage('System', 'Error sending file');
      }
    }
  };

  // Add message to the list
  const addMessage = (sender, text, base64Data = null) => {
    setMessages(prev => [...prev, {
      id: Date.now() + Math.random(),
      sender,
      text,
      base64Data,
      timestamp: new Date().toISOString()
    }]);
  };

  // Tracking connection state
  useEffect(() => {
    if (ws) {
      setConnectionState(getConnectionStateText(ws.readyState));
    } else if (isConnected) {
      setConnectionState(getConnectionStateText(WebSocket.CLOSING));
    } else {
      setConnectionState(getConnectionStateText(WebSocket.CLOSED));
    }
  }, [ws?.readyState, isConnected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        WebSockets
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          What are WebSockets?
        </Typography>
        <Typography paragraph>
          WebSocket is a communication protocol that provides full-duplex communication channels over a single TCP connection. 
          It allows for real-time, two-way communication between client and server, making it ideal for applications that 
          require instant updates and live data.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Key Characteristics:
        </Typography>
        <Typography component="ul">
          <li>Full-duplex communication (both ways simultaneously)</li>
          <li>Single persistent connection</li>
          <li>Lower latency than HTTP polling</li>
          <li>Built-in support in modern browsers</li>
          <li>Efficient for real-time applications</li>
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
const socket = new WebSocket('wss://your-server.com');

socket.onopen = () => {
    console.log('Connected to WebSocket server');
};

socket.onmessage = (event) => {
    console.log('Received:', event.data);
};

socket.onclose = () => {
    console.log('Disconnected from WebSocket server');
};

// Send message
socket.send('Hello Server!');

// Send Blob
const blob = new Blob(['Hello from Blob!'], { type: 'text/plain' });
socket.send(blob);

// Server-side implementation (Node.js with ws library)
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log('Received:', message);
        ws.send('Server received: ' + message);
    });
});`}
        </Box>

        <Typography variant="subtitle1" gutterBottom>
          Live Demo:
        </Typography>
        <Stack spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button 
              variant="contained" 
              onClick={connectWebSocket}
              disabled={isConnected}
              sx={{ mr: 2 }}
            >
              Connect
            </Button>
            <Button 
              variant="contained" 
              color="error"
              onClick={disconnectWebSocket}
              disabled={!isConnected}
              sx={{ mr: 2 }}
            >
              Disconnect
            </Button>
            <Chip 
              label={`Connection State: ${connectionState}`}
              color={getConnectionStateColor(connectionState)}
              variant="outlined"
            />
          </Box>

          <Box>
            <TextField
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={!isConnected}
              sx={{ mr: 2 }}
            />
            <Button 
              variant="contained" 
              onClick={sendMessage}
              disabled={!isConnected || !inputMessage.trim()}
            >
              Send Message
            </Button>
          </Box>

          <Box>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadIcon />}
              disabled={!isConnected}
              sx={{ mr: 2 }}
            >
              Select File
              <input
                type="file"
                hidden
                onChange={handleFileSelect}
              />
            </Button>
            <Button 
              variant="contained" 
              onClick={sendBlob}
              disabled={!isConnected || !selectedFile}
            >
              Send File
            </Button>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
              </Typography>
            )}
          </Box>
        </Stack>

        <List>
          {messages.map((message) => (
            <ListItem key={message.id}>
              <ListItemText 
                primary={`${message.sender}: ${message.text}`}
                secondary={
                  <Box>
                    <Typography variant="caption">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </Typography>
                    {message.base64Data && message.base64Data.startsWith('data:image/') && (
                      <Box sx={{ mt: 1 }}>
                        <img 
                          src={message.base64Data} 
                          alt="Received" 
                          style={{ maxWidth: '200px', maxHeight: '200px' }} 
                        />
                      </Box>
                    )}
                  </Box>
                }
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
          <li>Real-time bidirectional communication</li>
          <li>Lower latency than HTTP polling</li>
          <li>Reduced server load</li>
          <li>Efficient for frequent updates</li>
          <li>Built-in reconnection handling</li>
        </Typography>

        <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
          Disadvantages:
        </Typography>
        <Typography component="ul">
          <li>Requires special server setup</li>
          <li>May be blocked by some firewalls</li>
          <li>More complex than HTTP</li>
          <li>Not suitable for all use cases</li>
          <li>Requires connection management</li>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          When to Use WebSockets
        </Typography>
        <Typography component="ul">
          <li>Real-time chat applications</li>
          <li>Live data streaming</li>
          <li>Online gaming</li>
          <li>Collaborative tools</li>
          <li>Financial trading platforms</li>
          <li>Live notifications</li>
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          WebSockets are ideal for applications that require real-time, bidirectional communication. 
          They provide better performance and lower latency compared to traditional HTTP polling or 
          long-polling techniques, especially for applications with frequent updates.
        </Typography>
      </Paper>
    </Box>
  );
};

export default WebSocketPage; 