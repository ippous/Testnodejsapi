import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const DATA_DIR = 'data/';
fs.ensureDirSync(DATA_DIR);

// Read lists configuration
function getListsConfig() {
  const content = fs.readFileSync(path.join(DATA_DIR, 'lists.csv'), 'utf-8');
  return parse(content, { 
    columns: true, 
    skip_empty_lines: true,
    delimiter: ';',
    trim: true
  });
}

// Read items from a CSV file
function getListItems(filename) {
  const filepath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return [];
  }
  const content = fs.readFileSync(filepath, 'utf-8');
  return parse(content, { 
    columns: true, 
    skip_empty_lines: true,
    delimiter: ',',
    trim: true
  });
}

// Get all lists
app.get('/api/lists', (req, res) => {
  try {
    const lists = getListsConfig();
    console.log('Raw lists data:', lists); // Debug log
    
    const formattedLists = lists.map(list => ({
      id: parseInt(list.id, 10),
      name: list.name,
      filename: list.filename
    }));
    
    res.json(formattedLists);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la lecture des listes',
      error: error.message 
    });
  }
});

// Get workers list
app.get('/api/workers', (req, res) => {
  try {
    const workers = getListItems('worker.csv');
    res.json(workers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la lecture des workers' });
  }
});

// Get warehouses list
app.get('/api/warehouses', (req, res) => {
  try {
    const warehouses = getListItems('warehouse.csv');
    res.json(warehouses);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la lecture des entrepôts' });
  }
});

// Get available workers by warehouse
app.get('/api/available-workers', (req, res) => {
  try {
    const availableWorkers = getListItems('available_worker_for_warehouse.csv');
    res.json(availableWorkers);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la lecture des disponibilités' });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});