import { Star } from 'phosphor-react'

export function StarRate({ rate }) {
    
    {/* <Star size={14} color={rate >= 1 ? "#1DBEB4" : "#b6b9b9"} weight="fill" />
            <Star size={14} color={rate >= 2 ? "#1DBEB4" : "#b6b9b9"} weight="fill" />
            <Star size={14} color={rate >= 3 ? "#1DBEB4" : "#b6b9b9"} weight="fill" />
            <Star size={14} color={rate >= 4 ? "#1DBEB4" : "#b6b9b9"} weight="fill" />
            <Star size={14} color={rate == 5 ? "#1DBEB4" : "#b6b9b9"} weight="fill" /> */}


    return (
        <div style={{ display: 'flex', gap: '0.25rem' }}>
            {rate >= 1 ? <Star size={14} color={"#1DBEB4"} weight="fill" /> : null}
            {rate > 2 ? <Star size={14} color={"#1DBEB4"} weight="fill" /> : null}
            {rate >= 3 ? <Star size={14} color={"#1DBEB4"} weight="fill" /> : null}
            {rate >= 4 ? <Star size={14} color={"#1DBEB4"} weight="fill" /> : null}
            {rate == 5 ? <Star size={14} color={"#1DBEB4"} weight="fill" /> : null}
        </div>
    )
}