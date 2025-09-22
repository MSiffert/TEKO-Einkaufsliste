import React from 'react';
import { exportCsvUrl } from '../api';


type Props = { onReset: () => void };
export default function Toolbar({ onReset }: Props) {
    return (
        <div className="toolbar">
            <a href={exportCsvUrl()}><button>Alphabetische Liste als CSV</button></a>
            <button onClick={onReset}>Liste zurücksetzen</button>
        </div>
    );
}