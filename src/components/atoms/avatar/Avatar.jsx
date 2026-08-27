import './Avatar.css';

function Avatar({ imageSrc, imageAlt }) {
  return (
    <div className="avatar">
      <img src={imageSrc} alt={imageAlt} className="avatarImage" />
    </div>
  );
}

export default Avatar;