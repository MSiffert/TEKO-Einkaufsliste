import React from 'react';


type Props = { open: boolean; message: string; onConfirm: () => void; onCancel: () => void };
export default function ConfirmDialog({ open, message, onConfirm, onCancel }: Props) {
    if (!open) {
        return null;
    }

    return (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'grid', placeItems: 'center', padding: 16 }}>
            <div className="card" style={{ maxWidth: 420 }}>
                <p>{message}</p>
                <div className="actions" style={{ justifyContent: 'flex-end' }}>
                    <button onClick={onCancel}>Abbrechen</button>
                    <button className="primary" onClick={onConfirm}>Bestätigen</button>
                </div>
            </div>
        </div>
    );
}