cd /home/ocass/optiplex/main/

cd hello-world
PID=$(cat "PID.txt")
kill -9 $PID
cd ..

cd hello-world-2
PID=$(cat "PID.txt")
kill -9 $PID
cd ..
