const { IconButton, Tooltip } = require("@mui/material");
const { Box } = require("@mui/system");
const { useRef, useState } = require("react");
const { useTranslation } = require("react-i18next");
const { LanguagePopover } = require("src/layouts/dashboard/language-popover");

const languages = {
  en: "/static/icons/uk_flag.svg",
  ja: "/static/icons/ja_flag.svg",
  vi: "/static/icons/vi_flag.svg",
};

const LanguageButton = () => {
  const anchorRef = useRef(null);
  const { t, i18n } = useTranslation();
  const [openPopover, setOpenPopover] = useState(false);

  const handleOpenPopover = () => {
    setOpenPopover(true);
  };

  const handleClosePopover = () => {
    setOpenPopover(false);
  };

  return (
    <>
      <Tooltip title={t("MEC_LANGUAGE_CHANGED")}>
        <IconButton onClick={handleOpenPopover} ref={anchorRef} sx={{ ml: 1 }}>
          <Box
            sx={{
              display: "flex",
              height: 20,
              width: 20,
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="" src={languages[i18n.language]} />
          </Box>
        </IconButton>
      </Tooltip>

      <LanguagePopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

export default LanguageButton;
