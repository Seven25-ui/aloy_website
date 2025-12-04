#!/bin/bash
git add .
git commit -m "Update website"
git pull origin main
git push origin main

echo "Website updated sa GitHub! 🎉"

