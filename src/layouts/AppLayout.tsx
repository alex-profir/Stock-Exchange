import { Box, Container } from "@mui/material";
import { PropsWithChildren } from "react";
import { Header } from "../components/Header";

export function AppLayout({ children }: PropsWithChildren) {
  return (
    <Box className="AppLayout">
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
