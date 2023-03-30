import { Star } from 'phosphor-react'

export function StarRate({ rate }) {
    return (
        <div style={{ display: 'flex', gap: '0.25rem' }}>
            <Star size={14} color={rate >= 1 ? "#1DBEB4" : "#b6b9b9"} weight="fill" />
            <Star size={14} color={rate >= 2 ? "#1DBEB4" : "#b6b9b9"} weight="fill" />
            <Star size={14} color={rate >= 3 ? "#1DBEB4" : "#b6b9b9"} weight="fill" />
            <Star size={14} color={rate >= 4 ? "#1DBEB4" : "#b6b9b9"} weight="fill" />
            <Star size={14} color={rate == 5 ? "#1DBEB4" : "#b6b9b9"} weight="fill" />
        </div>
    )
}