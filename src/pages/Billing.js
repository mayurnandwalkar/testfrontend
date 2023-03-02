import BillingSection from "src/sections/user/billing";
import Page from "src/components/Page";
import { useDispatch, useSelector } from "react-redux";
import Loader from "src/components/Loader";
import { showLoader, hideLoader } from "src/store/actions/loaderActions";
import { useEffect } from "react";

export default function Billing() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loader);

  useEffect(() => {
    if (loading) dispatch(hideLoader());

    dispatch(showLoader());

    return () => {
      dispatch(hideLoader());
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <Page title="AX3 | Billing">
      <BillingSection />
    </Page>
  );
}
