import { useProductInfo } from '../product-data-access'

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
