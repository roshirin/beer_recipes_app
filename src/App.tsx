import { Route, Routes } from 'react-router-dom';
import { RecipesListPage } from './pages/RecipesListPage';
import { RecipeItemPage } from './pages/RecipeItemPage';
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
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
