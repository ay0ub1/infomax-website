import React, { JSX } from 'react'

// This function will recursively serialize the rich text data
function serialize(children: any[]): (JSX.Element | null)[] {
  return children.map((node, i) => {
    if (node.type === 'text') {
      let textNode: React.ReactNode = (
        <span dangerouslySetInnerHTML={{ __html: node.text.replace(/\n/g, '<br>') }} />
      )
      if (node.bold) {
        textNode = <strong>{textNode}</strong>
      }
      if (node.italic) {
        textNode = <em>{textNode}</em>
      }
      if (node.underline) {
        textNode = <u>{textNode}</u>
      }
      // The key must be on the top-level element returned from the map
      return <React.Fragment key={i}>{textNode}</React.Fragment>
    }

    if (!node) {
      return null
    }

    switch (node.type) {
      case 'h1':
        return <h1 key={i}>{serialize(node.children)}</h1>
      case 'h2':
        return <h2 key={i}>{serialize(node.children)}</h2>
      case 'h3':
        return <h3 key={i}>{serialize(node.children)}</h3>
      case 'h4':
        return <h4 key={i}>{serialize(node.children)}</h4>
      case 'h5':
        return <h5 key={i}>{serialize(node.children)}</h5>
      case 'h6':
        return <h6 key={i}>{serialize(node.children)}</h6>
      case 'quote':
        return <blockquote key={i}>{serialize(node.children)}</blockquote>
      case 'ul':
        return <ul key={i}>{serialize(node.children)}</ul>
      case 'ol':
        return <ol key={i}>{serialize(node.children)}</ol>
      case 'li':
        return <li key={i}>{serialize(node.children)}</li>
      case 'link':
        return (
          <a href={node.url} key={i}>
            {serialize(node.children)}
          </a>
        )
      default:
        // Handle paragraph and other block-level elements
        if (node.children) {
           return <p key={i}>{serialize(node.children)}</p>
        }
        return null
    }
  })
}

export function RichText({ content }: { content: any }) {
  if (!content || !content.root || !content.root.children) {
    return null
  }
  return <>{serialize(content.root.children)}</>
}
