# Absolute path to this script.
SCRIPT=$(readlink -f $0)
PEER_REVIEW_PATH=$(dirname $(dirname "$SCRIPT"))
export PEER_REVIEW_PATH