import './TickerTableMa.css'
import Placeholder from 'react-bootstrap/Placeholder';
import { useQuery } from 'react-query'

import fetchAllHistorical from '../../../../services/fetchAllHistorical'


const TickerTableMa = () => {
    const { isLoading, isError, error, isSuccess, data } = useQuery('allHistorical', () => fetchAllHistorical(2330))


    return (
        <div>
            {isLoading ? <Placeholder animation="glow">
                <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder> :
                isError ? <p>{error}</p> : <div>data</div>}
        </div>
    )
}

export default TickerTableMa