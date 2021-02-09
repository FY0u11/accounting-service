import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import DetailsTable from '../../../components/DetailsTable/DetailsTable'
import DetailsLayout from '../../../components/Layouts/DetailsLayout/DetailsLayout'

const DayDetails = () => {
  const [payments, setPayments] = useState([])
  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const { day, month, year } = router.query
      if (!day || !month || !year) return
      try {
        const response = await fetch(
          `http://localhost:3030?filter=${month}.${day}.${year}`
        )
        const payments = await response.json()
        setPayments(payments)
      } catch (e) {
        console.log(e.message)
      }
    })()
  }, [router])

  const addPaymentHandler = async payment => {
    try {
      await fetch('http://localhost:3030', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payment)
      })
      setPayments([...payments, payment])
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <DetailsLayout addPaymentHandler={addPaymentHandler}>
      <DetailsTable payments={payments} setPayments={setPayments} />
    </DetailsLayout>
  )
}

export default DayDetails
