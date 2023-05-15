import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const MockApp = () =>{
  return(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}

test('should render an array of ten photos', async() => {
    render(<MockApp />);
      await waitFor(()=>{
        const MockPhotoArray = screen.getAllByRole('img');
        expect(MockPhotoArray).toHaveLength(10);
    });
});
it('should render three buttons (forward, search, and `random`s), but not four (no "back" button (yet))', async() => {
  render(<MockApp />);
    await waitFor(()=>{
        const buttons = screen.getAllByRole('button')
        expect(buttons).toHaveLength(3)
      });
  });
