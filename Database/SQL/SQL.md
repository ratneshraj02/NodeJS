# SQL



### To connect to PostgreSQL running in Docker Compose and access the database through your terminal, you can use docker compose exec and psql

1.Example docker-compose.yml

```
    services:
  postgres:
    image: postgres:16
    container_name: postgres_db
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: secret123
      POSTGRES_DB: myDB
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:

```

2. Start PostgreSQL

Open your terminal in the directory containing docker-compose.yml and run:

```
  docker compose up -d
```

Check whether the container is running:

```
docker compose ps

```

3. Access PostgreSQL through the terminal
   Method : Connect using docker compose exec

```
docker compose exec postgres psql -U admin -d myDB

```

Method : Connect from your local terminal

```
psql -h localhost -p 5432 -U admin -d myDB

```
