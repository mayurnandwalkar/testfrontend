import React, { useEffect, useState } from "react";
import Payout from "./payout";
import TransactionHistory from "./transactionHistory";
import { Alert as MuiAlert, Snackbar } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import stripeInstance from "src/axios/stripeInstance";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PaymentOnboarding = () => {
  const [hasStripeAcc, setHasStripeAcc] = useState(false);
  const [snackBarToggle, setSnackBarToggle] = useState({
    visible: false,
    type: "",
    message: "",
  });

  const [vendor, setVendor] = useState({ balance: 0, transactions: [] });
  const [pendingBalance, setPendingBalance] = useState({
    pendingBalance: 0,
    numberOfTransactions: 0,
  });
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    getStripeAcc();
    getVendorTransactionHistory();
    getPendingBalance();
    getEscrowTransactions();
  }, []);

  const getStripeAcc = () => {
    handleToggle();
    stripeInstance
      .get(`/account`)
      .then((response) => {
        handleClose();

        if (response.data.account.id) {
          setHasStripeAcc(true);
        } else {
          setHasStripeAcc(false);
        }
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const initiatePayout = () => {
    stripeInstance
      .post(`/payout`)
      .then((response) => {
        setVendor(response.data.artistTransactionHistory);
        setSnackBarToggle({
          visible: true,
          type: "success",
          message: "Payout processed successfully",
        });
      })
      .catch((error) => {
        setSnackBarToggle({
          visible: true,
          type: "error",
          message:
            "Please complete your account setup by going to your stripe account",
        });
      });
  };

  const getVendorTransactionHistory = () => {
    stripeInstance
      .get(`/history`)
      .then((response) => {
        console.log("response", response.data);
        setVendor(response.data.artistTransactionHistory);
      })
      .catch((error) => console.log({ historyError: error }));
  };

  const getEscrowTransactions = () => {
    stripeInstance
      .get(`/escrow-transactions`)
      .then((response) => {
        setTransactionHistory(response.data.transactions);
      })
      .catch((error) => console.log({ escrowError: error }));
  };

  const getPendingBalance = () => {
    stripeInstance
      .get(`/pending-balance`)
      .then((response) => {
        setPendingBalance({
          pendingBalance: response.data.balanceData.totalPendingBalance,
          numberOfTransactions: response.data.balanceData.numberOfTransactions,
        });
      })
      .catch((error) => {
        console.log({ pendingBalanceError: error });
      });
  };

  const handleOnboarding = () => {
    const data = {};
    stripeInstance
      .post(`/account`, data)
      .then((response) => {
        window.location = response.data.url;
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleViewStripeDashboard = () => {
    stripeInstance
      .get(`/account/dashboard`)
      .then((response) => {
        window.open(response.data.link.url, "_blank");
      })
      .catch((error) => {
        console.log({ error });
        setSnackBarToggle({
          visible: true,
          type: "error",
          message:
            "Please complete your account setup by going to your stripe account",
        });
      });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleSnackBarClose = () => {
    setSnackBarToggle({
      visible: false,
      type: "",
      message: "",
    });
  };

  return (
    <>
      <TransactionHistory
        hasStripeAcc={hasStripeAcc}
        initiatePayout={initiatePayout}
        vendor={vendor}
        handleViewStripeDashboard={handleViewStripeDashboard}
        pendingBalance={pendingBalance}
        transactionHistory={transactionHistory}
        setHasStripeAcc={setHasStripeAcc}
        handleOnboarding={handleOnboarding}
      />

      <Snackbar
        open={snackBarToggle.visible}
        autoHideDuration={5000}
        onClose={handleSnackBarClose}
      >
        <Alert severity={snackBarToggle.type}>{snackBarToggle.message}</Alert>
      </Snackbar>
      {/* <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </>
  );
};

export default PaymentOnboarding;
