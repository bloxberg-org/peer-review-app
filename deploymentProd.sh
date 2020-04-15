#!/bin/bash
#

# A simple static HTML + JS deployment script that handles Nginx www-data user correclty.
# Works e.g. Ubuntu Linux Azure and Amazon EC2 Ubuntu server out of the box.
#
set -e
set -u

# The remote server we are copying the files using ssh + public key authentication.
# Specify this in .ssh/config
REMOTE=bloxberg-mpcdf

# Build dist folder using webpack
#npm run build

# Copy local dist folder to the remote server Nginx folder over sudoed
# Assum the default user specified in .ssh/config has passwordless sudo
# https://crashingdaily.wordpress.com/2007/06/29/rsync-and-sudo-over-ssh/
#scp -r BloxbergApp/* $REMOTE:/srv/bloxbergcertifyapp
rsync -r --rsync-path="sudo rsync" ./client/build $REMOTE:/srv/peer-review-app/client
