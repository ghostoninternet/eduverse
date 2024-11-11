import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add other extensions as needed
  },
  //use mobile to test responsive
  server:{
    host: '0.0.0.0'
  }
})
