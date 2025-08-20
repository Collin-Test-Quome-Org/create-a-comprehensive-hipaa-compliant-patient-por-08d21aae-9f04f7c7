import { Helmet } from 'react-helmet-async'
import { PrescriptionList } from '@/components/PrescriptionList'

export function PrescriptionsPage() {
  return (
    <>
      <Helmet>
        <title>My Prescriptions | HIPAA Patient Portal</title>
      </Helmet>
      <div className="py-8 px-2 md:px-0 min-h-[calc(100vh-120px)] bg-slate-50">
        <PrescriptionList />
      </div>
    </>
  )
}
