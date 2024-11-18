# Worker Warehouse API

Une API REST pour gérer les travailleurs, les entrepôts et leurs disponibilités. Les données sont stockées dans des fichiers CSV.

## Installation

```bash
# Cloner le repository
git clone <votre-repo-url>

# Installer les dépendances
npm install

# Démarrer le serveur
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## Structure des fichiers

```
data/
├── lists.csv          # Configuration des listes
├── worker.csv         # Liste des travailleurs
├── warehouse.csv      # Liste des entrepôts
└── available_worker_for_warehouse.csv  # Disponibilités
```

## API Endpoints

### Listes disponibles

```http
GET /api/lists
```

Retourne toutes les listes configurées dans le système.

**Réponse**
```json
[
  {
    "id": 1,
    "name": "Worker",
    "filename": "worker.csv"
  },
  {
    "id": 2,
    "name": "WareHouse",
    "filename": "warehouse.csv"
  },
  {
    "id": 3,
    "name": "Available Worker By WareHouse",
    "filename": "available_worker_for_warehouse.csv"
  }
]
```

### Travailleurs

```http
GET /api/workers
```

Retourne la liste de tous les travailleurs.

**Réponse**
```json
[
  {
    "id": "1",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "+33123456789"
  },
  {
    "id": "2",
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phone": "+33987654321"
  }
]
```

### Entrepôts

```http
GET /api/warehouses
```

Retourne la liste de tous les entrepôts.

**Réponse**
```json
[
  {
    "id": "1",
    "name": "Paris Nord",
    "location": "Paris",
    "capacity": "500"
  },
  {
    "id": "2",
    "name": "Lyon Centre",
    "location": "Lyon",
    "capacity": "300"
  }
]
```

### Disponibilités des travailleurs

```http
GET /api/available-workers
```

Retourne la liste des disponibilités des travailleurs par entrepôt.

**Réponse**
```json
[
  {
    "worker_id": "1",
    "warehouse_id": "1",
    "availability_date": "2024-01-15"
  },
  {
    "worker_id": "2",
    "warehouse_id": "2",
    "availability_date": "2024-01-16"
  }
]
```

## Technologies utilisées

- Node.js
- Express.js
- CSV Parser/Stringify
- CORS
- fs-extra

## Développement

Pour lancer le serveur en mode développement avec rechargement automatique :

```bash
npm run dev
```

## Structure des fichiers CSV

### lists.csv
```csv
id;name;filename
1;Worker;worker.csv
2;WareHouse;warehouse.csv
3;Available Worker By WareHouse;available_worker_for_warehouse.csv
```

### worker.csv
```csv
id,name,email,phone
```

### warehouse.csv
```csv
id,name,location,capacity
```

### available_worker_for_warehouse.csv
```csv
worker_id,warehouse_id,availability_date
```