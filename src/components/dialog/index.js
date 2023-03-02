import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

export default function AlertDialog({
  open,
  handleClose,
  title,
  content,
  action,
  handleAction,
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">{content}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() => {
            handleAction();
          }}
        >
          {action}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
