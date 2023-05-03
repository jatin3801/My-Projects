import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material";
import { useSelector } from "react-redux";

const MyTableCell = styled(TableCell)({
  backgroundColor: "#61FF48",
  borderLeft: "2px solid #f3f3f3",
});
const BorderedTableCell = styled(TableCell)({
  borderLeft: "2px solid #f3f3f3",
});
function BasicTable() {
  const rowsData = useSelector((state) => state.userList.usersListData);
  const query = useSelector((state) => state.userList.query);
  const filteredData = React.useMemo(() => {
    return rowsData.filter((user) => {
      const { firstName, lastName, email, phone } = user;
      const name = firstName + lastName;
      const queryLowerCase = query.toLowerCase().trim();
      return (
        name.toLowerCase().includes(queryLowerCase) ||
        email.toLowerCase().includes(queryLowerCase) ||
        phone.toLowerCase().includes(queryLowerCase)
      );
    });
  }, [rowsData, query]);

  const shownData = query.trim().length ? filteredData : rowsData;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <MyTableCell>ID</MyTableCell>
            <MyTableCell align='right'>Name</MyTableCell>
            <MyTableCell align='right'>E-mail</MyTableCell>
            <MyTableCell align='right'>Phone No.</MyTableCell>
            <MyTableCell align='right'>Age</MyTableCell>
            <MyTableCell align='right'>Gender</MyTableCell>
            <MyTableCell align='right'>DOB</MyTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shownData.map((user) => (
            <TableRow key={user.id}>
              <BorderedTableCell component='th' scope='row'>
                {user.id}
              </BorderedTableCell>
              <BorderedTableCell align='left'>
                {" "}
                {user.firstName + " " + user.lastName}
              </BorderedTableCell>
              <BorderedTableCell align='left'>{user.email}</BorderedTableCell>
              <BorderedTableCell align='right'>{user.phone}</BorderedTableCell>
              <BorderedTableCell align='right'>{user.age}</BorderedTableCell>
              <BorderedTableCell align='right'>{user.gender}</BorderedTableCell>
              <BorderedTableCell align='right'>
                {user.birthDate}
              </BorderedTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default React.memo(BasicTable);
