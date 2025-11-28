// utils/formatCurrency.js

/**
 * Định dạng số thành chuỗi tiền tệ với phân cách hàng nghìn.
 * @param {number | string} value - Giá trị cần định dạng.
 * @returns {string} - Chuỗi định dạng tiền tệ.
 */
export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "";
  return value
    .toString()
    .replace(/\D/g, "") // Xóa các ký tự không phải số
    .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Thêm dấu phân cách hàng nghìn
};

/**
 * Chuyển đổi chuỗi tiền tệ thành số nguyên.
 * @param {string} value - Chuỗi tiền tệ cần chuyển đổi.
 * @returns {number} - Giá trị số nguyên.
 */
export const parseCurrency = (value) => {
  if (value === null || value === undefined) return 0;
  return parseInt(value.replace(/\D/g, ""), 10); // Xóa các ký tự không phải số và chuyển đổi thành số nguyên
};
