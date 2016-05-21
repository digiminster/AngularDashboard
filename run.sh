#! /bin/bash

npm install
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
$DIR/node_modules/.bin/electron $DIR/src/app/main.js "$@" & > /dev/null
