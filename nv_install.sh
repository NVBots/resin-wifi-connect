#!/bin/bash

apt-get update && apt-get install -y \
	wget \
	bind9 \
	bridge-utils \
	connman \
	iptables \
	libdbus-1-dev \
	libexpat-dev \
	net-tools \
	usbutils \
	wireless-tools \
	&& rm -rf /var/lib/apt/lists/*

cp -r ./assets/bind /etc/bind

mkdir -p /usr/src/app

cp package.json /usr/src/app
npm install --prefix /usr/src/app --unsafe-perm --production && npm cache clean

ls /usr/src/app
ls /usr/src/app/node_modules
ls /usr/src/app/node_modules/.bin

cp bower.json /usr/src/app
/usr/src/app/node_modules/.bin/bower --allow-root install \
    && /usr/src/app/node_modules/.bin/bower --allow-root cache clean

cp -r ./ /usr/src/app
/usr/src/app/node_modules/.bin/coffee -c /usr/src/app/src
chmod +x /usr/src/app/start

cd /usr/src/app
npm rebuild

cp -r /usr/src/app/bower_components/ /usr/src/app/src/public/

