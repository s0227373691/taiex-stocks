'use client'

import { useTickers } from './ticker-data-access'
import {
    ButtonTickersSync,
    Stepper,
    TabContent,
    Tabs,
    Title,
} from './ticker-ui'

const Feature = () => {
    const { mutate, isPending, status, data } = useTickers()

    return (
        <div className="w-full p-12">
            <Title />
            <Tabs />
            <ButtonTickersSync syncTickers={mutate} />
            {/* <Stepper /> */}
            <TabContent status={status} data={data} />
        </div>
    )
}

export default Feature
