import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategory,
  fetchCategories,
} from '../stores/actions/actionCreators';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

const CategoriesTable = () => {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    day = day < 10 ? '0' + day : day;
    month = month < 10 ? '0' + month : month;

    return `${day}/${month}/${year}`;
  };

  const handleDelete = (id) => {
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
        dispatch(deleteCategory(id));
      }
    });
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <table className="min-w-full bg-white rounded-lg shadow-lg">
      <thead>
        <tr className="text-gray-700 text-left">
          <th className="py-2 px-4">No</th>
          <th className="py-2 px-4">Name</th>
          <th className="py-2 px-4">Created At</th>
          <th className="py-2 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr className="text-gray-600 text-left" key={category.id}>
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4">{category.name}</td>
            <td className="py-2 px-4">{formatDate(category.createdAt)}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => handleDelete(category.id)}
                className="py-1 px-3 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CategoriesTable;
