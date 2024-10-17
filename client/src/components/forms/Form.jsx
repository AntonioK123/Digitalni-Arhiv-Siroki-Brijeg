import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useForm, useFieldArray } from "react-hook-form";
import { FormControl, TextField, Typography, Button } from "@mui/material";
import "../../styles/form/form.css";
import formFields from "./formFields";
import collectionFormFields from "./collectionFormFields";
import TagInput from "./components/TagInput";
import {
  useCreateData,
  useGetSingleItem,
  useUpdateData,
} from "../../hooks/api/apiHooks";

import FileUpload from "./components/file_upload/FileUpload";
import ErrorAlert from "./components/ErrorAlert";
import SuccessAlert from "./components/SuccessAlert";
import TableLoader from "../loaders/TableLoader";
import { base_url } from "../../services/api/config/axiosConfig";
import FilePreview from "./components/FilePreview";
import AdditionalFilesPreview from "./components/AdditionalFilesPreview";

const Form = ({ data, collectionName, formType, id, collectionId }) => {
  const location = useLocation();
  const path = location.pathname;

  const isValidPhotoCollectionUrl = (url) => {
    const regexPatterns = [
      /^\/app\/photo_collections\/add$/, // Matches "app/photo_collections/add"
      /^\/app\/photo_collections\/edit\/\d+$/, // Matches "app/photo_collections/edit/:id" where :id is a number
    ];
    return regexPatterns.some((pattern) => pattern.test(url));
  };
  const isCollectionUrl = isValidPhotoCollectionUrl(path);

  const {
    createItems,
    successMessage: createSuccessMessage,
    handleCloseSuccess: createHandleCloseSuccess,
    error: createDataError,
    handleCloseError: createHandleCloseError,
  } = useCreateData(data, isCollectionUrl, collectionId);

  const { singleItem, loading: singleItemLoading } = useGetSingleItem(
    data,
    id,
    collectionId,
    isCollectionUrl
  );

  const {
    updateItem,
    successMessage: editSuccessMessage,
    handleCloseSuccess: updateHandleCloseSuccess,
    error: updateDataError,
    handleCloseError: updateHandleCloseError,
  } = useUpdateData(data, id, collectionId, isCollectionUrl);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "keywords",
  });

  const existingFiles = singleItem.file
    ? singleItem.file.map((fileName) => ({
        source: `${base_url}${data.endpoint}/${
          collectionId ? collectionName + "/" : ""
        }${fileName}`,
        options: { type: "local" },
        name: fileName,
      }))
    : [];

  const existingAdditionalFiles = singleItem.additionalFiles
    ? singleItem.additionalFiles.map((file) => ({
        source: `${base_url}${data.endpoint}/${file}`,
        options: { type: "local" },
        name: file,
      }))
    : [];

  useEffect(() => {
    if (singleItem) {
      // Populate form fields with existing data
      formFields.forEach((field) => {
        if (singleItem[field.name] !== undefined) {
          setValue(field.name, singleItem[field.name], {
            shouldValidate: true,
          });
        }
      });

      collectionFormFields.forEach((field) => {
        if (singleItem[field.name] !== undefined) {
          setValue(field.name, singleItem[field.name], {
            shouldValidate: true,
          });
        }
      });

      // Populate keywords if available in singleItem
      if (singleItem.keywords && singleItem.keywords.length > 0) {
        singleItem.keywords.forEach((keyword) => {
          append({ value: keyword });
        });
      }
    }
  }, [singleItem, setValue, append]);

  function removeEmptyFields(data) {
    Object.keys(data).forEach((key) => {
      if (data[key] === "") {
        delete data[key];
      }
    });
  }

  //Converting an array of objects to an array of strings based on the object key
  const arrayOfKeywordsMutation = fields.map((keywords) => keywords.value);

  const onSubmit = (formData) => {
    removeEmptyFields(formData);
    formData.keywords = arrayOfKeywordsMutation;

    if (formType === "add") {
      createItems(formData);
    } else if (formType === "edit") {
      updateItem(formData);
    } else {
      console.log("Form data:", formData);
    }
  };

  if (singleItemLoading) {
    return <TableLoader />;
  }
  return (
    <div className="form-main-wrapper">
      <div className="form-title">
        <Typography variant="h4">{collectionName}</Typography>
      </div>
      <form
        id="form"
        onSubmit={handleSubmit(onSubmit)}
        className="form-wrapper"
        encType="multipart/form-data"
      >
        <FormControl variant="outlined">
          {/* Checking which type of form fields to render */}
          {(isCollectionUrl ? collectionFormFields : formFields).map(
            (field) => (
              <div className="form-inputs" key={field.name}>
                <TextField
                  id={field.name}
                  label={field.label}
                  variant="outlined"
                  fullWidth
                  multiline={field.multiline}
                  error={!!errors[field.name]}
                  helperText={errors[field.name]?.message || ""}
                  {...register(field.name, { ...field.validation })}
                  autoComplete="off"
                  defaultValue={singleItem ? singleItem[field.name] : ""}
                />
                {errors[field.name] && (
                  <Typography
                    variant="body2"
                    color="error"
                    className="error-message"
                    sx={{ marginBottom: "10px" }}
                  >
                    {"*" + field.validation.error}
                  </Typography>
                )}
              </div>
            )
          )}
          {/* Keywords */}
          <TagInput fields={fields} append={append} remove={remove} />

          {/* File Preview */}
          {existingFiles.toString() !== [].toString() ? (
            <FilePreview
              control={control}
              name="file"
              existingFiles={existingFiles}
            />
          ) : null}

          {existingAdditionalFiles.toString() !== [].toString() ? (
            <AdditionalFilesPreview
              control={control}
              name="file"
              existingAdditionalFiles={existingAdditionalFiles}
              type={data.endpoint}
            />
          ) : null}

          {/* File input */}
          {!isCollectionUrl ? (
            <FileUpload
              control={control}
              collectionName={collectionName}
              existingFiles={existingFiles}
            />
          ) : null}
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </FormControl>
      </form>

      {createDataError && (
        <ErrorAlert
          message={createDataError}
          onClose={createHandleCloseError}
        />
      )}
      {updateDataError && (
        <ErrorAlert
          message={updateDataError}
          onClose={updateHandleCloseError}
        />
      )}
      {createSuccessMessage && (
        <SuccessAlert
          message={createSuccessMessage}
          onClose={createHandleCloseSuccess}
        />
      )}
      {editSuccessMessage && (
        <SuccessAlert
          message={editSuccessMessage}
          onClose={updateHandleCloseSuccess}
        />
      )}
    </div>
  );
};

Form.propTypes = {
  data: PropTypes.object,
  collectionName: PropTypes.string,
  formType: PropTypes.string,
  id: PropTypes.number,
  collectionId: PropTypes.number,
};

export default Form;
