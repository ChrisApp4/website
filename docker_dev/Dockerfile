FROM node:10.16.0-stretch

# -------------
# Install packages
# -------------

# Base packages
RUN apt-get update -qq && apt-get install -y vim less curl sudo

# Convenient alias
RUN echo "alias ll='ls -lah --color'" >> /root/.bashrc

# -------------
# Working directory
# -------------

ENV HEXO_ROOT /var/www/website
WORKDIR $HEXO_ROOT

# -------------
# Install NodeJS packages into a directory outside the workdir
# The entry point links the directory to [workdir]/node_modules after the host's app directory is bind mounted
# -------------

COPY package.json .
COPY yarn.lock .
RUN yarn install --modules-folder /usr/local/node_modules

# -------------
# Add project files
# -------------

COPY . .

# -------------
# Container startup
# -------------

EXPOSE 8000

ENTRYPOINT ["docker_dev/bin/entrypoint.sh"]

# Launch Hexo server (local development)
CMD ["./node_modules/.bin/gatsby", "develop", "-H", "0.0.0.0", "-p", "8000"]