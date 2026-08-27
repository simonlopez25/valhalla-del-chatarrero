import SectionHeader from '../../components/molecules/sectionHeader/SectionHeader';
import SellerGrid from '../../components/organisms/sellerGrid/SellerGrid';
import './SellersPage.css';

function SellersPage() {
  return (
    <main className="sellersPageContainer">
      <SectionHeader 
        category=">> ACCESO_AUTORIZADO: EXPERTOS_ELECTRONICA"
        title="EXPERTOS EN ELECTRÓNICA"
        description="Los arquitectos del caos. Maestros en la recuperación de tecnología perdida. Cada unidad operativa ha demostrado capacidades extremas de supervivencia en entornos de alta radiación y obsolescencia programada."
      />
      <SellerGrid />
    </main>
  );
}

export default SellersPage;