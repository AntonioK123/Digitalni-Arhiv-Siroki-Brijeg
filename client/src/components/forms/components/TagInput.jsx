import {
  Tooltip,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import PropTypes from "prop-types";

const TagInput = ({ fields, append, remove }) => {
  return (
    <>
      {/* Tag input field */}
      <Tooltip title="Kako bi izbrisao unesene ključne riječi pogledaj karticu niže ">
        <TextField
          id="standard-textarea"
          multiline
          label="Ključne riječi"
          variant="outlined"
          fullWidth
          className="keyword"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const newTag = e.target.value.trim();
              if (newTag !== "") {
                append({ value: newTag });
                e.target.value = "";
              }
            }
          }}
          sx={{ marginTop: "10px" }}
        />
      </Tooltip>

      {/* Render tags */}
      <Accordion
        defaultExpanded
        style={{
          marginBottom: "40px",
          marginTop: "20px",
        }}
        elevation={3}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="heading"> Kljucne Rijeci </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component="div">
            {fields.map((tag, index) => (
              <Chip
                color="primary"
                size="medium"
                className="chip"
                onDelete={() => remove(index)}
                key={index}
                label={tag.value}
              />
            ))}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

TagInput.propTypes = {
  fields: PropTypes.array,
  append: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default TagInput;
