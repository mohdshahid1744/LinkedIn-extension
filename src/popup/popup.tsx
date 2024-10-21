import React from 'react'
import {createRoot} from 'react-dom/client'
import '../assets/tailwind.css'
const test = (
<div>
    <h1 className='text-5xl text-green-500'>
        Hello world
    </h1>
    <img src="logo.png" alt="" />
    <p>dmgfkdjgfjxhcgbhxgkfjxlnidufixgvmn bvjjdlzlxgbjgcfbvxjhcbv</p>
</div>
)


const container=document.createElement('div')
document.body.appendChild(container)
const root=createRoot(container)
root.render(test)