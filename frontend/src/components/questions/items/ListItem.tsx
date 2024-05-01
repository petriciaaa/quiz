import React from "react";
import { IQuestion } from "types/question";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ICategoryQuizProps {
  category: string;
  quizes: IQuestion[];
}

function ListItem({ quizes, category }: ICategoryQuizProps) {
  //
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <div className="w-max">
      <Accordion
        className="min-w-96 "
        expanded={expanded === `${category}`}
        onChange={handleChange(`${category}`)}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {" "}
          <Typography sx={{ width: "80%", flexShrink: 0 }}>
            Preview {category} questions{" "}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {quizes.map((quiz, index) => {
            return (
              <Typography sx={{ width: "100%", flexShrink: 0 }}>
                {quiz.title.includes("?") ? quiz.title : quiz.title + "?"}
              </Typography>
            );
          })}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
const ListItemMemo = React.memo(ListItem);
export default ListItemMemo;
