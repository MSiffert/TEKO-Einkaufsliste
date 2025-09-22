import React from 'react';
import { Item } from '../api';


type Props = {
    items: Item[];
    onToggle: (id: number, checked: boolean) => void;
    onEdit: (item: Item) => void;
    onDelete: (id: number) => void;
};


export default function ItemList({ items, onToggle, onEdit, onDelete }: Props) {
    if (items.length === 0) return <p>Keine Artikel vorhanden.</p>;
    return (
        <ul>
            {items.map(item => (
                <li key={item.id} className="item">
                    <input type="checkbox" checked={item.checked} onChange={e => onToggle(item.id, e.target.checked)} aria-label={`Abhaken ${item.name}`} />
                    <div>
                        <div className="label">{item.name}</div>
                        <div className="badge">Menge: {item.quantity}</div>
                    </div>
                    <div className="actions">
                        <button onClick={() => onEdit(item)}>Bearbeiten</button>
                        <button onClick={() => onDelete(item.id)}>Löschen</button>
                    </div>
                </li>
            ))}
        </ul>
    );
}