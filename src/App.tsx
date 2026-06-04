import './complete-styles.css';
import './animations.css';
import './responsive-fixes.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { PageRouter } from './sitePages';
import { ProjectModalProvider } from './contexts/ProjectModalContext';
import ProjectModal from './components/ProjectModal';

function App() {
  const pathname = window.location.pathname;
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <ProjectModalProvider>
      <div className="App w-full">
        {!isAdminRoute && <Header />}
        <main className="w-full page-content">
          <PageRouter pathname={pathname} />
        </main>
        {!isAdminRoute && <Footer />}
        {!isAdminRoute && <ProjectModal />}
      </div>
    </ProjectModalProvider>
  );
}

export default App;
