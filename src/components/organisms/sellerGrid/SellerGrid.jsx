import SellerCard from '../../molecules/sellerCard/SellerCard';
import { sellersData } from '../../../data/sellersData';
import './SellerGrid.css';

function SellerGrid() {
  return (
    <section className="sellerGrid">
      {sellersData.map((seller, index) => (
        <SellerCard key={index} seller={seller} />
      ))}
    </section>
  );
}

export default SellerGrid;