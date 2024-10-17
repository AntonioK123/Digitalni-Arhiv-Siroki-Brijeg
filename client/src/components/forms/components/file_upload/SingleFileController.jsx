import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginMediaPreview from "filepond-plugin-media-preview";
import FilePondPluginPdfPreview from "filepond-plugin-pdf-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css";
import "filepond-plugin-pdf-preview/dist/filepond-plugin-pdf-preview.min.css";

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginMediaPreview,
  FilePondPluginPdfPreview
);

const SingleFileController = ({ control }) => {
  return (
    <Controller
      name={"file"}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <FilePond
            files={value}
            allowMultiple={false}
            onupdatefiles={(fileItems) => {
              onChange(fileItems.map((fileItem) => fileItem.file));
              console.log(fileItems + " Singggggee");
            }}
            labelIdle={`Drag & Drop file or <span class="filepond--label-action">Browse</span>`}
          />
        );
      }}
    />
  );
};

SingleFileController.propTypes = {
  control: PropTypes.object.isRequired,
  collectionName: PropTypes.string,
};

export default SingleFileController;
