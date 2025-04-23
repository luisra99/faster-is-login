import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Avatar,
  CircularProgress,
  Dialog,
  DialogContent,
  Stack,
  Typography,
  useTheme,
  styled,
  Divider,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export interface IdentityProvider {
  is: string;
  name: string;
  image: string;
}

export interface IdentityProviderListProps {
  variant: "button" | "container";
  localAuth?: boolean;
  redirectPath: string;
  specific?: boolean;
}

const ProviderCard = styled(Card)(({ theme }) => ({
  borderRadius: "10px",
  border: `1px solid ${theme.palette.mode === "dark" ? "#444" : "#e0e0e0"}`,
  boxShadow: "none",
  transition: "all 0.2s ease",
  "&:hover": {
    borderColor: theme.palette.mode === "dark" ? "#666" : "#b0b0b0",
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,0.05)"
        : "rgba(0,0,0,0.02)",
  },
  marginBottom: "8px",
  overflow: "hidden",
}));

const IdentityProviderList: React.FC<IdentityProviderListProps> = ({
  variant,
  redirectPath,
  localAuth = false,
  specific = false,
}) => {
  const [providers, setProviders] = useState<IdentityProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [currentProvider, setCurrentProvider] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);
        const response = await fetch("api/identity-providers");

        if (!response.ok) {
          throw new Error("Error al obtener proveedores");
        }

        const data = await response.json();
        setProviders(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        console.error("Error fetching identity providers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [variant]);

  const login = async (provider: IdentityProvider) => {
    setIsLoggingIn(true);
    setCurrentProvider(provider.is);
    try {
      const response = await fetch(
        `api/login?redirect=${redirectPath}&is=${provider.is}`
      );
      const data = await response.json();
      location.href = data.url;
    } catch (err) {
      console.error("Error during login:", err);
      setIsLoggingIn(false);
      setCurrentProvider(null);
    }
  };

  const renderProviderItem = (provider: IdentityProvider) => (
    <ProviderCard key={provider.is}>
      <CardActionArea
        onClick={() => login(provider)}
        disabled={isLoggingIn}
        sx={{ p: 1, position: "relative" }}
      >
        {isLoggingIn && currentProvider === provider.is && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              zIndex: 1,
            }}
          >
            <CircularProgress size={24} />
          </Box>
        )}
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Avatar
            src={provider.image}
            alt={provider.name}
            sx={{
              width: 25,
              height: 25,
              ml: 2,
              mr: 3,
            }}
          />
          <Box flex={1}>
            <Typography variant="subtitle1" fontWeight={400}>
              Continuar con {provider.name}
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </ProviderCard>
  );

  const renderProviderList = () => (
    <Stack spacing={1} sx={{ width: "100%" }}>
      {providers.map(renderProviderItem)}
    </Stack>
  );

  const renderModal = () => (
    <Dialog
      open={openModal}
      onClose={() => !isLoggingIn && setOpenModal(false)}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          background: theme.palette.background.paper,
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        {localAuth && (
          <>
            <Divider sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                También puedes
              </Typography>
            </Divider>
          </>
        )}
        {renderProviderList()}
      </DialogContent>
    </Dialog>
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 3,
          borderRadius: "10px",
          border: `1px solid ${theme.palette.error.light}`,
          background:
            theme.palette.mode === "dark"
              ? "rgba(255, 50, 50, 0.1)"
              : "rgba(255, 50, 50, 0.05)",
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon color="error" sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6" color="error" gutterBottom>
          Error al cargar proveedores
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {error}
        </Typography>
      </Box>
    );
  }

  if (providers.length === 0) {
    return null;
  }

  if (variant === "button") {
    return (
      <>
        <Button
          onClick={() =>
            providers.length === 1 ? login(providers[0]) : setOpenModal(true)
          }
          variant="contained"
          disabled={isLoggingIn}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {isLoggingIn && (
            <CircularProgress
              size={24}
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            />
          )}
          <Typography
            variant="subtitle1"
            fontWeight={400}
            p={1}
            sx={{
              visibility: isLoggingIn ? "hidden" : "visible",
            }}
          >
            {providers.length === 1 && specific
              ? `Continuar con ${providers[0].name}`
              : "Iniciar sesión"}
          </Typography>
        </Button>
        {renderModal()}
      </>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: "12px",
      }}
    >
      {localAuth && (
        <Divider sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            También puedes
          </Typography>
        </Divider>
      )}
      {renderProviderList()}
    </Box>
  );
};

export default IdentityProviderList;
