#!/bin/bash

# Folder sa repo
cd ~/pangalan-sa-repo

# Watch index.html, CSS, JS
while inotifywait -e close_write *.html *.css *.js; do
    ./deploy.sh
done
