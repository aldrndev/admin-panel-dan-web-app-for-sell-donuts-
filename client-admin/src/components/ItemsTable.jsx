import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../stores/actions/actionCreators';
import { useEffect } from 'react';

const ItemsTable = ({ editItem, deletedItem, showDetail }) => {
  const items = useSelector((state) => state.items.items);
  const dispatch = useDispatch();

  const formatCurrency = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  return (
    <table className="min-w-full bg-white rounded-lg shadow-lg">
      <thead>
        <tr className="text-gray-700 text-left">
          <th className="py-2 px-4">No</th>
          <th className="py-2 px-4 break-words max-w-xs w-1/4">Name</th>
          <th className="py-2 px-4">Image</th>
          {/* <th className="py-2 px-4">Description</th> */}
          <th className="py-2 px-4">Price</th>
          <th className="py-2 px-4">Category</th>
          <th className="py-2 px-4">Created By</th>
          <th className="py-2 px-4">Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr className="text-gray-600 text-left" key={index}>
            <td className="py-2 px-4">{index + 1}</td>
            <td className="py-2 px-4 break-words max-w-xs w-1/4">
              {item.name}
            </td>
            <td className="py-2 px-4">
              <img
                src={item.imgUrl}
                alt="Event Image"
                className="w-32 h-32 object-cover rounded-md"
              />
            </td>
            {/* <td className="py-2 px-4">{item.description}</td> */}
            <td className="py-2 px-4">{formatCurrency(item.price)}</td>
            <td className="py-2 px-4">{item.Category?.name}</td>
            <td className="py-2 px-4">{item.User?.email.split('@')[0]}</td>
            <td className="py-2 px-4">
              <button
                onClick={() => showDetail(item)}
                className="py-1 px-3 mr-2 bg-green-500 text-white rounded-lg"
              >
                Detail
              </button>
              <button
                onClick={() => editItem(item)}
                className="py-1 px-3 mr-2 bg-blue-500 text-white rounded-lg"
              >
                Edit
              </button>
              <button
                onClick={() => deletedItem(item.id)}
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

export default ItemsTable;
