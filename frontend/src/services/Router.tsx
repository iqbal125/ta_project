import HomePage from '@/pages/HomeView';
import TodoListPage from '@/pages/TodoListView';
import TodosCreateForm from '@/pages/TodoCreateView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HeaderNav } from '@/components/HeaderNav';
import TodoViewPage from '@/pages/TodoView';
import TodoEditPage from '@/pages/TodoEditView';

export const HeaderNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Todos', path: '/todos' },
  { name: 'Create', path: '/todo/create' }
];

function RoutesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <HeaderNav links={HeaderNavLinks} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todos" element={<TodoListPage />} />
          <Route path="/todo/create" element={<TodosCreateForm />} />
          <Route path="/todo/:id" element={<TodoViewPage />} />
          <Route path="/todo/:id/edit" element={<TodoEditPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default RoutesPage;
