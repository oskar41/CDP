import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LongPollingPage from '../LongPollingPage';

describe('LongPollingPage', () => {
  test('renders Long Polling page', () => {
    render(<LongPollingPage />);
    expect(screen.getByText('Long Polling')).toBeInTheDocument();
  });

  test('displays Start Polling button', () => {
    render(<LongPollingPage />);
    expect(screen.getByText('Start Polling')).toBeInTheDocument();
  });

  test('displays Stop Polling button when polling is active', () => {
    render(<LongPollingPage />);
    const startButton = screen.getByText('Start Polling');
    fireEvent.click(startButton);
    expect(screen.getByText('Stop Polling')).toBeInTheDocument();
  });

  test('displays explanation text', () => {
    render(<LongPollingPage />);
    expect(screen.getByText(/What is Long Polling?/)).toBeInTheDocument();
    expect(screen.getByText(/Key Characteristics:/)).toBeInTheDocument();
  });

  test('displays implementation example', () => {
    render(<LongPollingPage />);
    expect(screen.getByText(/Implementation Example/)).toBeInTheDocument();
    expect(screen.getByText(/Client-side implementation/)).toBeInTheDocument();
  });
}); 