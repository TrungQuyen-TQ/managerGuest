export const generateChartData = (startDate, endDate) => {
  let days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  // Nếu là từ DateRange, cộng thêm 1 ngày
  const isDefinedRange = checkIfDefinedRange(startDate, endDate);
  if (!isDefinedRange) {
    days += 1;
  }

  // Đảm bảo days không nhỏ hơn 1
  if (days < 1) {
    days = 1; // Đặt mặc định là 1 để tránh lỗi
  }

  return Array.from({ length: days }, () => Math.floor(Math.random() * 100) + 20);
};

export const checkIfDefinedRange = (startDate, endDate) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  if (startDate.getTime() === today.getTime() && endDate.getTime() === today.getTime()) {
    return true; // Today
  }
  if (startDate.getTime() === lastWeek.getTime() && endDate.getTime() === today.getTime()) {
    return true; // Last 7 Days
  }
  if (startDate.getMonth() === lastMonth.getMonth() && endDate.getMonth() === today.getMonth()) {
    return true; // Last Month
  }
  return false; // Không thuộc DefinedRange
};
