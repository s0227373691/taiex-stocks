interface IndicatorBadgeProps {
    children: React.ReactNode
    onClick?: () => void
}

const IndicatorBadge = (props: IndicatorBadgeProps) => {
    return (
        <span
            className={`bg-gray-100 text-gray-800 text-xs font-medium mb-2 me-2 px-3 py-2 rounded dark:bg-gray-700 dark:text-gray-300 ${
                props.onClick && 'cursor-pointer'
            }`}
            onClick={props.onClick}
        >
            {props.children}
        </span>
    )
}

export default IndicatorBadge
