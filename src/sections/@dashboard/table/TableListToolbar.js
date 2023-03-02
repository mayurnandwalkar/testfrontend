// material
import { styled } from "@mui/material/styles";
import {
  Toolbar,
  Tooltip,
  IconButton,
  OutlinedInput,
  InputAdornment,
  Menu,
  MenuItem,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";
// component
import Iconify from "../../../components/Iconify";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
// ----------------------------------------------------------------------

const StyledStack = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(3, 0, 0, 0),
}));

const RootStyle = styled(Toolbar)(({ theme, justify }) => ({
  height: 96,
  display: "flex",
  justifyContent: justify,
  alignItems: "center",
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(["box-shadow", "width"], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  "&.Mui-focused": { width: 320, boxShadow: theme.customShadows.z8 },
  "& fieldset": {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

const StyledTypo = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
  margin: theme.spacing(0, 0, 0, 2),
}));

// ----------------------------------------------------------------------
export default function TableListToolbar({
  currentFilter = { key: "", filterBy: "" },
  onFilterChange,
  filterList = [],
  showSearchBar = false,
  placeholder = "",
  onSearch,
  isLoading = false,
}) {
  return (
    <StyledStack spacing={0}>
      <RootStyle justify={showSearchBar ? "space-between" : "flex-end"}>
        {showSearchBar && (
          <SearchStyle
            onChange={(e) => onSearch(e.target.value)}
            placeholder={placeholder}
            startAdornment={
              <InputAdornment position="start">
                <Iconify
                  icon="eva:search-fill"
                  sx={{ color: "text.disabled", width: 20, height: 20 }}
                />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                {isLoading && (
                  <CircularProgress size={20} sx={{ opacity: 0.75 }} />
                )}
              </InputAdornment>
            }
          />
        )}
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <>
              <Tooltip title="Filter">
                <IconButton {...bindTrigger(popupState)}>
                  <Iconify icon="ic:round-filter-list" />
                </IconButton>
              </Tooltip>
              <Menu {...bindMenu(popupState)}>
                {filterList?.map((menu) => {
                  return (
                    <MenuItem
                      onClick={() => {
                        onFilterChange(menu?.filterKey, menu?.value);
                        popupState.close();
                      }}
                      key={menu?.key}
                    >
                      {menu?.menuItem}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          )}
        </PopupState>
      </RootStyle>
      {currentFilter?.key && currentFilter?.filterBy && (
        <>
          <StyledTypo variant="caption">
            Filtered By {`${currentFilter.key}: ${currentFilter.filterBy}`}
          </StyledTypo>
        </>
      )}
    </StyledStack>
  );
}
