import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import WebSocketPage from '../WebSocketPage';

describe('WebSocketPage', () => {
  test('renders WebSocket page', () => {
    render(<WebSocketPage />);
    expect(screen.getByText('WebSockets')).toBeInTheDocument();
  });

  test('displays Connect button', () => {
    render(<WebSocketPage />);
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });

  test('displays Disconnect button when connected', () => {
    render(<WebSocketPage />);
    const connectButton = screen.getByText('Connect');
    fireEvent.click(connectButton);
    expect(screen.getByText('Disconnect')).toBeInTheDocument();
  });

  test('displays message input field', () => {
    render(<WebSocketPage />);
    expect(screen.getByPlaceholderText('Type a message...')).toBeInTheDocument();
  });

  test('displays file selection button', () => {
    render(<WebSocketPage />);
    expect(screen.getByRole('button', { name: /select file/i })).toBeInTheDocument();
  });

  test('displays explanation text', () => {
    render(<WebSocketPage />);
    expect(screen.getByText(/What are WebSockets?/)).toBeInTheDocument();
    expect(screen.getByText(/Key Characteristics:/)).toBeInTheDocument();
  });

  test('displays implementation example', () => {
    render(<WebSocketPage />);
    expect(screen.getByText(/Implementation Example/)).toBeInTheDocument();
    expect(screen.getByText(/Client-side implementation/)).toBeInTheDocument();
  });
}); 