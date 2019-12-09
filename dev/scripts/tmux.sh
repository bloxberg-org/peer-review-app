#!/bin/sh
# Script to start the bloxberg peer-review application development environment in a single tmux session.
# Window numbers:
# 0: mongo  ## set to 0 as 1,2,3 are more frequently used
# 1: frontend
# 2: backend
# 3: ganache-cli
# 4: truffle-console 
# 5: repo direcrory

# Variables
# $MNEMONIC = mnemonic as environment variable
# $REPODIRECTORY = directory to main folder as env var
SESSION='peer'
NETWORK='develop' 
#NETWORK='bloxberg'

# Start mongod as service 
sudo service mongod start
cd $PEER_REVIEW_PATH

# Start new session and remain detached
tmux new -s $SESSION -d

# Start mongod in the window
tmux rename-window -t $SESSION mongo
tmux send-keys -t $SESSION 'mongo' C-m

# Open windows for frontend & backend, ganache-cli, truffle-console
tmux new-window -t $SESSION
tmux rename-window -t $SESSION 'frontend'
tmux new-window -t $SESSION
tmux rename-window -t $SESSION 'backend'
tmux new-window -t $SESSION
tmux rename-window -t $SESSION 'ganache'
tmux new-window -t $SESSION
tmux rename-window -t $SESSION 'truffle'
tmux new-window -t $SESSION
tmux rename-window -t $SESSION 'Directory'

# Start ganache-cli
tmux select-window -t $SESSION:3
tmux send -t $SESSION "mkdir -p $PEER_REVIEW_PATH/ganache" C-m
tmux send-keys -t $SESSION "ganache-cli --mnemonic '$MNEMONIC' --db $PEER_REVIEW_PATH/ganache/  --networkId 5777 --quiet" C-m

# Start truffle
tmux select-window -t $SESSION:4
tmux send-keys -t $SESSION "truffle console --network $NETWORK" C-m

# Start backend 
tmux select-window -t $SESSION:2
tmux send -t $SESSION 'npm run dev' C-m

# Start frontend 
tmux select-window -t $SESSION:1
tmux send -t $SESSION 'cd client/; npm start' C-m

# Show directory
tmux select-window -t $SESSION:5
