## Build Environment
# The latest LTS version of node
# We are using the -build version so that npm does not generate a 
#   Z_INDEX_ERROR: Too far back
FROM balenalib/armv7hf-node:10-stretch-build as builder

# Create app directory
WORKDIR /usr/app

ENV PKG_TARGET="node10-linux-armv7"

# Add app
COPY . .

# Start QEMU support for building on all architectures
RUN [ "cross-build-start" ]

# install deps
RUN yarn install

# Test app
RUN yarn test --no-watch

# Install pkg and Build App
RUN yarn build

## Prod Environment
FROM balenalib/armv7hf:stretch-run

WORKDIR /usr/app

COPY --from=builder /usr/app/build/node-template /usr/app

# Make port 4001 available to the world outside this container
EXPOSE 4001

# Start the app
ENTRYPOINT ["./node-template"]