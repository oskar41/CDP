import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import WebWorkersPage from '../WebWorkersPage';

// Mock URL
global.URL = {
  createObjectURL: jest.fn(() => 'mock-worker-url'),
  revokeObjectURL: jest.fn()
};

// Mock Worker
class MockWorker {
  constructor() {
    this.onmessage = null;
    this.onerror = null;
  }

  postMessage(data) {
    // Simulate worker processing
    setTimeout(() => {
      if (this.onmessage) {
        this.onmessage({
          data: {
            type: 'result',
            data: 42.123456789,
            input: data
          }
        });
      }
    }, 100);
  }

  terminate() {}
}

global.Worker = MockWorker;

describe('WebWorkersPage', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders Web Workers page', () => {
    render(<WebWorkersPage />);
    expect(screen.getByText('Web Workers Demo')).toBeInTheDocument();
  });

  test('displays Create Worker button', () => {
    render(<WebWorkersPage />);
    expect(screen.getByText('Create Worker')).toBeInTheDocument();
  });

  test('displays Start Worker button after creating worker', () => {
    render(<WebWorkersPage />);
    const createButton = screen.getByText('Create Worker');
    fireEvent.click(createButton);
    expect(screen.getByText('Start Worker')).toBeInTheDocument();
  });

  test('displays Stop Worker button when worker is running', () => {
    render(<WebWorkersPage />);
    const createButton = screen.getByText('Create Worker');
    fireEvent.click(createButton);
    const startButton = screen.getByText('Start Worker');
    fireEvent.click(startButton);
    expect(screen.getByText('Stop Worker')).toBeInTheDocument();
  });

  test('displays input field for worker', () => {
    render(<WebWorkersPage />);
    expect(screen.getByLabelText('Input for worker')).toBeInTheDocument();
  });

  test('displays explanation text', () => {
    render(<WebWorkersPage />);
    expect(screen.getByText(/What are Web Workers?/)).toBeInTheDocument();
    expect(screen.getByText(/Limitations/)).toBeInTheDocument();
  });

  test('displays worker status', () => {
    render(<WebWorkersPage />);
    expect(screen.getByText(/Worker Status:/)).toBeInTheDocument();
  });

  test('displays result section', () => {
    render(<WebWorkersPage />);
    expect(screen.getByText(/Result:/)).toBeInTheDocument();
  });

  test('displays worker result after execution', async () => {
    render(<WebWorkersPage />);
    
    // Create worker
    const createButton = screen.getByText('Create Worker');
    fireEvent.click(createButton);
    
    // Start worker
    const startButton = screen.getByText('Start Worker');
    fireEvent.click(startButton);
    
    // Advance timers and wait for state updates
    await act(async () => {
      jest.advanceTimersByTime(100);
    });
    
    // Wait for result
    await waitFor(() => {
      const resultElement = screen.getByText(/42.123456789/);
      expect(resultElement).toBeInTheDocument();
    });
  });
}); 