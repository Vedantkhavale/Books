import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import BookSearch from './Components/BookSearch';
import BookList from './Components/BookList';
import AddBook from './Components/AddBook';

function App() {
  return (
    <div >
         <Router>
         <BookSearch />
          <Routes>
            <Route path='/' />
            <Route path='/list' element={<BookList/>}/>
            <Route path='*' element={<div>404 - Page Not Found</div>}/>
            <Route path='/addBook' element={<AddBook />} />
          </Routes>
         </Router>
    </div>
  );
}

export default App;
