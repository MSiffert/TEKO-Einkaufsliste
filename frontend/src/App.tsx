import React, { useEffect, useMemo, useState } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import Toolbar from './components/Toolbar';
import ConfirmDialog from './components/ConfirmDialog';
import { Item, listItems, createItem, updateItem, deleteItem, resetAll } from './api';

export default function App() {
    const [items, setItems] = useState<Item[]>([]);
    const [editing, setEditing] = useState<Item | null>(null);
    const [confirmReset, setConfirmReset] = useState(false);

    async function refresh() {
        setItems(await listItems());
    }

    useEffect(() => {
        refresh();
    }, []);

    const stats = useMemo(() => ({ total: items.length, checked: items.filter(i => i.checked).length }), [items]);

    async function handleSubmit(name: string, quantity: number) {
        if (editing) {
            const upd = await updateItem(editing.id, { name, quantity });
            setEditing(null);
            setItems(prev => prev.map(i => i.id === upd.id ? upd : i));
        } else {
            const created = await createItem(name, quantity);
            setItems(prev => [created, ...prev]);
        }
    }

    return (
        <div className="container">
            <header>
                <h1>Shopping-Liste</h1>
                <div className="badge">{stats.checked}/{stats.total} abgehakt</div>
            </header>

            <div className="grid" style={{ marginTop: 16 }}>
                <div className="card">
                    <h2 style={{ marginTop: 0 }}>{editing ? 'Artikel bearbeiten' : 'Artikel hinzufügen'}</h2>
                    <ItemForm onSubmit={handleSubmit} initial={editing ? { name: editing.name, quantity: editing.quantity } : null} />
                </div>

                <div className="card">
                    <h2 style={{ marginTop: 0 }}>Alle Artikel</h2>
                    <ItemList
                        items={items}
                        onToggle={async (id, checked) => {
                            const upd = await updateItem(id, { checked });
                            setItems(prev => prev.map(i => i.id === id ? upd : i));
                        }}
                        onEdit={setEditing}
                        onDelete={async (id) => {
                            await deleteItem(id);
                            setItems(prev => prev.filter(i => i.id !== id));
                        }}
                    />
                </div>

            </div>

            <div className="card" style={{ marginTop: 16 }}>
                <Toolbar onReset={() => setConfirmReset(true)} />
            </div>

            <ConfirmDialog
                open={confirmReset}
                message="Möchtest du wirklich die gesamte Liste löschen?"
                onCancel={() => setConfirmReset(false)}
                onConfirm={async () => { await resetAll(); setConfirmReset(false); await refresh(); }}
            />
        </div>
    );
}