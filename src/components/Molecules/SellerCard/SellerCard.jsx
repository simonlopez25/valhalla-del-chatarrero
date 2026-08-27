import Avatar from '../../Atoms/Avatar/Avatar';
import IdBadge from '../../Atoms/IdBadge/IdBadge';
import RoleBadge from '../../Atoms/RoleBadge/RoleBadge';
import StatusBadge from '../../Atoms/StatusBadge/StatusBadge';
import './SellerCard.css';

function SellerCard({ seller }) {
  const { id, name, role, description, status, statusIcon, imageSrc, imageAlt } = seller;

  return (
    <article className="sellerCard">
      <IdBadge id={id} />
      <Avatar imageSrc={imageSrc} imageAlt={imageAlt} />
      <div className="sellerCardContent">
        <h3 className="sellerCardName">{name}</h3>
        <RoleBadge label={role} />
        <p className="sellerCardDescription">{description}</p>
      </div>
      <StatusBadge status={status} icon={statusIcon} />
    </article>
  );
}

export default SellerCard;