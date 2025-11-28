import { Tooltip, styled, tooltipClasses } from "@mui/material";

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        padding: 0,
        // maxHeight: '400px',
        // overflow: 'auto',
        // '&::-webkit-scrollbar': {
        //     width: '8px',
        // },
        // '&::-webkit-scrollbar-thumb': {
        //     backgroundColor: '#888',
        //     borderRadius: '4px',
        // },
        // '&::-webkit-scrollbar-thumb:hover': {
        //     backgroundColor: '#555',
        // },
        // '&::-webkit-scrollbar-track': {
        //     backgroundColor: '#f1f1f1',
        //     borderRadius: '4px',
        // },
    },
}));

export default BootstrapTooltip;