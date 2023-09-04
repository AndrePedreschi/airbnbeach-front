
echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* ssh -i .ssh/gp1-frontend ubuntu@3.17.158.97:/var/www/3.17.158.97/

echo "Done!!!"