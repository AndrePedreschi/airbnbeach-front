import "./Footer.scss"
import { FacebookLogo, LinkedinLogo, TwitterLogo, InstagramLogo } from 'phosphor-react'

export function Footer() {
    let year = new Date().getFullYear()

    return (

        <footer className="footer">
            <h4 className="footerParagraph">&#169;{year} AirBnBeach, inc </h4>

            <div className="socialMidia">
                <a href="#"><FacebookLogo size={28}  weight="fill" /></a>
                
                <a href="#"><LinkedinLogo size={25}  weight="bold" /></a>

                <a href="#"><TwitterLogo size={24}  weight="fill" /></a>

                <a href="#"><InstagramLogo size={25}  /></a>
            </div>
        </footer>

    )
}