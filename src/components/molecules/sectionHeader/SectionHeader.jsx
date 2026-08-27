import './SectionHeader.css';

function SectionHeader({ category, title, description }) {
  return (
    <div className="sectionHeaderWithAccent">
      <div className="sectionCategoryWrapper">
        <span className="sectionCategoryIndicator"></span>
        <span className="sectionCategoryText">{category}</span>
      </div>
      <h1 className="sectionTitle">{title}</h1>
      <p className="sectionDescription">{description}</p>
    </div>
  );
}

export default SectionHeader;