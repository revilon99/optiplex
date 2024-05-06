cd /home/ocass/optiplex/main/

cd hello-world
(nohup npm run run) > /dev/null 2>&1 & echo $! > PID.txt &
cd ..

cd hello-world-2
(nohup npm run run) > /dev/null 2>&1 & echo $! > PID.txt &
cd ..
