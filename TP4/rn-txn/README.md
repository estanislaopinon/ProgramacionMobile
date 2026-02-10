# Sistema de Transacciones Bancarias en Tiempo Real (Saga Pattern) 💳

Este proyecto implementa un flujo de transacciones bancarias usando una arquitectura orientada a eventos (EDA). Emplea **Kafka** como bus de mensajes para coordinar microservicios desacoplados y **WebSockets** para actualizar en tiempo real una aplicación **React Native (Expo)**.

**Arquitectura del sistema**

El sistema está compuesto por 5 componentes principales:

- **Infraestructura (Docker)**: Cluster de Kafka y Zookeeper para la persistencia y distribución de eventos.
- **API de Entrada (`api.js`)**: Recibe peticiones POST de transacciones y publica comandos en el tópico `txn.commands`.
- **Orquestador (`orchestrator.js`)**: Implementa la saga; escucha comandos, valida fondos y fraude, y emite eventos de éxito o reversa.
- **Gateway WebSocket (`index.js`)**: Consume el tópico `txn.events` y envía actualizaciones a los clientes conectados.
- **App Mobile (React Native)**: Interfaz que muestra el timeline de la transacción mediante una conexión persistente.

## Cómo ejecutar el proyecto

### Requisitos previos

- Docker y Docker Compose
- Node.js (v16+)
- Expo CLI / Expo Go (o un navegador para `expo start --web`)

### Iniciar la infraestructura y servicios

En primer lugar, levanta la infraestructura con Docker Compose:

```bash
docker compose up -d
```

Luego ejecuta los servicios del backend en terminales separadas:

```bash
# Terminal 1: API
node backend-gateway/api.js

# Terminal 2: Orquestador
node backend-gateway/orchestrator.js

# Terminal 3: Gateway WebSocket
node backend-gateway/index.js

# Iniciar la app (web)
npx expo start --web
```

## Probar el flujo (Postman)

Para verificar que los eventos fluyen y se reflejan en la app:

1. Asegúrate de que la App esté abierta y muestre el estado "Conectado".
2. En Postman crea una petición POST a:

```
http://localhost:3000/transactions
```

3. Selecciona `raw` y formato `JSON` en el body. Ejemplo de cuerpo:

```json
{
  "transactionId": "TX-123",
  "fromAccount": "CTA-ESTANI-01",
  "toAccount": "CTA-DESTINO-99",
  "amount": 7500,
  "currency": "ARS",
  "userId": "USER-01"
}
```


