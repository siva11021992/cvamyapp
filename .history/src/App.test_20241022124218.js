import { render, screen } from '@testing-library/react';
// import App from './App';
import ContextApi from './ContextApi';

test('renders learn react link', () => {
  render(<ContextApi />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  expect(screen.queryByText(/Hi/)).toBeInTheDocument();
});
