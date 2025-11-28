export function getPathFromUrl(url) {
    // Tạo một đối tượng URL từ đường dẫn
    var urlObject = new URL(url);

    // Lấy ra đường dẫn từ đối tượng URL
    var path = urlObject.pathname;

    return path;
}
