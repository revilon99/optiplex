cd /home/ocass/optiplex/

cd $1

cd portal
nohup npm run $1 &
cd ..

cd auth
nohup npm run $1 &
cd ..

cd system
nohup npm run $1 &
cd ..
