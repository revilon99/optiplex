cd /home/ocass/optiplex/

cd $1

cd hello-world
(nohup npm run $1&) 2>&1| tee npm.txt
cd ..

cd auth
(nohup npm run $1&) 2>&1| tee npm.txt
cd ..
