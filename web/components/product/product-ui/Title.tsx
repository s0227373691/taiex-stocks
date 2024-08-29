import { useTickers } from '@/components/data-access'
import { useMemo } from 'react'

interface TitleProps {
    id: string | string[]
}

export default function Title(props: TitleProps) {
    const productInfo = useProductInfo(props.id)

    return (
        <div className="p-4 text-2xl">
            {productInfo?.symbol} {productInfo?.name}
        </div>
    )
}

function useProductInfo(id: string | string[]) {
    const { data } = useTickers()
    return useMemo(() => data?.data.find((el: any) => el.symbol === id), [data])
}
