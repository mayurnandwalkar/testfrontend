import UserDashboardSection from "src/sections/user/dashboard/dashboard";
import Page from "src/components/Page";

const Home = () => {
  return (
    <Page title="AX3">
      <UserDashboardSection view="unauthenticated" />
    </Page>
  );
};

export default Home;
