import './TickerTableMa.css'
import Placeholder from 'react-bootstrap/Placeholder';
import { useQuery } from 'react-query'

import fetchAllHistorical from '../../../../services/fetchAllHistorical'

import Ema from './Ema/Ema'
import { useEffect } from 'react';
const TickerTableMa = ({ currentTimeframe }) => {
    const { isLoading, isError, error, isSuccess, data, isFetching } = useQuery('allHistorical', () => fetchAllHistorical(2330, currentTimeframe))
    console.log(isFetching, currentTimeframe)


    return (
        <div>
            {isLoading ? <Placeholder animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder> :
                isError ? <p>{error}</p> : <div>
                    <Ema period={12} histirical={data.data} />
                    <Ema period={34} histirical={data.data} />
                    <Ema period={55} histirical={data.data} />
                    <Ema period={144} histirical={data.data} />
                    <Ema period={169} histirical={data.data} />
                    <Ema period={576} histirical={data.data} />
                    <Ema period={676} histirical={data.data} />
                </div>}
        </div>
    )
}

export default TickerTableMa