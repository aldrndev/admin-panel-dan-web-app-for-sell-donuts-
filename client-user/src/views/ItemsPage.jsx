import { useEffect } from 'react';
import ItemCard from '../components/ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../stores/actions/actionStore';

const ItemsPage = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.items);

  const promos = items.filter((item) => item.categoryId === 1);
  const donuts = items.filter((item) => item.categoryId === 2);
  const beverages = items.filter((item) => item.categoryId === 3);
  const cookies = items.filter((item) => item.categoryId === 4);
  const hampers = items.filter((item) => item.categoryId === 5);
  const others = items.filter((item) => item.categoryId === 6);

  const categoryColors = {
    promos: 'bg-promos',
    donuts: 'bg-donuts',
    beverages: 'bg-beverage',
    cookies: 'bg-cookies',
    hampers: 'bg-hampers',
    others: 'bg-others',
  };

  const categoryNames = {
    promos: 'Donuts',
    donuts: 'Beverages',
    beverages: 'Cookies',
    cookies: 'Hampers',
    hampers: 'Others',
    others: 'Promo',
  };

  const CategorySection = ({ category, items }) => (
    <div className={`${categoryColors[category]} mb-7 flex flex-col`}>
      <h2 className="text-center text-2xl font-semibold my-4">
        {categoryNames[category]}
      </h2>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-4 rounded">
          {items.map((item) => (
            <ItemCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <>
      <CategorySection category="promos" items={promos} />
      <CategorySection category="donuts" items={donuts} />
      <CategorySection category="beverages" items={beverages} />
      <CategorySection category="cookies" items={cookies} />
      <CategorySection category="hampers" items={hampers} />
      <CategorySection category="others" items={others} />
    </>
  );
};

export default ItemsPage;
