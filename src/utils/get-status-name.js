export const getStatusName = (status, statusNames) => {

    if (status >= 0 && status < statusNames.length) {
        return statusNames[status];
    } else {
        return '';
    }
}