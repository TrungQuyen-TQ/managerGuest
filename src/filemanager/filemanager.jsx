// Sửa đổi dòng này
import { Filemanager } from "@svar-ui/react-filemanager"; 
// Giữ nguyên các dòng còn lại
import { getData, getDrive } from "src/data/data";
import "@svar-ui/react-filemanager/all.css";
import { Willow } from "@svar-ui/react-core";


export default function FileManager() {
  return <>
    <Willow>
        <Filemanager data={getData()} drive={getDrive()} />;

    </Willow>
  </>
  
}