export function setDataTableStyle(listDataTable) {
    let style = {};
    if (listDataTable === null || listDataTable === undefined || listDataTable.length === 0) {
        style = { width: "100%", height: 400 };
    } else {
        style = { width: "100%" };
    }
    return style;
}
