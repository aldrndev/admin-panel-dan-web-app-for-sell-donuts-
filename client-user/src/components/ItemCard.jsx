const ItemCard = ({ imgUrl, name, description, price }) => {
  return (
    <div className="bg-white p-4 rounded shadow-xl">
      <img
        src={imgUrl}
        alt={name}
        className="w-full h-48 object-contain rounded"
      />
      <h4 className="mt-2 text-lg mb-2">{name}</h4>
      <div className="mb-2">
        <strong>Description:</strong> {description}
      </div>
      <div className="mb-2">
        <strong>Price:</strong> {price}
      </div>
      {/* <div className="flex justify-between items-center mt-4">
        <button className="px-3 py-2 bg-blue-600 text-white rounded">
          Detail
        </button>
      </div> */}
    </div>
  );
};

export default ItemCard;
