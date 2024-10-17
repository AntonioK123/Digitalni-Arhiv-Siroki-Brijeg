import "../../styles/loaders/tableLoader.css";
const TableLoader = () => {
  return (
    <>
      <div className="loader-wrapper">
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader_text">Loading...</div>
        </div>
      </div>
    </>
  );
};

export default TableLoader;
