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

const DoubleFileController = ({ control, collectionName }) => {
  const nameObj =
    collectionName === "Audio"
      ? {
          files: "audio graphics",
          additionalFiles: "audio files",
          filesNumber: true,
        }
      : {
          files: "thumbnail file",
          additionalFiles: "file",
          filesNumber: false,
        };

  return (
    <>
      <Controller
        name={"file"}
        control={control}
        render={({ field: { value, onChange } }) => (
          <FilePond
            files={value}
            allowMultiple={nameObj.filesNumber}
            onupdatefiles={(fileItems) => {
              onChange(fileItems.map((fileItem) => fileItem.file));
            }}
            labelIdle={`Drag & Drop ${nameObj.files} or <span class="filepond--label-action">Browse</span>`}
          />
        )}
      />

      <Controller
        name={"additionalFiles"}
        control={control}
        render={({ field: { value, onChange } }) => (
          <FilePond
            files={value}
            allowMultiple={nameObj.filesNumber}
            onupdatefiles={(fileItems) => {
              onChange(fileItems.map((fileItem) => fileItem.file));
            }}
            labelIdle={`Drag & Drop ${nameObj.additionalFiles} or <span class="filepond--label-action">Browse</span>`}
          />
        )}
      />
    </>
  );
};

DoubleFileController.propTypes = {
  control: PropTypes.object,
  collectionName: PropTypes.string,
};

export default DoubleFileController;
