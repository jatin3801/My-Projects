import * as React from "react";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import Stack from "@mui/joy/Stack";

import Typography from "@mui/joy/Typography";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../redux/LoginSlice";
import { Alert } from "@mui/joy";
function LoginModal({ open, setOpen }) {
  const [loginDetails, setLoginDetails] = React.useState({
    username: "",
    password: "",
  });
  const [isSubmit, setIsSubmit] = React.useState(true);
  const errorMessage = useSelector((state) => state.login.error);

  const validateLoginDetails = (loginDetails) => {
    if (!loginDetails.username) {
      setIsSubmit(false);
      return;
    }
    if (!loginDetails.password) {
      setIsSubmit(false);
      return;
    }
    setIsSubmit(true);
  };
  const dispatch = useDispatch();

  return (
    <>
      <Modal open={open}>
        <ModalDialog
          aria-labelledby='basic-modal-dialog-title'
          aria-describedby='basic-modal-dialog-description'
          sx={{ maxWidth: 500 }}
        >
          <Typography
            textAlign='center'
            id='basic-modal-dialog-title'
            component='h2'
          >
            Log In
          </Typography>

          <form
            onSubmit={(event) => {
              if (isSubmit) {
                validateLoginDetails(loginDetails);
                dispatch(loginThunk(loginDetails));
              }

              event.preventDefault();
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>UserName</FormLabel>
                <Input
                  autoFocus
                  required
                  value={loginDetails.username}
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      username: e.target.value,
                    })
                  }
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  type={"password"}
                  required
                  value={loginDetails.password}
                  onChange={(e) =>
                    setLoginDetails({
                      ...loginDetails,
                      password: e.target.value,
                    })
                  }
                />
              </FormControl>
              <Button type='submit'>Submit</Button>
            </Stack>
            <br />

            {errorMessage && (
              <Alert
                severity='error'
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "white ",
                  color: "red",
                  fontFamily: "cursive",
                  fontSize: "18px",
                }}
              >
                {"  "}

                {errorMessage}
              </Alert>
            )}
          </form>
        </ModalDialog>
      </Modal>
    </>
  );
}

export default React.memo(LoginModal);
