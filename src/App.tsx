import { Route, Routes } from 'react-router-dom';
import { RecipesListPage } from './pages/RecipesListPage';
import { RecipeItemPage } from './pages/RecipeItemPage';
import { Error404Page } from './pages/Error404Page';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />

      <main className="main">
        <Routes>
          <Route path="/" element={<RecipesListPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeItemPage />} />
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
