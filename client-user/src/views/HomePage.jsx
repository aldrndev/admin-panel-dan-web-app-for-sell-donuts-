import Navbar from '../components/Navbar';
import Carousell from '../components/Carousell';
import ItemsPage from './ItemsPage';

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-background-content">
        <div className="mx-auto px-4 w-[75vw]">
          <Carousell />
          <section className="mt-10 flex gap-6">
            <main className="flex-1  p-4 shadow-lg">
              <ItemsPage />
            </main>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
