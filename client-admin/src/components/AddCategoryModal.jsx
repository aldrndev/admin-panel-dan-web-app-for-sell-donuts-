import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../stores/actions/actionCreators';
import Swal from 'sweetalert2';

const AddCategoryModal = ({ showModal, setShowModal }) => {
  const [categoryName, setCategoryName] = useState({
    name: '',
  });

  const dispatch = useDispatch();
  const message = useSelector((state) => state.categories.message);
  const error = useSelector((state) => state.categories.error);

  const categoryNameHandler = (e) => {
    const { name, value } = e.target;

    setCategoryName({
      ...categoryName,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addCategory(categoryName));
    setShowModal(false);
    setCategoryName({
      name: '',
    });
  };

  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    if (error) {
      Toast.fire({
        icon: 'error',
        title: error,
      });
    } else if (message) {
      Toast.fire({
        icon: 'success',
        title: message,
      });
    }
  }, [message, error]);

  return (
    showModal && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-1/2">
          <h2 className="mb-4 font-semibold flex justify-center text-2xl">
            Add New Category
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="p-5">
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={categoryName.name}
                  onChange={categoryNameHandler}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div className="flex justify-center item-center mt-5">
              <button
                type="submit"
                className="py-2 px-4 bg-blue-500 text-white rounded-lg"
              >
                Add Category
              </button>
              <button
                className="ml-4 py-2 px-4 bg-red-500 text-white rounded-lg"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddCategoryModal;
