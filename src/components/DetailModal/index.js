import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import { RenderIcon } from "src/utils/IconsArray";
import Labels from "src/helpers/DetailLabel";
import ReactHtmlParser from "react-html-parser";
import locationInstance from "src/axios/locationInstace";
export const InfoPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  borderRadius: 0,
  padding: "10px",
  height: "100%",
}));
export const Label = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
}));
export const Detail = styled(Typography)(({ theme }) => ({
  fontSize: ".9rem",
  marginTop: "1rem",
}));
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "black",
  ":hover": {
    color: "#36b693",
  },
}));
const DetailModal = ({
  isOpen,
  setOpen,
  from,
  instance,
  route,
  query,
  orderData,
}) => {
  const [detailData, setDetailData] = useState({});
  const [ipAddress, setIpAddress] = useState();
  const [loading, setLoading] = useState(false);

  const labelList = Labels[`${from}Labels`];
  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        let location = {};
        const detailResponse = await instance.get(route, {
          params: query,
        });
        setIpAddress(detailResponse?.data?.detail?.ipAddress);
        if (detailResponse.data?.detail?.ipAddress) {
          const locationResponse = await locationInstance.get("/" + ipAddress);
          location = {
            country: locationResponse.data.country_name || "",
            state: locationResponse.data.state || "N/A",
            city: locationResponse.data.city || "N/A",
          };
        }
        setDetailData({
          ...location,
          ...detailResponse.data.detail,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    if (isOpen) {
      getDetails();
    }
  }, [instance, query, route, isOpen, ipAddress]);
  const RenderDetail = ({ index }) => {
    if (index === "description" || index === "question") {
      return <>{ReactHtmlParser(detailData[index])}</>;
    }
    if (index === "solutionTitle") {
      return (
        <StyledLink to={`/dashboard/solution-detail/${detailData?.solutionId}`}>
          {detailData[index]}
        </StyledLink>
      );
    } else if (index === "icon") {
      return <RenderIcon icon={detailData[index]} color={detailData?.color} />;
    }
    return <>{detailData[index]}</>;
  };

  return (
    <Dialog open={isOpen} onClose={setOpen}>
      <DialogTitle id="responsive-dialog-title">{from} Details</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress disableShrink />
        ) : (
          <Grid container spacing={2}>
            {labelList.map((singleLabel) => {
              return (
                <Grid
                  key={singleLabel.key}
                  item
                  xs={singleLabel?.span?.xs || 12}
                  sm={singleLabel?.span?.md || 6}
                >
                  <InfoPaper>
                    <Label>{singleLabel.label}</Label>

                    <Detail>
                      <RenderDetail index={singleLabel?.index} />
                    </Detail>
                  </InfoPaper>
                  <Divider sx={{ margin: "5px 0", opacity: "25%" }} />
                </Grid>
              );
            })}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
