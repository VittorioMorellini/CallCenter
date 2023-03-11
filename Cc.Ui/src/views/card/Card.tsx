import { CSSProperties, FC, memo } from 'react'
//import { useDrag, useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
  color: 'red'
}

export interface CardProps {
  id?: string
  text: string
  moveCard?: (id: string, to: number) => void
  findCard?: (id: string) => { index: number }
}

interface Item {
  id: string
  originalIndex: number
}

export function Card({id, text, moveCard, findCard}: CardProps) {
  //const originalIndex = findCard(id).index

  // const [{ isDragging }, drag] = useDrag(() => ({
  //     type: ItemTypes.CARD,
  //     item: { id, originalIndex },
  //     collect: (monitor) => ({
  //       isDragging: monitor.isDragging(),
  //     }),
  //     end: (item, monitor) => {
  //       const { id: droppedId, originalIndex } = item
  //       const didDrop = monitor.didDrop()
  //       if (!didDrop) {
  //         moveCard(droppedId, originalIndex)
  //       }
  //     },
  //   }),
  //   [id, originalIndex, moveCard],
  // )

  // const [, drop] = useDrop(() => ({
  //     accept: ItemTypes.CARD,
  //     hover({ id: draggedId }: Item) {
  //       if (draggedId !== id) {
  //         const { index: overIndex } = findCard(id)
  //         moveCard(draggedId, overIndex)
  //       }
  //     },
  //   }),
  //   [findCard, moveCard],
  // )

  //const opacity = isDragging ? 0 : 1
  //{text}
  return (
    <div>
      <h1>Titolo della Card</h1>
      <div>
        <img src="/images/logo.png" width={500} height={400}></img>
      </div>
      <div>
        Hello
      </div>
    </div>
  )
}
