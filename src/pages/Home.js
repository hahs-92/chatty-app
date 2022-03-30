//assets
import bg from '../assets/pexels-freestocksorg-744464 (1).jpg'
//styles
import style from '../styles/pages/Home.module.css'

export const Home = () => {
  return (

    <main className={ style.Home }>
      <section className={ style.Image }>
        <img src={ bg } alt="background" />
      </section>
    </main>
  )
}
