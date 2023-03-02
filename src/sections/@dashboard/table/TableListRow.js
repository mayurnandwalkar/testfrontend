import { useEffect, useState } from "react";

// material
import { Stack, TableRow, TableCell, Typography } from "@mui/material";

import locationInstance from "src/axios/locationInstace";

const TableListRow = ({ email, ipAddress, status }) => {
  const [location, setLocation] = useState({
    country: "",
    state: "",
    city: "",
  });
  useEffect(() => {
    const getLocationFromIp = async (ipAddress) => {
      try {
        const locationResponse = await locationInstance.get("/" + ipAddress);
        setLocation({
          country: locationResponse.data.country_name || "",
          state: locationResponse.data.state || "",
          city: locationResponse.data.city || "",
        });
      } catch (error) {}
    };

    getLocationFromIp(ipAddress);
  }, [ipAddress]);

  return (
    <TableRow hover>
      <TableCell component="th" scope="row" padding="normal">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {email}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {status}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {location.country}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {location.state}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="subtitle2" noWrap>
          {location.city}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default TableListRow;
