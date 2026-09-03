import SellerCard from '../../molecules/sellerCard/SellerCard';
import { sellersData } from '../../../data/sellersData';
import './SellerGrid.css';

function SellerGrid({ sellers = sellersData } = {}) {
  return (
    <section className="sellerGrid">
      {sellers.map((seller, index) => (
        <SellerCard key={index} seller={seller} />
      ))}
    </section>
  );
}

export default SellerGrid;