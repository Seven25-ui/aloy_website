#!/bin/bash
# ================================
# Termux Cloud Upload & Direct Link Script
# Supports Google Drive via rclone
# ================================

# Check if rclone is installed
if ! command -v rclone &> /dev/null
then
    echo "rclone not found. Installing..."
    pkg update -y && pkg install rclone -y
fi

# Step 1: Configure remote if not exists
REMOTE_NAME="gdrive"  # Change if you want another remote
if ! rclone listremotes | grep -q "$REMOTE_NAME:"; then
    echo "Setting up rclone remote..."
    rclone config
fi

# Step 2: Upload file
FILE="$1"
if [ -z "$FILE" ]; then
    echo "Usage: bash setup_cloud.sh filename"
    exit 1
fi

REMOTE_PATH="$2"
if [ -z "$REMOTE_PATH" ]; then
    REMOTE_PATH="$REMOTE_NAME:/TermuxUploads"
fi

echo "Uploading $FILE to $REMOTE_PATH..."
rclone copy "$FILE" "$REMOTE_PATH" --progress

# Step 3: Generate Google Drive direct link
# Only works if remote is Google Drive
FILE_ID=$(rclone lsjson "$REMOTE_PATH/$(basename "$FILE")" | grep -oP '(?<="ID": ")[^"]+')
if [ -n "$FILE_ID" ]; then
    echo "Direct download link for website:"
    echo "https://drive.google.com/uc?export=download&id=$FILE_ID"
else
    echo "Cannot generate direct link. Make sure your remote is Google Drive."
fi

echo "Done!"
