import { useMemo, useState } from 'react'
import useATH from '../product-data-access/useATH'
import useATHRatio from '../product-data-access/useATHRatio'
import useATHMaxDrawdown from '../product-data-access/useATHMaxDrawdown'
import useATHMaxDrawdownRatio from '../product-data-access/useATHMaxDrawdownRatio'
import { useHistoricalCount } from '@/components/hooks/service'
import useDaysSinceATH from '../product-data-access/useDaysSinceATH'

interface Tab {
    id: string
    name: string
}

const tabList: Tab[] = [
    {
        id: 'stats-tab',
        name: 'Statistics',
    },
    {
        id: 'about-tab',
        name: 'Services',
    },
    {
        id: 'faq-tab',
        name: 'FAQ',
    },
]

interface PerformanceMetricsOverviewProps {
    id: string
    timeframe: string
}

export default function PerformanceMetricsOverview(
    props: PerformanceMetricsOverviewProps
) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0)
    return (
        <section className="p-4">
            <div className="w-10/12 bg-white mx-auto border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Tablist
                    data={tabList}
                    setSelectedTabIndex={setSelectedTabIndex}
                />
                <div className="border-t border-gray-200 dark:border-gray-600">
                    {selectedTabIndex === 0 && (
                        <TabPanelStat
                            id={props.id}
                            timeframe={props.timeframe}
                        />
                    )}
                    {selectedTabIndex === 1 && <TabPanelAbout />}
                    {selectedTabIndex === 2 && <TabPanelFAQ />}
                </div>
            </div>
        </section>
    )
}

interface TablistProps {
    data: Tab[]
    setSelectedTabIndex: (index: number) => void
}

