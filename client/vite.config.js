import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add other extensions as needed
    },
    //use mobile to test responsive
    server:{
      host: '0.0.0.0'
    },
    define: {
      'process.env': env
    }
  }
})
