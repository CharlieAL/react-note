import React from 'react'

export default function Notes({ content, date, important }) {
  return (
    <li >
      <p>{content}</p>
      <button>show import</button>
    </li>
  )
}
