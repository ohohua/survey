import { env } from '@/env'
import Image from 'next/image'

interface Props {
  params: {
    id: string
  }
}
const Question: React.FC<Props> = async ({ params }) => {
  const { id } = await params
  const res = await fetch(`${env.NEXT_REQUEST_URL}/api/admin/question/${id}`)
  const { data } = await res.json()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <Image src={data.backgroundImage} alt="bg" width={100} height={100} />
    </main>
  )
}

export default Question
