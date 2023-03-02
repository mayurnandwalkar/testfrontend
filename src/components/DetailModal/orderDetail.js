import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { styled } from "@mui/system";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CancelIcon from "@mui/icons-material/Cancel";
import orderInstance from "src/axios/orderInstance";
import { Link } from "react-router-dom";

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
}));

const OrderDetailsLabel = styled(Typography)(
  ({
    theme,
    color,
    fontWeight,
    marginBottom,
    marginLeft,
    fontSize,
    marginRight,
    textAlign,
    marginTop,
    backgroundColor,
  }) => ({
    color: color,
    fontWeight: fontWeight,
    marginBottom: marginBottom,
    marginLeft: marginLeft,
    fontSize: fontSize,
    marginRight: marginRight,
    backgroundColor: backgroundColor,
    marginTop: marginTop,
    textAlign: textAlign,
  })
);

const GridLabel = styled(Grid)(
  ({ theme, marginBottom, backgroundColor, cursor, padding, width }) => ({
    marginBottom: marginBottom,
    backgroundColor: backgroundColor,
    cursor: cursor,
    padding: padding,
    width: width,
  })
);
const CheckBoxIconLabel = styled(CheckBoxIcon)(
  ({ theme, color, fontSize }) => ({
    color: color,
    fontSize: fontSize,
  })
);
const CancelIconLabel = styled(CancelIcon)(({ theme, color, fontSize }) => ({
  color: color,
  fontSize: fontSize,
}));
const DividerLabel = styled(Divider)(
  ({ theme, marginLeft, marginTop, marginBottom }) => ({
    marginLeft: marginLeft,
    marginTop: marginTop,
    marginBottom: marginBottom,
  })
);
const DetailModal = ({
  isOpen,
  setOpen,
  from,
  instance,
  route,
  query,
  orderData,
}) => {
  const [detailData, setDetailData] = useState([]);
  const [orderCount, setOrderCount] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);
        const detailResponse = await orderInstance.get(
          "/solution-order-detail",
          {
            params: query,
          }
        );
        setDetailData(detailResponse.data.allSolutionData);
        setOrderCount(detailResponse.data.orderCount);

        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    if (isOpen) {
      getDetails();
    }
  }, [instance, query, route, isOpen]);

  return (
    <Dialog open={isOpen} onClose={setOpen}>
      <DialogTitle id="responsive-dialog-title">
        Total {from} Order:{orderCount}
      </DialogTitle>
      <DialogContent style={{ width: 600 }}>
        {loading ? (
          <CircularProgress disableShrink />
        ) : (
          <OrderDetailsLabel sx={{ flexGrow: 1 }}>
            {detailData?.map((detail) => {
              return (
                <StyledLink to={`/dashboard/order-detail/${detail.orderToken}`}>
                  <GridLabel
                    container
                    spacing={2}
                    marginBottom="30px"
                    backgroundColor="#FBFBFB"
                    padding="7px 7px"
                    width="106%"
                  >
                    <Grid item xs={9} md={9}>
                      <OrderDetailsLabel
                        color="#55045a"
                        fontWeight="bold"
                        marginBottom="7px"
                      >
                        {detail?.solutionId?.title?.length >= 35
                          ? detail?.solutionId?.title?.substring(0, 35) + "..."
                          : detail?.solutionId?.title}
                      </OrderDetailsLabel>
                      <OrderDetailsLabel fontSize="11px">
                        Date:{detail?.createdAt?.substring(0, 10)}
                      </OrderDetailsLabel>
                      <Stack direction="row" alignItems="center">
                        <OrderDetailsLabel fontSize="11px" marginRight="180px">
                          Payment Method: {detail?.paymentId?.type}
                        </OrderDetailsLabel>
                        <OrderDetailsLabel fontSize="10px">
                          Status: {detail.status}
                        </OrderDetailsLabel>

                        <OrderDetailsLabel marginTop="5px">
                          {detail?.status === "success" ? (
                            <CheckBoxIconLabel color="green" fontSize="17px" />
                          ) : (
                            <CancelIconLabel
                              color="red"
                              fontSize="20px"
                              style={{ marginLeft: 5 }}
                            />
                          )}
                        </OrderDetailsLabel>
                      </Stack>
                    </Grid>
                    <DividerLabel
                      orientation="vertical"
                      flexItem
                      marginLeft="20px"
                      marginTop="30px"
                      marginBottom="15px"
                    />
                    <Grid item xs={2.5} md={2.5}>
                      <OrderDetailsLabel
                        color="#55045a"
                        fontWeight="bold"
                        fontSize="17px"
                        textAlign="center"
                      >
                        {detail?.customerId?.name.charAt(0).toUpperCase() +
                          detail?.customerId?.name?.slice(1)}
                      </OrderDetailsLabel>
                      <OrderDetailsLabel marginBottom="8px" fontSize="13px">
                        {detail?.customerId?.email?.slice(0, 2) +
                          "..." +
                          detail?.customerId?.email?.substring(
                            detail?.customerId?.email?.lastIndexOf("@") - 1 + 1
                          )}
                      </OrderDetailsLabel>
                      <OrderDetailsLabel
                        marginLeft="33px"
                        color="green"
                        fontSize="14px"
                      >
                        {detail?.amount}$
                      </OrderDetailsLabel>
                    </Grid>
                  </GridLabel>
                </StyledLink>
              );
            })}
          </OrderDetailsLabel>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
