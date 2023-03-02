import UserDashboardSection from "src/sections/user/dashboard/dashboard";
import Page from "src/components/Page";

function UserDashboard() {
  return (
    <Page title="AX3 | User Dashboard">
      <UserDashboardSection />;
    </Page>
  );
}

export default UserDashboard;
