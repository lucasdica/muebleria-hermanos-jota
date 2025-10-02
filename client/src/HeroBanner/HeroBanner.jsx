import styles from './HeroBanner.module.css';

function HeroBanner(){
    return(
        <>
            <header id="inicio" className={styles.heroBanner}>
                <div className={styles.heroContent}>
                    <h1>Muebles para tu hogar</h1>
                    <p>Descubrí nuestra colección de muebles de calidad y diseño único</p>
                    <a href="./productos" className={styles.buttonCta}>Comprar Muebles</a>
                </div>
            </header>
        </>
    )
}

export default HeroBanner