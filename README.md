# NestJS Microservices Demo

Event-driven order processing system built with NestJS, RabbitMQ, and PostgreSQL.

## Architecture

```
POST /orders
     │
     ▼
[API Gateway] ──── orders_queue ────► [Order Service] ──── notifications_queue ────► [Notification Service]
                   (RabbitMQ)               │                   (RabbitMQ)
                                            ▼
                                       [PostgreSQL]
```

### Services

| Service | Role |
|---------|------|
| `api-gateway` | Accepts HTTP requests, publishes events to RabbitMQ |
| `order-service` | Consumes events, saves orders to PostgreSQL, emits next event |
| `notification-service` | Consumes events, simulates email/push notification |

## Running

```bash
docker-compose up --build
```

## Test

```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{"product": "keyboard", "quantity": 2, "userId": "user-123"}'
```

## What happens

1. `api-gateway` receives the POST and emits `order_created` to `orders_queue`
2. `order-service` handles `order_created`, saves the order to Postgres, emits `order_saved` to `notifications_queue`
3. `notification-service` handles `order_saved` and logs a simulated notification

## Tech Stack

- **NestJS** — framework for all services
- **RabbitMQ** — message broker (event bus)
- **PostgreSQL + TypeORM** — persistence
- **Docker Compose** — local orchestration
