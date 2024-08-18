import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TextInput from '../components/TextInput';
import axiosClient from '@/services/axios';
import { vi, describe, it, afterEach, expect, Mock } from 'vitest';

vi.mock('@/services/axios');

describe('TextInput Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('validates input and shows error toast on invalid submission', async () => {
    render(<TextInput />);

    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);

    await waitFor(() => {
      const inputErrorText = 'Input Text must be at least 3 characters';
      expect(screen.getByText(inputErrorText)).toBeInTheDocument();
    });
  });

  it('submits the form and displays sentiment analysis result', async () => {
    const mockSentimentResponse = { data: { sentiment: 'positive' } };
    (axiosClient.post as Mock).mockResolvedValueOnce(mockSentimentResponse);

    render(<TextInput />);

    const inputElement = screen.getByPlaceholderText('Chat with CynchAI...');
    const buttonElement = screen.getByRole('button');

    fireEvent.change(inputElement, { target: { value: 'Great day' } });
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(axiosClient.post).toHaveBeenCalledWith('/sentiment', { text: 'Great day' });
      expect(screen.getByText('Sentiment Analysis Result:')).toBeInTheDocument();
      expect(screen.getByText('positive')).toBeInTheDocument();
    });
  });
});
