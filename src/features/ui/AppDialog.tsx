import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";

import { useBreakpoints } from "@hooks/useBreakpoints";

import AppButton from "./AppButton";

const DESKTOP_PADDING_X = 4;
const MOBILE_PADDING_X = 2;
const DESKTOP_PADDING_Y = 5;
const MOBILE_PADDING_Y = 3;

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  secondaryButtonText?: string;
  disableSecondaryButton?: boolean;
  children?: React.ReactNode;
  isForm?: boolean;
  maxWidth?: number;
  isLoading?: boolean;
  disableBottomTitlePadding?: boolean;
  hideCloseButton?: boolean;
}

export default function AppDialog({
  isOpen,
  onClose,
  primaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  secondaryButtonText,
  disableSecondaryButton,
  children,
  title,
  isForm,
  maxWidth,
  isLoading,
  disableBottomTitlePadding,
  hideCloseButton,
}: Props) {
  const { md } = useBreakpoints();

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={isOpen}
      PaperProps={{
        sx: {
          borderRadius: 2,
          width: { md: 864 },
          maxWidth: maxWidth ?? "inherit",
        },
      }}
      fullScreen={!md}
    >
      {!hideCloseButton && (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={(theme) => ({
            position: "absolute",
            right: 16,
            top: 24,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon fontSize="large" sx={{ color: "text.primary" }} />
        </IconButton>
      )}
      <Typography
        textAlign="center"
        variant="h4"
        sx={{
          pt: hideCloseButton ? 5 : 8.75,
          px: { xs: MOBILE_PADDING_X, md: DESKTOP_PADDING_X },
          pb: disableBottomTitlePadding ? 0 : 3,
        }}
      >
        {title}
      </Typography>
      <Box component={isForm ? "form" : "div"}>
        <DialogContent
          sx={{
            px: { xs: MOBILE_PADDING_X, md: DESKTOP_PADDING_X },
            py: 0,
            pb: { xs: 12, md: 0 },
          }}
        >
          {children}
        </DialogContent>
        <DialogActions
          sx={{
            px: { xs: MOBILE_PADDING_X, md: DESKTOP_PADDING_X },
            pb: { xs: MOBILE_PADDING_Y, md: DESKTOP_PADDING_Y },
            pt: 3,
            position: { xs: "absolute", md: "static" },
            bottom: 0,
            width: "100%",
            background: "white",
          }}
        >
          {secondaryButtonText && (
            <AppButton
              disabled={disableSecondaryButton}
              variant="outlined"
              type={isForm ? "submit" : "button"}
              fullWidth
              onClick={onSecondaryButtonClick}
            >
              {secondaryButtonText}
            </AppButton>
          )}
          {primaryButtonText && (
            <AppButton
              type={isForm ? "submit" : "button"}
              fullWidth
              onClick={onPrimaryButtonClick}
              loading={isLoading}
            >
              {primaryButtonText}
            </AppButton>
          )}
        </DialogActions>
      </Box>
    </Dialog>
  );
}
