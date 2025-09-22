import React, { useState, useEffect } from 'react';


type Props = { onSubmit: (name: string, quantity: number) => void; initial?: { name: string; quantity: number } | null };


export default function ItemForm({ onSubmit, initial }: Props) {
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        if (initial) { setName(initial.name); setQuantity(initial.quantity); }
    }, [initial]);


    return (
        <form className="grid" onSubmit={e => { e.preventDefault(); if (!name.trim()) return; onSubmit(name.trim(), quantity); setName(''); setQuantity(1); }}>
            <input placeholder="Artikel" value={name} onChange={e => setName(e.target.value)} aria-label="Artikelname" />
            <div style={{ display: 'flex', gap: 8 }}>
                <input type="number" min={1} value={quantity} onChange={e => setQuantity(parseInt(e.target.value || '1', 10))} aria-label="Menge" />
                <button className="primary" type="submit">Speichern</button>
            </div>
        </form>
    );
}