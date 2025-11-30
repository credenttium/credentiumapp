npm install @capacitor/camera
npm install @capacitor/filesystem

npx cap add android
npx npm run build --  --configuration=production && npx cap copy
npx cap sync --inline
