let base = import.meta.env.VITE_BASE_URL;
if (!base) {
  console.warn("VITE_BASE_URL is not defined, defaulting to http://localhost:8000");
  base = "http://localhost:8000";
}
const BASE_URL = `${base}/api`;
console.log('🚀 ~ BASE_URL:', BASE_URL)

export default BASE_URL;
