import Image from "next/image"
import Link from "next/link"
import styles from "./styles.module.css"

interface ICardPokemon{
  image:string,
  name:string,
  type:string
}

const CardPokemon = ({image, name, type}:ICardPokemon) => {
  return (
    <>
      {
        type == 'link' ? (
          <Link href={'/'} className={styles.card}>
            <div className={styles.cardImage}>
              <Image src={image} className={styles.image} width={200} height={500} alt={name} />
            </div>
            <div className={styles.cardBody+" p-4 h-52 flex flex-col justify-between"}>
              <h1>{name}</h1>
              <p>More Details &nbsp; &rarr;</p>
            </div>
          </Link>
        ) : (
          <div className="drop-shadow-md">
            <Image src={image} width={200} height={500} alt={name} />
            <p>{name}</p>
          </div>
        )
      }
    </>
  )
}

export default CardPokemon