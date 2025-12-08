import { Checkbox } from '@mui/material'; // <-- Component MUI
import { useStore } from '@svar-ui/lib-react';

function MuiSelectionCheckboxCell({ row, api }) {
    // Lấy trạng thái hàng đã chọn từ Grid Store
    const selectedRows = useStore(api, 'selectedRows');
    const isSelected = selectedRows.indexOf(row.id) !== -1; // Kiểm tra trạng thái chọn

    function onChange(event) {
        // Lấy trạng thái mới từ event của MUI Checkbox
        const newValue = event.target.checked; 

        // Gọi API của Grid để thay đổi trạng thái chọn
        api.exec('select-row', {
            id: row.id,
            mode: newValue, // Chuyển trạng thái boolean (true/false)
            toggle: true,
        });
    }

    return (
        <div data-action="ignore-click" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Checkbox
                // MUI Checkbox sử dụng 'checked' để gán trạng thái
                checked={isSelected} 
                onChange={onChange}
                size="small" // Tùy chọn kích thước
            />
        </div>
    );
}

export default MuiSelectionCheckboxCell;