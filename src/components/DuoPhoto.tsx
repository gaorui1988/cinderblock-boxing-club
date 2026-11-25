type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  lite?: boolean
}

export function DuoPhoto({ src, alt, className = '', imgClassName = '', lite = false }: Props) {
  return (
    <div className={`duo grain ${lite ? 'grain-lite' : ''} ${className}`}>
      <img src={src} alt={alt} className={imgClassName} />
    </div>
  )
}
