import { Typography } from '@mui/material';
import React from 'react';

// --- Component Ô Trạng Thái (Status Cell) ---
const StatusCell = ({ row }) => {
    const status = row.trangThai;
    let color = '';
    let bgColor = '';

    switch (status) {
        case 'Paid':
            color = 'success.dark'; // Xanh lá đậm
            bgColor = 'success.light'; // Xanh lá nhạt
            break;
        case 'Submit':
            color = 'info.dark'; // Xanh dương đậm
            bgColor = 'info.light'; // Xanh dương nhạt
            break;
        case 'Draft':
            color = 'text.secondary'; // Xám
            bgColor = 'background.default'; // Nền trắng/xám nhạt
            break;
        default:
            color = 'text.primary';
            bgColor = 'transparent';
    }

    return (
        <Typography
            sx={{
                color: color,
                backgroundColor: bgColor,
                padding: '2px 8px',
                borderRadius: '12px', // Bo tròn góc
                fontWeight: 'bold',
                fontSize: '0.75rem', // Chữ nhỏ hơn
                textAlign: 'center',
                display: 'inline-block', // Giúp nền chỉ bao quanh chữ
            }}
            variant="body2"
        >
            {status}
        </Typography>
    );
};

export default StatusCell;  