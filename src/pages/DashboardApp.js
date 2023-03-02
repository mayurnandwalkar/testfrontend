import dashboardInstance from "../axios/dashboardInstance";
import { Grid, Container, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

// components
import Page from "../components/Page";
// sections
import { AppWidgetSummary } from "../sections/@dashboard/app";
// ----------------------------------------------------------------------
const LoaderWrapper = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: "1000",
}));

export default function DashboardApp() {
  const [dashboardStats, setDashboardStats] = useState();
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    const getBooks = async () => {
      try {
        setLoading(true);
        const dashboardResponce = await dashboardInstance.get("/");
        setDashboardStats(dashboardResponce.data);

        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBooks();
  }, []);
  return (
    <>
      {loading ? (
        <LoaderWrapper>
          <CircularProgress size={80} />
        </LoaderWrapper>
      ) : (
        <Page title="AX3 | Dashboard">
          <Container maxWidth="xl">
            <Typography variant="h4" sx={{ mb: 5 }}>
              Hi, Welcome back
            </Typography>

            <Grid container spacing={3}>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  navigate("/dashboard/book");
                }}
              >
                <AppWidgetSummary
                  title="Total Books"
                  total={dashboardStats?.bookCount}
                  icon="eva:book-open-outline"
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  navigate("/dashboard/solution");
                }}
              >
                <AppWidgetSummary
                  title="Total Solution"
                  total={dashboardStats?.solutionCount}
                  color="info"
                  icon="ep:document"
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  navigate("/dashboard/order");
                }}
              >
                <AppWidgetSummary
                  title="Total Orders"
                  total={dashboardStats?.orderCount}
                  color="warning"
                  icon="ant-design:ordered-list-outlined"
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                style={{
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  navigate("/dashboard/category");
                }}
              >
                <AppWidgetSummary
                  title="Total Categories"
                  total={dashboardStats?.categoryCount}
                  color="error"
                  icon="bx:category"
                />
              </Grid>
            </Grid>
          </Container>
        </Page>
      )}
    </>
  );
}
