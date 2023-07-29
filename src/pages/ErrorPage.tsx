import { Container, Typography } from "@mui/material";

export function ErrorPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2">Oops, this is embarrasing</Typography>
    </Container>
  );
}
