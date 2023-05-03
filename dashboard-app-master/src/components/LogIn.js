import React from "react";
import LoginModal from "./UI/LoginModal";

function LogIn() {
  const [open, setOpen] = React.useState(true);
  return <LoginModal open={open} setOpen={setOpen} />;
}

export default LogIn;
