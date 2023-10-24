import { useSelector } from 'react-redux';

const DetailItemModal = ({ showModal, currentItem, setShowModal }) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);

  return (
    showModal && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg w-3/4 max-w-xl overflow-y-auto max-h-[calc(100vh-5rem)]">
          <h2 className="mb-4 font-semibold flex justify-center text-2xl">
            Item Detail
          </h2>
          <div className="p-5">
            <div className="flex justify-center items-center mb-5">
              <img
                src={currentItem.imgUrl}
                alt="Item Image"
                className="w-48 h-48 object-cover rounded-md"
              />
            </div>
            <p>
              <strong>Name:</strong> {currentItem.name}
            </p>
            <p>
              <strong>Description:</strong> {currentItem.description}
            </p>
            <p>
              <strong>Price:</strong> {currentItem.price}
            </p>
            <p>
              <strong>Category:</strong> {currentItem.Category.name}
            </p>
            <strong>Ingredients:</strong>
            {ingredients.map((ingredient, index) => (
              <div key={index}>
                {index + 1}. {ingredient.name}
              </div>
            ))}
          </div>
          <div className="flex justify-center item-center mt-5">
            <button
              className="py-2 px-4 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default DetailItemModal;
