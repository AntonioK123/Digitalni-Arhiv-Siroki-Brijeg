import PropTypes from "prop-types";
import SingleFileController from "./SingleFileController";
import DoubleFileController from "./DoubleFileController";

const FileUpload = ({
  control,
  collectionName,
  existingFiles,
  onFileChange,
  handleFileRemove,
}) => {
  const doubleFileControllerCollections = [
    "Audio",
    "Knjige",
    "Dokumenti",
    "Časopisi",
    "Novine",
    "Film i Video",
  ];

  let ComponentToRender = null;

  if (doubleFileControllerCollections.includes(collectionName)) {
    ComponentToRender = DoubleFileController;
  } else if (
    [
      "Fotografske Zbirke",
      "Fotografije",
      "Razglednice",
      "Plakati",
      "Poštanske Markice",
    ].includes(collectionName)
  ) {
    ComponentToRender = SingleFileController;
  }

  return (
    <>
      {ComponentToRender && (
        <ComponentToRender
          control={control}
          collectionName={collectionName}
          existingFiles={existingFiles}
          onFileChange={onFileChange}
          handleFileRemove={handleFileRemove}
        />
      )}
    </>
  );
};

FileUpload.propTypes = {
  control: PropTypes.object,
  collectionName: PropTypes.string,
  existingFiles: PropTypes.array,
  onFileChange: PropTypes.func,
  handleFileRemove: PropTypes.func,
};

export default FileUpload;
