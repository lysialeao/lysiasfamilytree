import { Handle, Position } from '@xyflow/react'

export function FamilyConnector() {
  return (
    <div className="relative h-1 w-1">
      <Handle
        id="left"
        type="target"
        position={Position.Left}
        className="!h-1 !w-1 !border-0 !bg-transparent"
      />

      <Handle
        id="right"
        type="target"
        position={Position.Right}
        className="!h-1 !w-1 !border-0 !bg-transparent"
      />

      <Handle
        id="bottom"
        type="source"
        position={Position.Bottom}
        className="!h-1 !w-1 !border-0 !bg-transparent"
      />
    </div>
  )
}
