import { MessageThreadView } from '@/components/MessageThreadView'
import { useParams } from 'react-router-dom'

export function MessageThreadPage() {
  const { threadId } = useParams<{ threadId: string }>()

  if (!threadId) {
    return <div className="text-center mt-12 text-red-700 font-semibold">Invalid thread.</div>
  }

  return (
    <div className="py-8">
      <MessageThreadView threadId={threadId} />
    </div>
  )
}
