import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  editItem,
  fetchCategories,
} from '../stores/actions/actionCreators';
import { useState, useEffect } from 'react';

const AddEditItemModal = ({
  showModal,
  modalMode,
  currentItem,
  setShowModal,
}) => {
  const categories = useSelector((state) => state.categories.categories);
  const error = useSelector((state) => state.items.error);
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    imgUrl: '',
    categoryId: '',
  });

  const handleInputForm = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const [ingredientsField, setIngredients] = useState([]);

  const addIngredientField = () => {
    setIngredients((prevIngredients) => [...prevIngredients, { name: '' }]);
  };

  const updateIngredient = (index, value) => {
    setIngredients((prevIngredients) => {
      const newIngredients = [...prevIngredients];
      newIngredients[index] = { name: value };
      return newIngredients;
    });
  };

  const handleFormSubmit = () => {
    const payload = {
      ...form,
      ingredients: ingredientsField,
    };

    if (modalMode === 'add') {
      dispatch(addItem(payload));
    } else if (modalMode === 'edit') {
      dispatch(editItem(currentItem.id, payload));
    }
  };

  const handleSubmitAndClose = () => {
    handleFormSubmit();
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (modalMode === 'add') {
      setForm({
        name: '',
        description: '',
        price: '',
        imgUrl: '',
        categoryId: '',
      });
      setIngredients([]);
    } else if (modalMode === 'edit' && currentItem) {
      setForm({
        name: currentItem.name,
        description: currentItem.description,
        price: currentItem.price,
        imgUrl: currentItem.imgUrl,
        categoryId: currentItem.categoryId,
      });
      setIngredients(
        currentItem && currentItem.ingredients
          ? currentItem.ingredients.map((ingredient) =>
              typeof ingredient === 'string' ? { name: ingredient } : ingredient
            )
          : []
      );
    }
  }, [modalMode, currentItem]);

  return (
    showModal && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-3/4 max-w-xl overflow-y-auto max-h-[calc(100vh-5rem)]">
          <h2 className="mb-4 font-semibold flex justify-center text-2xl">
            {modalMode === 'add' && 'Add New Item'}
            {modalMode === 'edit' && 'Edit Item'}
          </h2>

          <div className="p-5">
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInputForm}
                value={form.name}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Description</label>
              <textarea
                className="w-full p-2 border rounded"
                name="description"
                value={form.description}
                onChange={handleInputForm}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                name="price"
                value={form.price}
                onChange={handleInputForm}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Image URL</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                name="imgUrl"
                value={form.imgUrl}
                onChange={handleInputForm}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Category</label>
              <select
                className="w-full p-2 border rounded"
                name="categoryId"
                value={form.categoryId}
                onChange={handleInputForm}
              >
                <option value="" hidden>
                  Please select one
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            {ingredientsField?.map((ingredient, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2">Ingredient {index + 1}</label>
                <input
                  type="text"
                  value={ingredient.name}
                  name={`ingredient${index}`}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            {modalMode === 'add' && (
              <button
                onClick={addIngredientField}
                className="py-2 px-4 bg-gray-300 rounded-lg"
              >
                + Add Ingredient
              </button>
            )}
          </div>

          <div className="flex justify-center item-center mt-5">
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-lg"
              onClick={handleSubmitAndClose}
            >
              {modalMode === 'edit' ? 'Edit Item' : 'Add Item'}
            </button>
            <button
              className="ml-4 py-2 px-4 bg-red-500 text-white rounded-lg"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default AddEditItemModal;
