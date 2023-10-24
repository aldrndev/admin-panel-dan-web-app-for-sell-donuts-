import { useState } from 'react';
import CategoriesTable from '../components/CategoriesTable';
import AddCategoryModal from '../components/AddCategoryModal';

const CategoriesPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="p-8 max-w-full mx-auto mt-5">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
          Categories List
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg"
        >
          + Add New Category
        </button>
      </div>

      {/* Modal */}
      <AddCategoryModal showModal={showModal} setShowModal={setShowModal} />

      {/* table */}
      <CategoriesTable />
    </div>
  );
};

export default CategoriesPage;
