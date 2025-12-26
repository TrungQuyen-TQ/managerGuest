import fs from "fs-extra";
import path from "path";

// Cấu hình ổ đĩa mục tiêu
const ROOT_PATH = "D:/";

export default async function handler(req, res) {
  // Log để bạn kiểm tra trong Terminal xem SVAR đang gửi gì lên
  console.log(">>> Request:", req.method, "Query:", req.query);

  const { id, params } = req.query;

  // 1. XỬ LÝ INFO (Cho hàm restProvider.loadInfo())
  if (params && params[0] === "info") {
    return res.status(200).json({
      stats: { path: "/", size: 100 * 1024 * 1024 * 1024, used: 10 * 1024 * 1024 * 1024 }
    });
  }

  // 2. XÁC ĐỊNH ĐƯỜNG DẪN THỰC TẾ
  // SVAR gửi id qua query string (?id=%2FProjectII)
  let relativePath = id ? decodeURIComponent(id) : "/";
  if (relativePath === "undefined") relativePath = "/";

  // Kết hợp ROOT_PATH và đường dẫn tương đối
  const currentPath = path.join(ROOT_PATH, relativePath === "/" ? "" : relativePath);

  // --- GET: LIỆT KÊ FILE/FOLDER ---

  if (req.method === "GET") {
    try {
      if (!fs.existsSync(currentPath)) {
        return res.status(404).json({ error: "Không tìm thấy thư mục" });
      }

      const items = await fs.readdir(currentPath);
      const hiddenItems = ['$RECYCLE.BIN', 'System Volume Information', 'Config.Msi', 'dumpstack.log.tmp'];

      // Dùng Promise.all để chạy song song việc đọc thông tin stats
      const data = await Promise.all(
        items
          .filter(name => !hiddenItems.includes(name))
          .map(async (name) => {
            try {
              const fullPath = path.join(currentPath, name);
              const stats = await fs.stat(fullPath); 

              const itemRelativePath = path.join(relativePath, name).replace(/\\/g, "/");
              const finalId = itemRelativePath.startsWith("/") ? itemRelativePath : "/" + itemRelativePath;

              return {
                id: finalId,
                name: name,
                type: stats.isDirectory() ? "folder" : "file",
                size: stats.size,
                date: stats.mtime,
                ...(stats.isDirectory() ? { data: [] } : {})
              };
            } catch (e) {
              return null; 
            }
          })
      );

      return res.status(200).json(data.filter(item => item !== null));
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
  // --- POST: TẠO MỚI ---
  if (req.method === "POST") {
    try {
      const { name, type } = req.body;
      const targetPath = path.join(currentPath, name);

      if (type === "folder") {
        await fs.ensureDir(targetPath);
      } else {
        await fs.writeFile(targetPath, "");
      }

      const newId = path.join(relativePath, name).replace(/\\/g, "/");
      return res.status(200).json({ id: newId.startsWith("/") ? newId : "/" + newId, status: "ok" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}