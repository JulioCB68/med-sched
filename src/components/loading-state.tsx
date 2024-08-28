import { LoaderCircle } from 'lucide-react'
import { Button } from './ui/button'

interface ILoadingProps {
  text: string
}

export function Loading({ text }: ILoadingProps) {
  return (
    <Button type="submit" className="w-full items-center gap-2" disabled>
      <LoaderCircle className="animate-spin" />
      <p className="text-sm capitalize">{text}</p>
    </Button>
  )
}
