# Minesweeper SDK

This SDK is designed to be used from a frontend app.

## Initialization

```javascript
sdk.init({
	baseURL: "http://..."
})
```

## Authenticate

```javascript
sdk.authenticate({
	name: "lucas",
	password: "123456"
})
```

## Users

### Create

```javascript
sdk.createUser({
	name: "lucas",
	password: "123456"
})
```

### Read

```javascript
sdk.readUser({
	userId: "e341410d-752a-404f-9acc-904764fd38f3"
})
```

## Games

### Create

```javascript
sdk.createGame({
	rows: 16,
	columns: 30,
	mines: 50
})
```

### Read

```javascript
sdk.readGame({
	gameId: "63458641-0406-4b35-998e-ab41692ca417"
})
```

### Play

```javascript
sdk.playGame({
	gameId: "63458641-0406-4b35-998e-ab41692ca417",
	row: 5,
	columns: 10,
	action: "step"
})
```

### Pause

```javascript
sdk.pauseGame({
	gameId: "63458641-0406-4b35-998e-ab41692ca417"
})
```