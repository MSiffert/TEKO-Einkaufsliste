export type Item = { id: number; name: string; quantity: number; checked: boolean; created_at: string; updated_at: string };

export async function listItems(): Promise<Item[]> {
    const result = await fetch('/api/items');
    return result.json();
}

export async function createItem(name: string, quantity: number) {
    const result = await fetch('/api/items', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, quantity }) });
    if (!result.ok) {
        throw new Error('Fehler beim Erstellen');
    }

    return result.json();
}

export async function updateItem(id: number, data: Partial<Pick<Item, 'name' | 'quantity' | 'checked'>>) {
    const result = await fetch(`/api/items/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
    if (!result.ok) {
        throw new Error('Fehler beim Aktualisieren');
    }

    return result.json();
}

export async function deleteItem(id: number) {
    const result = await fetch(`/api/items/${id}`, { method: 'DELETE' });

    if (!result.ok && result.status !== 204) {
        throw new Error('Fehler beim Löschen');
    }
}

export function exportCsvUrl() {
    return '/api/items/export/csv';
}

export async function resetAll() {
    const r = await fetch('/api/items/reset', { method: 'POST' });
    if (!r.ok) throw new Error('Fehler beim Zurücksetzen');
}