import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ArtistsTab from "./artistsTab";
import AlbumsTab from "./albumsTab";
import TracksTab from "./tracksTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SearchTabs({ searchResults }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Artists" {...a11yProps(0)} />
          <Tab label="Albums" {...a11yProps(1)} />
          <Tab label="Tracks" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {searchResults?.artists.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No artists found
          </Typography>
        ) : (
          <ArtistsTab artists={searchResults?.artists} />
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {searchResults?.albums.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No albums found
          </Typography>
        ) : (
          <AlbumsTab albums={searchResults?.albums} />
        )}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {searchResults?.tracks.length === 0 ? (
          <Typography variant="h6" color="text.secondary">
            No tracks found
          </Typography>
        ) : (
          <TracksTab tracks={searchResults?.tracks} />
        )}
      </TabPanel>
    </Box>
  );
}
