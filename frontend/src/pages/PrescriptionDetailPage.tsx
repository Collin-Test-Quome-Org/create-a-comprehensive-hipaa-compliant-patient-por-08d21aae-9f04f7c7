import { Helmet } from 'react-helmet-async'
import { PrescriptionDetail } from '@/components/PrescriptionDetail'

export function PrescriptionDetailPage() {
  return (
    <>
      <Helmet>
        <title>Prescription Details | HIPAA Patient Portal</title>
      </Helmet>
      <div className="py-8 px-2 md:px-0 min-h-[calc(100vh-120px)] bg-slate-50">
        <PrescriptionDetail />
      </div>
    </>
  )
}
