import PropTypes from "prop-types";

import { TableRow, TableCell, TableHead } from "@mui/material";
TableListHead.propTypes = {
  headLabel: PropTypes.array,
};

export default function TableListHead({ headLabel }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
