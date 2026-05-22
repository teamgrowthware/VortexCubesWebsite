import './complete-styles.css';
import './animations.css';
import './responsive-fixes.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { PageRouter } from './sitePages';

function App() {
  const pathname = window.location.pathname;

  return (
    <div className="App w-full">
      <Header />
      <main className="w-full page-content">
        <PageRouter pathname={pathname} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
