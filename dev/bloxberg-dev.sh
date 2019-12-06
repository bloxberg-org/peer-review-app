#!/bin/sh
source "$(dirname "$0")/scripts/secret.sh"
source "$(dirname "$0")/scripts/env.sh"
bash "$(dirname "$0")/scripts/tmux.sh"

# Open folders in VS Code
code $PEER_REVIEW_PATH/client
code $PEER_REVIEW_PATH/server

# Attach to the tmux sesion
tmux a -t peer

