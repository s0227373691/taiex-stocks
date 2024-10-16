'use client'

import React, { useState } from 'react'
import SidebarItems from './sidebar-items'

interface SidebarContentProps {
    id: string
}

const SidebarContent = (props: SidebarContentProps) => {
    return (
        <Container id={props.id}>
            <SidebarItems>
                <SidebarItems.Overview />
                <SidebarItems.Favor />
                <SidebarItems.FilterOption />
                <SidebarItems.CuratedStrategies />
                <hr />
                <SidebarItems.Categories />
            </SidebarItems>
        </Container>
    )
}

export default SidebarContent

interface ContainerProps {
    id: string
    children: React.ReactNode
}

function Container(props: ContainerProps) {
    return (
        <div
            id={props.id}
            className="sticky top-[121px] px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 "
        >
            {props.children}
        </div>
    )
}