function Tablist(props: TablistProps) {
    return (
        <>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select tab
                </label>
                <select
                    className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => props.setSelectedTabIndex(+e.target.value)}
                >
                    {props.data.map((tab, i) => (
                        <option key={tab.id} value={i}>
                            {tab.name}
                        </option>
                    ))}
                </select>
            </div>
            <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse">
                {props.data.map((tab, i) => (
                    <li key={tab.id} className="w-full">
                        <button
                            type="button"
                            className="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
                            onClick={() => props.setSelectedTabIndex(i)}
                        >
                            {tab.name}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

interface TabPanelStatProps {
    id: string
    timeframe: string
}

function TabPanelStat(props: TabPanelStatProps) {
    const productParam = { id: props.id, timeframe: props.timeframe }
    const ath = useATH(productParam)
    const athRatio = useATHRatio(productParam)
    const maxDrawdown = useATHMaxDrawdown(productParam)
    const maxDrawdownRatio = useATHMaxDrawdownRatio(productParam)
    const { data: historicalCountData } = useHistoricalCount(props.id)
    const daysSinceATH = useDaysSinceATH({ id: props.id })

    return (
        <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
            <dl className="grid max-w-screen-xl grid-cols-1 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-2 lg:grid-cols-3 dark:text-white sm:p-8">
                <StatItem label="ATH Price" value={ath ? `${ath}` : null} />
                <StatItem
                    label="Max Drawdown Price"
                    value={maxDrawdown ? `${maxDrawdown}` : null}
                />
                <StatItem
                    label="Historical Days"
                    value={
                        historicalCountData ? historicalCountData.count.D : null
                    }
                />
                <StatItem
                    label="ATH Ratio"
                    value={athRatio ? `${athRatio}%` : null}
                />
                <StatItem
                    label="Distance to maxDrawdown ratio"
                    value={maxDrawdownRatio ? `${maxDrawdownRatio}%` : null}
                />
                <StatItem
                    label="Since ATH"
                    value={daysSinceATH ? `${daysSinceATH} D` : null}
                />
            </dl>
        </div>
    )
}

function TabPanelAbout() {
    return (
        <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800">
            <h2 className="mb-5 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                We invest in the world’s potential
            </h2>
            <ul
                role="list"
                className="space-y-4 text-gray-500 dark:text-gray-400"
            >
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg
                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="leading-tight">
                        Dynamic reports and dashboards
                    </span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg
                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="leading-tight">
                        Templates for everyone
                    </span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg
                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="leading-tight">Development workflow</span>
                </li>
                <li className="flex space-x-2 rtl:space-x-reverse items-center">
                    <svg
                        className="flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    </svg>
                    <span className="leading-tight">
                        Limitless business automation
                    </span>
                </li>
            </ul>
        </div>
    )
}

function TabPanelFAQ() {
    return (
        <div
            className="p-4 bg-white rounded-lg dark:bg-gray-800"
            id="faq"
            role="tabpanel"
            aria-labelledby="faq-tab"
        >
            <div
                id="accordion-flush"
                data-accordion="collapse"
                data-active-classes="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                data-inactive-classes="text-gray-500 dark:text-gray-400"
            >
                <h2 id="accordion-flush-heading-1">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                        data-accordion-target="#accordion-flush-body-1"
                        aria-expanded="true"
                        aria-controls="accordion-flush-body-1"
                    >
                        <span>What is Flowbite?</span>
                        <svg
                            data-accordion-icon
                            className="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-flush-body-1"
                    className="hidden"
                    aria-labelledby="accordion-flush-heading-1"
                >
                    <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Flowbite is an open-source library of interactive
                            components built on top of Tailwind CSS including
                            buttons, dropdowns, modals, navbars, and more.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Check out this guide to learn how to{' '}
                            <a
                                href="/docs/getting-started/introduction/"
                                className="text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                get started
                            </a>{' '}
                            and start developing websites even faster with
                            components on top of Tailwind CSS.
                        </p>
                    </div>
                </div>
                <h2 id="accordion-flush-heading-2">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                        data-accordion-target="#accordion-flush-body-2"
                        aria-expanded="false"
                        aria-controls="accordion-flush-body-2"
                    >
                        <span>Is there a Figma file available?</span>
                        <svg
                            data-accordion-icon
                            className="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-flush-body-2"
                    className="hidden"
                    aria-labelledby="accordion-flush-heading-2"
                >
                    <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Flowbite is first conceptualized and designed using
                            the Figma software so everything you see in the
                            library has a design equivalent in our Figma file.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                            Check out the{' '}
                            <a
                                href="https://flowbite.com/figma/"
                                className="text-blue-600 dark:text-blue-500 hover:underline"
                            >
                                Figma design system
                            </a>{' '}
                            based on the utility classes from Tailwind CSS and
                            components from Flowbite.
                        </p>
                    </div>
                </div>
                <h2 id="accordion-flush-heading-3">
                    <button
                        type="button"
                        className="flex items-center justify-between w-full py-5 font-medium text-left rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                        data-accordion-target="#accordion-flush-body-3"
                        aria-expanded="false"
                        aria-controls="accordion-flush-body-3"
                    >
                        <span>
                            What are the differences between Flowbite and
                            Tailwind UI?
                        </span>
                        <svg
                            data-accordion-icon
                            className="w-3 h-3 rotate-180 shrink-0"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5 5 1 1 5"
                            />
                        </svg>
                    </button>
                </h2>
                <div
                    id="accordion-flush-body-3"
                    className="hidden"
                    aria-labelledby="accordion-flush-heading-3"
                >
                    <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            The main difference is that the core components from
                            Flowbite are open source under the MIT license,
                            whereas Tailwind UI is a paid product. Another
                            difference is that Flowbite relies on smaller and
                            standalone components, whereas Tailwind UI offers
                            sections of pages.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            However, we actually recommend using both Flowbite,
                            Flowbite Pro, and even Tailwind UI as there is no
                            technical reason stopping you from using the best of
                            two worlds.
                        </p>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Learn more about these technologies:
                        </p>
                        <ul className="ps-5 text-gray-500 list-disc dark:text-gray-400">
                            <li>
                                <a
                                    href="https://flowbite.com/pro/"
                                    className="text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Flowbite Pro
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://tailwindui.com/"
                                    rel="nofollow"
                                    className="text-blue-600 dark:text-blue-500 hover:underline"
                                >
                                    Tailwind UI
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface StatItemProps {
    label: string
    value: string | null
}
function StatItem(props: StatItemProps) {
    const isLoading = props.value === null

    if (isLoading)
        return (
            <div className="flex flex-col items-center justify-center">
                <div role="status">
                    <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )

    return (
        <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{props.value}</dt>
            <dd className="text-gray-500 dark:text-gray-400">{props.label}</dd>
        </div>
    )
}
