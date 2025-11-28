import CryptoJS from "crypto-js";

// Hàm decode payload từ JWT
// export function parseJwt(token) {
//   try {
//     const base64Payload = token.split(".")[1];
//     const payload = JSON.parse(atob(base64Payload));
//     return payload;
//   } catch (error) {
//     console.error("Token không hợp lệ:", error);
//     return null;
//   }
// }

export function parseJwt(token) {
  try {
    const base64Payload = token.split(".")[1];
    const base64 = base64Payload.replace(/-/g, "+").replace(/_/g, "/");
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const jsonPayload = new TextDecoder().decode(bytes);
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Token không hợp lệ:", error);
    return null;
  }
}

// Hàm decrypt dữ liệu dp bằng AES
export function decryptPermissions(encrypted, keyBase64) {
  const key = CryptoJS.enc.Base64.parse(keyBase64);
  const encryptedData = CryptoJS.enc.Base64.parse(encrypted);

  const iv = CryptoJS.lib.WordArray.create(encryptedData.words.slice(0, 4));
  const ciphertext = CryptoJS.lib.WordArray.create(encryptedData.words.slice(4));

  const decrypted = CryptoJS.AES.decrypt({ ciphertext }, key, { iv });
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}
