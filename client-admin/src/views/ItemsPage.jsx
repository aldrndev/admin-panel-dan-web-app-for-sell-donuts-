import { useState, useEffect } from 'react';
import AddEditItemModal from '../components/AddEditItemModal';
import DetailItemModal from '../components/DetailItemModal';
import ItemsTable from '../components/ItemsTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, deleteItem } from '../stores/actions/actionCreators';
import Swal from 'sweetalert2';

const ItemsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modalMode, setModalMode] = useState(''); // 'add', 'edit', or 'detail'

  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  const editItem = (item) => {
    dispatch(fetchIngredients(item.id));
    setCurrentItem(item);
    setModalMode('edit');
    setShowModal(true);
  };

  const showDetail = (item) => {
    dispatch(fetchIngredients(item.id));
    setCurrentItem(item);
    setModalMode('detail');
    setShowModal(true);
  };

  const deletedItem = (itemId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteItem(itemId));
      }
    });
  };

  let ModalComponent = null;

  if (modalMode === 'add' || modalMode === 'edit') {
    ModalComponent = AddEditItemModal;
  } else if (modalMode === 'detail') {
    ModalComponent = DetailItemModal;
  }

  useEffect(() => {
    if (
      ingredients &&
      modalMode === 'edit' &&
      JSON.stringify(ingredients) !== JSON.stringify(currentItem.ingredients)
    ) {
      const newItem = {
        ...currentItem,
        ingredients: ingredients,
      };
      setCurrentItem(newItem);
    }
  }, [ingredients, modalMode, currentItem]);

  return (
    <>
      <div className="p-8 max-w-full mx-auto mt-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">
            Items List
          </h2>
          <button
            onClick={() => {
              setCurrentItem(null);
              setModalMode('add');
              setShowModal(true);
            }}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg"
          >
            + Add New Item
          </button>
        </div>

        <ItemsTable
          editItem={editItem}
          deletedItem={deletedItem}
          showDetail={showDetail}
        />

        {ModalComponent && (
          <ModalComponent
            showModal={showModal}
            modalMode={modalMode}
            currentItem={currentItem}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </>
  );
};

export default ItemsPage;
