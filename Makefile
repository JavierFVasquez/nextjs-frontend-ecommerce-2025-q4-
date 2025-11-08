# Makefile for Docker operations
# Usage: make [target]

.PHONY: help build run stop clean logs shell test

# Default target
help:
	@echo "Available targets:"
	@echo "  build         - Build Docker image"
	@echo "  run           - Run container in detached mode"
	@echo "  stop          - Stop running container"
	@echo "  clean         - Remove container and image"
	@echo "  logs          - View container logs"
	@echo "  shell         - Access container shell"
	@echo "  up            - Start with docker-compose"
	@echo "  down          - Stop with docker-compose"
	@echo "  restart       - Restart docker-compose services"

# Docker variables
IMAGE_NAME=ecommerce-frontend
CONTAINER_NAME=ecommerce-frontend
PORT=3000

# Build Docker image
build:
	@echo "Building Docker image..."
	docker build -t $(IMAGE_NAME) .

# Run container
run:
	@echo "Starting container..."
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p $(PORT):$(PORT) \
		$(IMAGE_NAME)

# Stop container
stop:
	@echo "Stopping container..."
	docker stop $(CONTAINER_NAME) || true

# Clean up container and image
clean: stop
	@echo "Removing container and image..."
	docker rm $(CONTAINER_NAME) || true
	docker rmi $(IMAGE_NAME) || true

# View logs
logs:
	docker logs -f $(CONTAINER_NAME)

# Access container shell
shell:
	docker exec -it $(CONTAINER_NAME) /bin/sh

# Docker Compose commands
up:
	@echo "Starting services with docker-compose..."
	docker-compose up -d

down:
	@echo "Stopping services with docker-compose..."
	docker-compose down

restart:
	@echo "Restarting services..."
	docker-compose restart

# Build and run in one command
rebuild: clean build run
	@echo "Container rebuilt and running!"

