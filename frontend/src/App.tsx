import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RoutesPage from './services/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RoutesPage />
        <ToastContainer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
}

export default App;
