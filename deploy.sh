#!/bin/sh

set -e

IMAGE="ernestohegi/life-game"
LATEST_COMMIT_ID=$(git log --format="%H" -n 1)

docker build -t ${IMAGE}:${LATEST_COMMIT_ID} .
docker tag ${IMAGE}:${LATEST_COMMIT_ID} ${IMAGE}:latest

echo "${DOCKER_PASSWORD" | docker login -u "${DOCKER_USERNAME}" --password-stdin docker push ${IMAGE}:${LATEST_COMMIT_ID}
