# PHP
sudo apt-get update
sudo apt-get -y install php7.1
sudo apt-cache search php7.1
sudo apt-get -y install php7.1 php7.1-cli php7.1-common php7.1-json php7.1-opcache php7.1-mysql php7.1-mbstring php7.1-mcrypt php7.1-zip php7.1-fpm php7.1-bcmath
sudo systemctl restart php7.1-fpm.service

# Node JS
sudo apt-get update
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get -y install nodejs
sudo apt-get -y install npm

# MySql
sudo apt-get update
sudo apt-get -y install mysql-server
sudo mysql_secure_installation

# RabbitMQ
wget -O- https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | sudo apt-key add -
echo "deb https://packages.erlang-solutions.com/ubuntu bionic contrib" | sudo tee /etc/apt/sources.list.d/rabbitmq.list
sudo apt-get update
sudo apt-get -y install erlang
wget -O- https://dl.bintray.com/rabbitmq/Keys/rabbitmq-release-signing-key.asc | sudo apt-key add -
wget -O- https://www.rabbitmq.com/rabbitmq-release-signing-key.asc | sudo apt-key add -
echo "deb https://dl.bintray.com/rabbitmq/debian $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/rabbitmq.list
sudo apt-get update
sudo apt-get -y install rabbitmq-server