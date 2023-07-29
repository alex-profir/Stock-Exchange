import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

export function Header() {
  return (
    <AppBar position="static">
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Typography variant="h6" color="inherit" component="div">
          SFE - Stock exchange - React
        </Typography>
      </Container>
    </AppBar>
  );
}
