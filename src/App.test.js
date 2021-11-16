import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form and submits it', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
