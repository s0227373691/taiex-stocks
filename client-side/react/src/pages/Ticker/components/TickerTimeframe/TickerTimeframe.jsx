import './TickerTimeframe.css'
import { useQuery } from 'react-query'
import Placeholder from 'react-bootstrap/Placeholder';

import fetchConstant from '../../../../services/fetchConstant'
import { useMemo } from 'react'

const TickerTimeframe = ({ currentTimeframe, setCurrentTimeframe }) => {
    const { isLoading, isError, error, isSuccess, data } = useQuery('constant', () => fetchConstant())
    const timeframe = useMemo(() => data.data.timeframe, [data])

    return (
        <div>
            {isLoading ? <Placeholder animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder> :
                isError ? <p>{error}</p> :
                    isSuccess && timeframe.map(el => <span key={el.name} style={{ color: el.value === currentTimeframe ? 'black' : 'grey', cursor: 'pointer' }} onClick={() => setCurrentTimeframe(el.value)}>{el.name}</span>)}
        </div>
    )
}

export default TickerTimeframe