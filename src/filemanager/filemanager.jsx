import { useEffect, useState, useMemo } from "react";
import { Filemanager } from "@svar-ui/react-filemanager";
import { RestDataProvider } from "@svar-ui/filemanager-data-provider";
import { Willow } from "@svar-ui/react-core";
import "@svar-ui/react-filemanager/all.css";

export default function FileManager() {
  // 1. Sửa endpoint thành /api/files để khớp với cấu trúc thư mục API của bạn
  const restProvider = useMemo(() => new RestDataProvider("/api/files"), []);
  const [rawData, setRawData] = useState([]);

  const [data, setData] = useState([]);
  const [drive, setDrive] = useState({});

  // loading data
  useEffect(() => {
    Promise.all([restProvider.loadFiles(), restProvider.loadInfo()]).then(
      ([files, info]) => {
        setData(files);
        if (info && info.stats) {
        setDrive({
          used: info.stats.used,
          total: info.stats.size // Bạn đang để Backend trả về 'size', SVAR cần 'total'
        });
      }
      }
    ).catch(err => {
      console.error("Lỗi khi tải dữ liệu từ server:", err);
    });
  }, []);

  const init = (api) => {
    // 3. Gắn provider xử lý CRUD
    api.setNext(restProvider);

    // 4. Xử lý Lazy Loading
    api.on("open-file", (id) => {
      const item = api.getItem(id);

      // Chỉ load nếu là folder và bên trong chưa có data (tránh load lặp lại)
      if (item && item.type === "folder" && (!item.data || item.data.length === 0)) {

        // restProvider.loadFiles(id) lúc này sẽ gọi: GET /api/files/files?id=...
        // Hoặc phụ thuộc vào cách bạn cấu hình, nó sẽ gửi id qua query param
        restProvider.loadFiles(id).then((subFiles) => {
          if (subFiles && subFiles.length > 0) {
            api.update(id, { data: subFiles, open: true });
          } else {
            // Nếu folder trống, vẫn mở nó ra
            api.update(id, { open: true });
          }
        });
      }
    });
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Willow>
        <Filemanager
          init={init}
          data={data}
          drive={drive}
        />
      </Willow>
    </div>
  );
}