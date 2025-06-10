import { Router } from 'express';
import { Item } from '../types/item';

const router = Router();
let items: Item[] = [];
let nextId = 1;

// GET all items
router.get('/', (req, res) => {
  res.json(items);
});

// GET single item by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// POST new item
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newItem: Item = { id: nextId++, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update item
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((i) => i.id === id);
  const { name } = req.body;

  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  item.name = name;
  res.json(item);
});

// DELETE item
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((i) => i.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }

  const deleted = items.splice(index, 1);
  res.json(deleted[0]);
});

export default router;
